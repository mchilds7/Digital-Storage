// Secure proxy for the storage chatbot (Cloudflare Worker).
// The Anthropic API key lives ONLY here, as a secret. It is never sent to the browser.
const SYSTEM = `You are a friendly tutor on a student website for Chapter 7: Digital Storage.
Explain in simple language, in under 150 words unless asked for more.
Topics: HDDs, SATA and NVMe SSDs, USB flash drives, memory cards, CD/DVD/Blu-ray, cloud storage and data centers, capacity units, speed, durability, portability, cost, backup (3-2-1 rule), encryption and data security.
You can compare storage types, recommend storage for a user's needs, answer capacity questions, and quiz students on the chapter one question at a time.
Give approximate prices and speeds and say they are approximate. If a question is off-topic, politely steer back to digital storage. Never ask for personal information or passwords.`;
const json = (o, status, cors) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
    const ok = allowed.includes(origin);
    const cors = { "Access-Control-Allow-Origin": ok ? origin : (allowed[0] || ""), "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (req.method !== "POST" || !ok) return json({ error: "Not allowed" }, 403, cors);
    let body; try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400, cors); }
    let msgs = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    msgs = msgs.filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
               .map(m => ({ role: m.role, content: m.content.slice(0, 1000) }));
    while (msgs.length && msgs[0].role !== "user") msgs.shift();
    if (!msgs.length || msgs[msgs.length - 1].role !== "user") return json({ error: "Bad request" }, 400, cors);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({ model: env.MODEL || "claude-haiku-5-5", max_tokens: 500, system: SYSTEM, messages: msgs })
      });
      if (!r.ok) return json({ error: "Upstream error" }, 502, cors);
      const d = await r.json();
      const reply = (d.content || []).filter(c => c.type === "text").map(c => c.text).join("").trim();
      return reply ? json({ reply }, 200, cors) : json({ error: "Empty reply" }, 502, cors);
    } catch { return json({ error: "Server error" }, 500, cors); }
  }
};
