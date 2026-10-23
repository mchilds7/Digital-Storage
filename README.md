# Chatbot server setup (optional)

The website works without this: the chatbot runs in a clearly labeled **demo mode** with predefined answers.
To turn on the **live AI**, run this small server. It keeps your API key secret. Never put the key in `script.js`.

1. Get an API key at console.anthropic.com. API use costs money, so set a monthly spend limit there.
2. Create a free Cloudflare account, then go to **Workers & Pages → Create → Create Worker**. Name it `storage-chatbot` and deploy.
3. Click **Edit code**, replace everything with the contents of `worker.js`, and **Deploy**.
4. Go to **Settings → Variables and Secrets** and add:
   - `ANTHROPIC_API_KEY` as a **Secret** (paste your key)
   - `ALLOWED_ORIGIN` as text: your site's address with no path, for example `https://yourname.github.io`
5. Copy the worker's URL (like `https://storage-chatbot.yourname.workers.dev`).
6. In `script.js`, set `const CHAT_API_URL="https://storage-chatbot.yourname.workers.dev";`, then upload `script.js` to GitHub again.

Optional: add a Cloudflare rate-limiting rule to the worker so one visitor cannot run up your bill.
This `chatbot-server` folder does not need to be uploaded to GitHub Pages.
