const D=[
{n:"Hard disk drive (HDD)",i:"💽",t:"magnetic",m:"Magnetic · 500 GB–20 TB",d:"Spinning platters store data magnetically.",pro:["Very cheap per GB","Huge capacities"],con:["Slower than SSD","Moving parts can break if dropped"],r:[5,2,2,5,2]},
{n:"Magnetic tape",i:"📼",t:"magnetic",m:"Magnetic · up to 18 TB per cartridge",d:"Long reels of magnetic tape used for backups.",pro:["Lowest cost for archives","Lasts decades"],con:["Must be read in order (slow access)","Needs special equipment"],r:[5,1,4,5,1]},
{n:"Solid-state drive (SSD)",i:"⚡",t:"solid",m:"Flash · 128 GB–8 TB",d:"Flash memory chips with no moving parts.",pro:["Very fast","Quiet and shock-resistant"],con:["Higher cost per GB","Cells wear out after many writes"],r:[4,5,4,3,4]},
{n:"USB flash drive",i:"🔌",t:"solid",m:"Flash · 8 GB–1 TB",d:"Small plug-in flash storage for carrying files.",pro:["Tiny and portable","Plug and play"],con:["Easy to lose","Lower capacity and speed"],r:[2,3,3,3,5]},
{n:"Memory card (SD)",i:"🗂️",t:"solid",m:"Flash · 4 GB–1 TB",d:"Removable flash card used in cameras and phones.",pro:["Compact and swappable","Good for media"],con:["Can corrupt if removed mid-write","Speed varies by class"],r:[3,3,3,3,5]},
{n:"Optical disc (CD/DVD/Blu-ray)",i:"💿",t:"optical",m:"Optical · 700 MB–128 GB",d:"A laser reads pits on a disc surface.",pro:["Cheap to distribute","Good for read-only copies"],con:["Slow","Scratches; drives are disappearing"],r:[1,1,2,4,3]},
{n:"Cloud storage",i:"☁️",t:"cloud",m:"Online · pay as you grow",d:"Files kept on remote servers and reached through the internet.",pro:["Access from any device","Backed up by the provider"],con:["Needs internet","Ongoing fees and privacy concerns"],r:[4,2,4,2,2]}];
const C=["Capacity","Speed","Durability","Cost per GB","Portability"];
const box=document.getElementById("cards");
function show(f){box.innerHTML=D.filter(x=>f=="all"||x.t==f).map(x=>`<button class="card dev" aria-expanded="false"><div class="ico">${x.i}</div><div class="meta">${x.m}</div><h3>${x.n}</h3><p>${x.d}</p><div class="more"><b>Advantages</b><ul>${x.pro.map(p=>`<li>${p}</li>`).join("")}</ul><u>Disadvantages</u><ul>${x.con.map(p=>`<li>${p}</li>`).join("")}</ul></div></button>`).join("")}
show("all");
box.onclick=e=>{const c=e.target.closest(".dev");if(c){c.classList.toggle("open");c.setAttribute("aria-expanded",c.classList.contains("open"))}};
document.querySelector(".filters").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;document.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));b.classList.add("on");show(b.dataset.f)};
const dots=n=>`<span class="dots" aria-label="${n} of 5">${"●".repeat(n)}<s>${"●".repeat(5-n)}</s></span>`;
document.getElementById("tbl").innerHTML=`<thead><tr><th>Type</th>${C.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${D.map(x=>`<tr><th>${x.i} ${x.n}</th>${x.r.map(v=>`<td>${dots(v)}</td>`).join("")}</tr>`).join("")}</tbody>`;
const S=[
["Back up a whole family's photos for years","Cloud storage + an external HDD","Cloud gives off-site protection; an HDD offers cheap, large local capacity. Keeping both follows the 3-2-1 backup idea.","Magnetic tape for very large archives."],
["Run a laptop that must boot fast","Solid-state drive (SSD)","SSDs have no moving parts, so they start up and open programs much faster and survive bumps.","HDD if budget matters more than speed."],
["Move a school presentation between computers","USB flash drive","It's small, cheap and works on almost any computer without internet.","Cloud storage if both computers are online."],
["Store photos on a digital camera","Memory card (SD)","Cards are compact, swappable and fast enough to save images quickly.","Look for a higher speed class for video."],
["Archive company records for 30 years","Magnetic tape","Tape is the cheapest per GB for rarely accessed data and lasts decades when stored well.","Large HDD arrays if you need faster access."],
["Share files with a team in different cities","Cloud storage","Everyone reaches the same files anywhere, and the provider handles backups and sharing.","A network drive if you only work in one office."]];
const sc=document.getElementById("scen"),rs=document.getElementById("result");
sc.innerHTML=S.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join("");
sc.onclick=e=>{const b=e.target.closest("button");if(!b)return;sc.querySelectorAll("button").forEach(x=>x.classList.remove("on"));b.classList.add("on");const s=S[b.dataset.i];rs.innerHTML=`<h3>${s[1]}</h3><p>${s[2]}</p><p class="alt">Alternative: ${s[3]}</p>`};
const Q=[["Which storage has no moving parts?",["HDD","SSD","Optical disc"],1,"SSDs use flash chips, so nothing spins."],
["Which is cheapest per GB for long-term archives?",["Magnetic tape","USB flash drive","SSD"],0,"Tape wins on cost and lifespan for archives."],
["Cloud storage always needs…",["A DVD drive","An internet connection","A USB port"],1,"You reach cloud files over the internet."],
["Best choice for fast boot times?",["SSD","CD-R","Tape"],0,"SSDs load the operating system quickly."]];
let qi=0,sco=0;const qb=document.getElementById("quizbox");
function ask(){if(qi>=Q.length){qb.innerHTML=`<h3>Score: ${sco} / ${Q.length}</h3><button class="btn" id="re">Try again</button>`;document.getElementById("re").onclick=()=>{qi=0;sco=0;ask()};return}
const q=Q[qi];qb.innerHTML=`<h3>Question ${qi+1} of ${Q.length}</h3><p>${q[0]}</p>${q[1].map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}<p class="fb" aria-live="polite"></p>`;
qb.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.i==q[2];if(ok)sco++;qb.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(+o.dataset.i==q[2])o.classList.add("right")});if(!ok)b.classList.add("wrong");qb.querySelector(".fb").textContent=(ok?"Correct. ":"Not quite. ")+q[3];const n=document.createElement("button");n.className="btn";n.textContent=qi<Q.length-1?"Next question":"See score";n.onclick=()=>{qi++;ask()};qb.appendChild(n)})}
ask();
const bg=document.querySelector(".burger"),mn=document.getElementById("menu");
bg.onclick=()=>{const o=mn.classList.toggle("show");bg.setAttribute("aria-expanded",o)};mn.onclick=()=>mn.classList.remove("show");
