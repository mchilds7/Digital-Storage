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
/* calculator */
const $=id=>document.getElementById(id),U={MB:1,GB:1000,TB:1e6};
const SZ={ps:[["Phone photo (JPEG, about 4 MB)",4],["High-quality photo (RAW, about 25 MB)",25]],ss:[["MP3 song (about 4 MB)",4],["Lossless song (FLAC, about 30 MB)",30]],vs:[["HD video, per hour (about 6 GB)",6000],["4K video, per hour (about 20 GB)",20000]]};
Object.keys(SZ).forEach(k=>$(k).innerHTML=SZ[k].map((o,i)=>`<option value="${i}">${o[0]}</option>`).join(""));
const fm=m=>m>=1e6?(m/1e6).toFixed(2)+" TB":m>=1000?(m/1000).toFixed(1)+" GB":Math.round(m)+" MB";
function calc(){const cap=(+$("capv").value||0)*U[$("capu").value],p=SZ.ps[$("ps").value][1],s=SZ.ss[$("ss").value][1],v=SZ.vs[$("vs").value][1];
$("fit").innerHTML=[["📷","photos",cap/p],["🎵","songs",cap/s],["🎬","hours of video",cap/v]].map(([i,l,n])=>`<div><span>${i}</span><b>${Math.floor(n).toLocaleString()}</b>${l}</div>`).join("");
const u=(+$("np").value||0)*p+(+$("ns").value||0)*s+(+$("nh").value||0)*v,pc=cap?u/cap*100:0;
$("mbar").style.width=Math.min(pc,100)+"%";$("mbar").className=pc>100?"over":"";
$("mtxt").textContent=cap?(pc>100?`Too much: you need ${fm(u)}, which is ${fm(u-cap)} over the ${fm(cap)} capacity.`:`${fm(u)} used of ${fm(cap)} (${pc.toFixed(1)}%). ${fm(cap-u)} free.`):"Enter a capacity."}
document.getElementById("calculator").addEventListener("input",calc);
const P=[["CD",700,"MB"],["DVD",4.7,"GB"],["Blu-ray",25,"GB"],["64 GB USB",64,"GB"],["128 GB SD card",128,"GB"],["512 GB SSD",512,"GB"],["2 TB HDD",2,"TB"]];
$("presets").innerHTML=P.map((p,i)=>`<button class="chip" data-i="${i}">${p[0]}</button>`).join("");
$("presets").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;const p=P[b.dataset.i];$("capv").value=p[1];$("capu").value=p[2];$("presets").querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c==b));calc()};
calc();
/* recommendation */
const UC=["🎮 Gaming","📚 Schoolwork","📷 Photography","💼 Business","🔁 Backups"],PR=[["perf","Best performance"],["cost","Lowest cost"]];
const REC=[
{perf:{t:"NVMe SSD",ids:[2,1],why:"Games stream huge files, so an NVMe SSD gives the shortest load times and fastest installs.",tip:"1 TB or more. Many modern games need 50–150 GB each.",avoid:"Running games from a USB flash drive or an optical disc."},cost:{t:"SATA SSD for favorite games, HDD for the rest",ids:[1,0],why:"A SATA SSD still loads far faster than an HDD, while an HDD stores the rest of your library cheaply.",tip:"Keep the operating system and your most-played games on the SSD.",avoid:"Installing your operating system on an HDD."}},
{perf:{t:"SSD in your laptop plus cloud storage",ids:[1,8],why:"The SSD keeps your laptop fast, and the cloud keeps assignments safe and available on any device.",tip:"Save work in a synced cloud folder so a copy is made automatically.",avoid:"Keeping the only copy of an assignment on one device."},cost:{t:"USB flash drive plus free cloud storage",ids:[3,8],why:"Documents and slides are small, so a cheap USB drive and a free cloud account cover almost everything.",tip:"A 32–64 GB drive is plenty. Label it and keep a second copy.",avoid:"Leaving your only copy on a USB drive, which is easy to lose."}},
{perf:{t:"Fast memory cards plus an NVMe SSD for editing",ids:[4,2],why:"Fast cards keep up with burst shooting, and an NVMe SSD makes editing large RAW files smooth.",tip:"Look for high write-speed cards. RAW photos can be 25 MB or more each.",avoid:"Slow, unbranded cards that can lose a shoot."},cost:{t:"Memory cards plus an external HDD",ids:[4,0],why:"Cards hold the shoot, and an HDD stores years of photos for the lowest price per GB.",tip:"Copy cards to the HDD after every shoot and keep a cloud copy of the best shots.",avoid:"Deleting photos from the card before they are backed up."}},
{perf:{t:"Encrypted SSD plus managed cloud storage",ids:[2,8],why:"Fast local work plus cloud storage with user accounts, access controls and automatic backup.",tip:"Turn on encryption and two-factor authentication, and limit who sees which files.",avoid:"Sharing confidential files on personal USB drives."},cost:{t:"Encrypted external HDD plus cloud backup",ids:[0,8],why:"An HDD gives cheap capacity for records, and the cloud adds an off-site copy.",tip:"Encrypt the drive and keep it locked away when not in use.",avoid:"Unencrypted drives that could be lost or stolen."}},
{perf:{t:"Cloud storage plus an external SSD",ids:[8,1],why:"The SSD restores files quickly after a failure, and the cloud keeps an off-site copy.",tip:"Follow the 3-2-1 rule and test restoring a file now and then.",avoid:"Backing up to the same drive that holds the originals."},cost:{t:"External HDD plus cloud for key files",ids:[0,8],why:"HDDs are the cheapest way to hold large backups, and the cloud protects your most important files off-site.",tip:"Use backup software on a schedule so it never depends on memory.",avoid:"Relying on a single backup copy."}}];
let uc=0,pr="perf";
function rec(){$("uses").innerHTML=UC.map((u,i)=>`<button class="chip" data-i="${i}" aria-pressed="${i==uc}">${u}</button>`).join("");
$("prio").innerHTML=PR.map(p=>`<button class="chip" data-p="${p[0]}" aria-pressed="${p[0]==pr}">${p[1]}</button>`).join("");
const r=REC[uc][pr];$("rec").innerHTML=`<h3>${r.t}</h3><p>${r.why}</p><p class="alt"><b>Look for:</b> ${r.tip}</p><p class="alt"><b>Avoid:</b> ${r.avoid}</p><button class="btn" id="go">Compare these in the table</button>`;
$("go").onclick=()=>{sel=r.ids.slice();cmp();location.hash="compare"}}
$("uses").onclick=e=>{const b=e.target.closest(".chip");if(b){uc=+b.dataset.i;rec()}};
$("prio").onclick=e=>{const b=e.target.closest(".chip");if(b){pr=b.dataset.p;rec()}};
rec();
/* quiz */
const Q=[["Which storage has no moving parts?",["HDD","SSD","Blu-ray drive"],1,"SSDs use flash chips, so nothing spins."],
["Why is an NVMe SSD faster than a SATA SSD?",["It connects over PCIe lanes","It spins faster","It uses a laser"],0,"PCIe offers far more bandwidth than the SATA connection."],
["A drive is labeled 1 TB. About how many GB is that?",["100 GB","1,000 GB","1,000,000 GB"],1,"Each unit is about 1,000 times the one before it."],
["Which is the cheapest per GB for bulk storage?",["HDD","NVMe SSD","Memory card"],0,"HDDs give the most space for the least money."],
["Which device can be damaged by being dropped while it is running?",["USB flash drive","HDD","Memory card"],1,"An HDD's read/write heads float just above spinning platters."],
["Which optical disc holds the most data?",["CD","DVD","Blu-ray"],2,"The blue laser reads smaller pits, so Blu-ray fits more."],
["What does the 3-2-1 backup rule mean?",["3 copies, 2 types of media, 1 off-site","3 drives, 2 passwords, 1 cloud account","3 backups a day, 2 a week, 1 a month"],0,"Spreading copies across media and places protects against any single failure."],
["What does encryption do?",["Makes files smaller","Scrambles data so only a key holder can read it","Speeds up a drive"],1,"A stolen encrypted drive is unreadable without the key."],
["Best way to share files with people in different cities?",["Cloud storage","CD","SD card"],0,"Cloud files can be reached by anyone you allow, from anywhere."],
["Cloud storage always needs…",["A DVD drive","An internet connection","A USB port"],1,"You reach cloud files over the internet."]];
let qi=0,sco=0,miss=[];const qb=$("quizbox");
function ask(){if(qi>=Q.length){const pc=sco/Q.length,m=pc>=.9?"Excellent work.":pc>=.6?"Good job. A little more review will help.":"Keep studying and try again.";
qb.innerHTML=`<h3>Final score: ${sco} / ${Q.length}</h3><p>${m}</p>${miss.length?`<p><b>Review these:</b></p><ul>${miss.map(i=>`<li>${Q[i][0]} ${Q[i][3]}</li>`).join("")}</ul>`:""}<button class="btn" id="re">Try again</button>`;$("re").onclick=()=>{qi=0;sco=0;miss=[];ask()};return}
const q=Q[qi];qb.innerHTML=`<h3>Question ${qi+1} of ${Q.length}</h3><p>${q[0]}</p>${q[1].map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}<p class="fb" aria-live="polite"></p>`;
qb.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.i==q[2];if(ok)sco++;else miss.push(qi);qb.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(+o.dataset.i==q[2])o.classList.add("right")});if(!ok)b.classList.add("wrong");qb.querySelector(".fb").textContent=(ok?"Correct. ":"Not quite. ")+q[3];const n=document.createElement("button");n.className="btn";n.textContent=qi<Q.length-1?"Next question":"See score";n.onclick=()=>{qi++;ask()};qb.appendChild(n)})}
ask();
/* music */
const au=$("aud"),TR=[["Boot Sequence","music-1.mp3"],["Flash Glow","music-2.mp3"],["Cloud Lullaby","music-3.mp3"],["Deep Archive","music-4.mp3"]];let ti=0;
const tm=t=>isFinite(t)?Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0"):"0:00";
au.volume=.4;
function mload(i){ti=i;au.src=TR[i][1];$("ttl").textContent=TR[i][0];$("artist").textContent="Original track made for this project";$("seek").value=0;$("cur").textContent="0:00";$("dur").textContent="0:00";$("plist").querySelectorAll("li").forEach((l,k)=>l.classList.toggle("now",k==i))}
$("plist").innerHTML=TR.map((t,i)=>`<li><button data-i="${i}"><span>${i+1}. ${t[0]}</span><small id="d${i}"></small></button></li>`).join("");
TR.forEach((t,i)=>{const a=new Audio();a.preload="metadata";a.src=t[1];a.onloadedmetadata=()=>{$("d"+i).textContent=tm(a.duration)}});
const mplay=()=>au.play().catch(()=>{$("artist").textContent="Could not play. Check that the music files were uploaded."});
const mtoggle=()=>au.paused?mplay():au.pause();
$("plist").onclick=e=>{const b=e.target.closest("button");if(b){mload(+b.dataset.i);mplay()}};
$("pp").onclick=mtoggle;$("bgm").onclick=mtoggle;
$("prev").onclick=()=>{const p=!au.paused;mload((ti+TR.length-1)%TR.length);if(p)mplay()};
$("next").onclick=()=>{const p=!au.paused;mload((ti+1)%TR.length);if(p)mplay()};
$("vol").oninput=e=>{au.volume=e.target.value/100};
$("seek").oninput=e=>{if(au.duration)au.currentTime=e.target.value/1000*au.duration};
au.onplay=au.onpause=()=>{const p=!au.paused;$("pp").textContent=p?"⏸":"▶";$("pp").setAttribute("aria-label",p?"Pause":"Play");$("bgm").textContent=p?"🎵 Music: on":"🎵 Music: off";$("bgm").setAttribute("aria-pressed",p);$("disc").classList.toggle("spin",p)};
au.ontimeupdate=()=>{if(au.duration)$("seek").value=au.currentTime/au.duration*1000;$("cur").textContent=tm(au.currentTime)};
au.onloadedmetadata=()=>{$("dur").textContent=tm(au.duration)};
au.onended=()=>{mload((ti+1)%TR.length);mplay()};
au.onerror=()=>{$("artist").textContent="Audio file not found. Check the music file names."};
mload(0);
/* map */
const MT={dc:["🗄️","Data center hub"],co:["🏢","Technology company"],ed:["🎓","University"]};
const MP=[
["Ashburn, Virginia, USA","dc",39.0438,-77.4874,"Northern Virginia hosts one of the largest concentrations of data centers in the world, storing cloud data for many companies."],
["The Dalles, Oregon, USA","dc",45.5946,-121.1787,"Google opened one of its first company-built data centers here in 2006."],
["Council Bluffs, Iowa, USA","dc",41.2619,-95.8608,"A large Google data center campus operates here in the central United States."],
["Dublin, Ireland","dc",53.3498,-6.2603,"Ireland has many data centers serving cloud customers across Europe."],
["Frankfurt, Germany","dc",50.1109,8.6821,"Home to DE-CIX, one of the world's largest internet exchange points, which attracts many data centers."],
["Luleå, Sweden","dc",65.5848,22.1547,"Meta built a data center near Luleå, where the cold climate helps cool the servers."],
["Singapore","dc",1.3521,103.8198,"A major data center hub for Southeast Asia."],
["Apple Park, Cupertino, USA","co",37.3349,-122.009,"Headquarters of Apple, which makes devices that rely on flash storage."],
["Googleplex, Mountain View, USA","co",37.422,-122.0841,"Headquarters of Google, which runs cloud storage services such as Google Drive."],
["Microsoft Campus, Redmond, USA","co",47.6396,-122.1285,"Headquarters of Microsoft, which offers OneDrive and Azure cloud storage."],
["Samsung Digital City, Suwon, South Korea","co",37.2574,127.0556,"Samsung is one of the largest makers of flash memory and SSDs."],
["TSMC, Hsinchu, Taiwan","co",24.7814,120.997,"TSMC is the world's largest contract chip maker, producing chips used in computers and devices."],
["MIT, Cambridge, USA","ed",42.3601,-71.0942,"A research university known for computing and engineering."],
["Stanford University, USA","ed",37.4275,-122.1697,"Located in Silicon Valley, close to many technology companies."],
["Columbia University, New York, USA","ed",40.8075,-73.9626,"An Ivy League university in New York City."],
["University of Oxford, UK","ed",51.7548,-1.2544,"One of the world's oldest universities, with large library archives."],
["ETH Zurich, Switzerland","ed",47.3763,8.5476,"A Swiss technical university with strong computer science research."],
["National University of Singapore","ed",1.2966,103.7764,"A leading Asian university for engineering and computing."],
["University of Toronto, Canada","ed",43.6629,-79.3957,"Known for research in artificial intelligence."]];
if(window.L){
const lm=L.map("lmap",{scrollWheelZoom:false}).setView([25,10],2),lay=L.layerGroup().addTo(lm);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(lm);
lm.on("click",()=>lm.scrollWheelZoom.enable());lm.on("mouseout",()=>lm.scrollWheelZoom.disable());
const pin=(e,c)=>L.divIcon({className:"pin "+c,html:e,iconSize:[34,34],iconAnchor:[17,17],popupAnchor:[0,-16]});
let MK=[],flt="all",cur=MP,sm=null;
function draw(items,fit){lay.clearLayers();MK=items.map(p=>L.marker([p[2],p[3]],{icon:pin(MT[p[1]][0],p[1]),title:p[0]}).addTo(lay).bindPopup(`<b>${p[0]}</b><br><i>${MT[p[1]][1]}</i><p>${p[4]}</p>`));
$("mlist").innerHTML=items.length?items.map((p,i)=>`<button data-i="${i}"><span class="pin ${p[1]}">${MT[p[1]][0]}</span><span><b>${p[0]}</b><small>${MT[p[1]][1]}</small></span></button>`).join(""):"<p>No matches in the example list.</p>";
cur=items;if(fit&&items.length)lm.fitBounds(items.map(p=>[p[2],p[3]]),{padding:[40,40],maxZoom:6})}
const FL=[["all","All"],["dc","🗄️ Data centers"],["co","🏢 Companies"],["ed","🎓 Universities"]];
function chips(){$("mfilt").innerHTML=FL.map(f=>`<button class="chip" data-f="${f[0]}" aria-pressed="${f[0]==flt}">${f[1]}</button>`).join("")}
$("mfilt").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;flt=b.dataset.f;chips();$("mstat").textContent="";draw(flt=="all"?MP:MP.filter(p=>p[1]==flt),true)};
$("mlist").onclick=e=>{const b=e.target.closest("button");if(!b)return;const i=+b.dataset.i,p=cur[i];lm.flyTo([p[2],p[3]],8);MK[i].openPopup()};
$("mreset").onclick=()=>{flt="all";$("mq").value="";$("mstat").textContent="";if(sm){lm.removeLayer(sm);sm=null}chips();draw(MP,false);lm.setView([25,10],2)};
$("msearch").onsubmit=e=>{e.preventDefault();const q=$("mq").value.trim();if(!q)return;const ql=q.toLowerCase(),m=MP.filter(p=>p[0].toLowerCase().includes(ql)||MT[p[1]][1].toLowerCase().includes(ql));
if(m.length){flt="all";chips();draw(m,true);$("mstat").textContent=`${m.length} example location${m.length>1?"s":""} found.`;return}
$("mstat").textContent="Searching…";
fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(q)).then(r=>r.json()).then(d=>{if(!d.length){$("mstat").textContent="No place found. Try another name.";return}
const p=d[0],n=document.createElement("div");n.textContent=p.display_name;if(sm)lm.removeLayer(sm);sm=L.marker([+p.lat,+p.lon],{icon:pin("📍","sr")}).addTo(lm).bindPopup(n).openPopup();lm.flyTo([+p.lat,+p.lon],11);$("mstat").textContent="Showing your search result."}).catch(()=>{$("mstat").textContent="Search is unavailable right now. Check your connection."})};
chips();draw(MP,false);
}else{$("lmap").innerHTML="<p style='padding:1rem'>The map could not load. Check your internet connection.</p>"}
const bg=document.querySelector(".burger"),mn=document.getElementById("menu");
bg.onclick=()=>{const o=mn.classList.toggle("show");bg.setAttribute("aria-expanded",o)};mn.onclick=()=>mn.classList.remove("show");
