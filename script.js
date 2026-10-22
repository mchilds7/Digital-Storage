const D=[
{n:"HDD",i:"💽",t:"magnetic",m:"Magnetic · spinning platters",d:"Hard disk drive. Read/write heads move over spinning magnetic disks.",pro:["Cheapest per GB","Very large capacities"],con:["Slow compared with SSDs","Moving parts fail if dropped"],r:[5,2,2,2,5],cap:"500 GB – 20+ TB",spd:"100–200 MB/s",dur:"Fragile when running",port:"Bulky (external drives are portable)",cost:"About $0.02/GB",best:"Bulk storage and backups"},
{n:"SATA SSD",i:"🟦",t:"solid",m:"Flash · SATA connection",d:"Flash chips with no moving parts, connected through the older SATA port.",pro:["Much faster than HDD","Works in older PCs and laptops"],con:["SATA limits speed to about 550 MB/s","Costs more per GB than HDD"],r:[4,4,4,3,3],cap:"120 GB – 4 TB",spd:"500–550 MB/s",dur:"Shock resistant",port:"Small and light",cost:"About $0.06–0.10/GB",best:"Upgrading an older computer"},
{n:"NVMe SSD",i:"⚡",t:"solid",m:"Flash · PCIe connection",d:"A flash SSD that talks to the computer over PCIe lanes, which are far faster than SATA.",pro:["Fastest consumer storage","Tiny M.2 stick design"],con:["Can run hot under load","Needs an M.2 slot"],r:[4,5,4,3,3],cap:"256 GB – 8 TB",spd:"3,000–7,000+ MB/s",dur:"Shock resistant",port:"Tiny, but fixed inside the PC",cost:"About $0.06–0.12/GB",best:"Gaming, video editing, fast boot"},
{n:"USB flash drive",i:"🔌",t:"solid",m:"Flash · USB plug",d:"A small plug-in stick for carrying files between computers.",pro:["Tiny and portable","Plug and play"],con:["Easy to lose","Slower and smaller than SSDs"],r:[2,3,3,5,3],cap:"8 GB – 1 TB",spd:"30–400 MB/s",dur:"Fairly tough",port:"Fits on a keyring",cost:"About $0.05–0.15/GB",best:"Moving files between computers"},
{n:"Memory card",i:"🗂️",t:"solid",m:"Flash · SD / microSD",d:"A removable flash card for cameras, phones and game consoles.",pro:["Compact and swappable","Many are water and shock resistant"],con:["Can corrupt if removed mid-write","Speed varies by class"],r:[2,3,4,5,3],cap:"4 GB – 1 TB",spd:"30–300 MB/s",dur:"Tough",port:"Smaller than a stamp",cost:"About $0.08–0.20/GB",best:"Cameras, phones, drones"},
{n:"CD",i:"📀",t:"optical",m:"Optical · laser",d:"Compact disc. A laser reads tiny pits on the disc surface.",pro:["Cheap discs","Plays in almost any old drive"],con:["Only about 700 MB","Scratches easily"],r:[1,1,2,4,1],cap:"700 MB",spd:"Up to ~8 MB/s",dur:"Scratches easily",port:"Light, needs a drive",cost:"About $0.30+/GB",best:"Music and small read-only copies"},
{n:"DVD",i:"📀",t:"optical",m:"Optical · red laser",d:"Digital versatile disc, with more capacity than a CD.",pro:["Holds a film","Cheap and widely supported"],con:["Slow","Laptops rarely include drives now"],r:[1,1,2,4,2],cap:"4.7 GB (8.5 GB dual layer)",spd:"Up to ~22 MB/s",dur:"Scratches easily",port:"Light, needs a drive",cost:"About $0.10/GB",best:"Standard-definition video, software"},
{n:"Blu-ray",i:"💿",t:"optical",m:"Optical · blue laser",d:"A blue laser reads smaller pits, so each disc holds much more data.",pro:["Up to 25–128 GB per disc","Hard-coated, tougher than DVD"],con:["Needs a Blu-ray drive","Slow for everyday use"],r:[2,2,3,3,2],cap:"25 GB – 128 GB",spd:"Up to ~54 MB/s",dur:"More scratch resistant",port:"Light, needs a drive",cost:"About $0.05–0.10/GB",best:"HD video and permanent copies"},
{n:"Cloud storage",i:"☁️",t:"cloud",m:"Online · remote servers",d:"Files kept on a provider's servers and reached over the internet.",pro:["Reach files from any device","Provider keeps backups"],con:["Needs internet","Monthly fees and privacy concerns"],r:[5,2,5,5,2],cap:"Grows as you pay",spd:"Limited by your internet",dur:"Very high (copies across servers)",port:"Any device with internet",cost:"About $5–10 per TB per month",best:"Sharing and off-site backup"}];
const box=document.getElementById("cards");
function show(f){box.innerHTML=D.filter(x=>f=="all"||x.t==f).map(x=>`<button class="card dev" aria-expanded="false"><div class="ico">${x.i}</div><div class="meta">${x.m}</div><h3>${x.n}</h3><p>${x.d}</p><div class="more"><b>Advantages</b><ul>${x.pro.map(p=>`<li>${p}</li>`).join("")}</ul><u>Disadvantages</u><ul>${x.con.map(p=>`<li>${p}</li>`).join("")}</ul><b>Best for:</b> ${x.best}</div></button>`).join("")}
show("all");
box.onclick=e=>{const c=e.target.closest(".dev");if(c){c.classList.toggle("open");c.setAttribute("aria-expanded",c.classList.contains("open"))}};
document.querySelector(".filters").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;document.querySelectorAll(".filters:not(#pick) .chip").forEach(c=>c.classList.remove("on"));b.classList.add("on");show(b.dataset.f)};
/* comparison */
const dots=n=>`<span class="dots" aria-label="${n} of 5">${"●".repeat(n)}<s>${"●".repeat(5-n)}</s></span>`;
const R=[["Capacity","cap"],["Speed","spd"],["Durability","dur"],["Portability","port"],["Cost","cost"]];
let sel=[0,1,2];const pk=document.getElementById("pick"),tb=document.getElementById("tbl");
function cmp(){pk.innerHTML=D.map((x,i)=>`<button class="chip" data-i="${i}" aria-pressed="${sel.includes(i)}">${x.i} ${x.n}</button>`).join("");
const X=sel.map(i=>D[i]);
tb.innerHTML=`<thead><tr><th>Feature</th>${X.map(x=>`<th>${x.i} ${x.n}</th>`).join("")}</tr></thead><tbody><tr><th>Type</th>${X.map(x=>`<td>${x.m}</td>`).join("")}</tr>${R.map(([l,k],j)=>{const v=X.map(x=>x.r[j]),mx=Math.max(...v),all=v.every(a=>a==mx);return`<tr><th>${l}</th>${X.map((x,c)=>`<td class="${v[c]==mx&&!all?"best":""}">${dots(v[c])}<small>${x[k]}</small></td>`).join("")}</tr>`}).join("")}<tr><th>Best for</th>${X.map(x=>`<td>${x.best}</td>`).join("")}</tr></tbody>`}
pk.onclick=e=>{const b=e.target.closest(".chip");if(!b)return;const i=+b.dataset.i;if(sel.includes(i)){if(sel.length>2)sel=sel.filter(a=>a!=i)}else{if(sel.length>=4)sel.shift();sel.push(i)}cmp()};
cmp();
/* checklist */
const K=["Back up important files using the 3-2-1 rule","Turn on drive encryption (BitLocker or FileVault)","Use strong, unique passwords and a password manager","Turn on two-factor authentication for cloud accounts","Keep your operating system and antivirus up to date","Wipe or destroy old drives before selling or recycling them"];
const ck=document.getElementById("checks"),pg=document.getElementById("prog");
ck.innerHTML=K.map((k,i)=>`<label><input type="checkbox" data-i="${i}"> ${k}</label>`).join("");
ck.onchange=()=>{const n=ck.querySelectorAll("input:checked").length;pg.textContent=n==K.length?"All done. Your data is in good shape.":`${n} of ${K.length} done`};pg.textContent=`0 of ${K.length} done`;
/* picker */
const S=[
["Back up a family's photos for years","Cloud storage plus an external HDD","The cloud gives an off-site copy and the HDD gives cheap local space. Together they follow the 3-2-1 rule.","A second HDD kept at a relative's home."],
["Edit 4K video or play big games","NVMe SSD","Large files load and save fastest over PCIe, which cuts waiting time.","SATA SSD if your computer has no M.2 slot."],
["Speed up an old laptop on a budget","SATA SSD","Most older laptops have a SATA port, and swapping an HDD for an SSD makes it start and open apps much faster.","Check first whether your laptop has an M.2 slot for NVMe."],
["Move a school presentation between computers","USB flash drive","It is small, cheap and works on almost any computer without internet.","Cloud storage if both computers are online."],
["Store photos and video on a camera","Memory card","Cards are compact, swappable and fast enough to save images quickly.","Choose a higher speed class for video."],
["Keep a read-only copy of a finished project","Blu-ray disc","A disc cannot be changed by malware once written, and one disc holds up to 25 GB or more.","DVD for projects under 4.7 GB."],
["Share files with a team in different cities","Cloud storage","Everyone reaches the same files from anywhere, and the provider handles backups and sharing.","A network drive if everyone works in one office."]];
const sc=document.getElementById("scen"),rs=document.getElementById("result");
sc.innerHTML=S.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join("");
sc.onclick=e=>{const b=e.target.closest("button");if(!b)return;sc.querySelectorAll("button").forEach(x=>x.classList.remove("on"));b.classList.add("on");const s=S[b.dataset.i];rs.innerHTML=`<h3>${s[1]}</h3><p>${s[2]}</p><p class="alt">Alternative: ${s[3]}</p>`};
/* quiz */
const Q=[["Which storage has no moving parts?",["HDD","SSD","Blu-ray drive"],1,"SSDs use flash chips, so nothing spins."],
["Why is an NVMe SSD faster than a SATA SSD?",["It connects over PCIe lanes","It spins faster","It uses a laser"],0,"PCIe offers far more bandwidth than the SATA connection."],
["What does the 3-2-1 backup rule mean?",["3 copies, 2 types of media, 1 off-site","3 drives, 2 passwords, 1 cloud account","3 backups a day, 2 a week, 1 a month"],0,"Spreading copies across media and places protects against any single failure."],
["What does encryption do?",["Makes files smaller","Scrambles data so only a key holder can read it","Speeds up a drive"],1,"A stolen encrypted drive is unreadable without the key."],
["Which optical disc holds the most data?",["CD","DVD","Blu-ray"],2,"The blue laser reads smaller pits, so Blu-ray fits more."],
["Cloud storage always needs…",["A DVD drive","An internet connection","A USB port"],1,"You reach cloud files over the internet."]];
let qi=0,sco=0;const qb=document.getElementById("quizbox");
function ask(){if(qi>=Q.length){qb.innerHTML=`<h3>Score: ${sco} / ${Q.length}</h3><button class="btn" id="re">Try again</button>`;document.getElementById("re").onclick=()=>{qi=0;sco=0;ask()};return}
const q=Q[qi];qb.innerHTML=`<h3>Question ${qi+1} of ${Q.length}</h3><p>${q[0]}</p>${q[1].map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}<p class="fb" aria-live="polite"></p>`;
qb.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.i==q[2];if(ok)sco++;qb.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(+o.dataset.i==q[2])o.classList.add("right")});if(!ok)b.classList.add("wrong");qb.querySelector(".fb").textContent=(ok?"Correct. ":"Not quite. ")+q[3];const n=document.createElement("button");n.className="btn";n.textContent=qi<Q.length-1?"Next question":"See score";n.onclick=()=>{qi++;ask()};qb.appendChild(n)})}
ask();
const bg=document.querySelector(".burger"),mn=document.getElementById("menu");
bg.onclick=()=>{const o=mn.classList.toggle("show");bg.setAttribute("aria-expanded",o)};mn.onclick=()=>mn.classList.remove("show");
