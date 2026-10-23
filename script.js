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
/* weather */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const WC={0:["Clear sky","☀️"],1:["Mainly clear","🌤️"],2:["Partly cloudy","⛅"],3:["Overcast","☁️"],45:["Fog","🌫️"],48:["Freezing fog","🌫️"],51:["Light drizzle","🌦️"],53:["Drizzle","🌦️"],55:["Heavy drizzle","🌦️"],56:["Freezing drizzle","🌧️"],57:["Freezing drizzle","🌧️"],61:["Light rain","🌧️"],63:["Rain","🌧️"],65:["Heavy rain","🌧️"],66:["Freezing rain","🌧️"],67:["Freezing rain","🌧️"],71:["Light snow","🌨️"],73:["Snow","🌨️"],75:["Heavy snow","❄️"],77:["Snow grains","🌨️"],80:["Rain showers","🌦️"],81:["Rain showers","🌧️"],82:["Violent rain showers","🌧️"],85:["Snow showers","🌨️"],86:["Heavy snow showers","❄️"],95:["Thunderstorm","⛈️"],96:["Thunderstorm with hail","⛈️"],99:["Thunderstorm with hail","⛈️"]};
const wd=c=>WC[c]||["Unknown","❔"],wn=v=>v==null?"–":Math.round(v);
const WPRE=[["New York",40.7128,-74.006,"United States"],["London",51.5072,-0.1276,"United Kingdom"],["Tokyo",35.6762,139.6503,"Japan"],["Sydney",-33.8688,151.2093,"Australia"],["Dubai",25.2048,55.2708,"United Arab Emirates"]];
let wp=null,wun="c",wreq=0,wres=[];
function wchips(){$("wpre").innerHTML=WPRE.map((p,i)=>`<button class="chip" data-i="${i}" aria-pressed="${!!wp&&wp.name==p[0]}">${p[0]}</button>`).join("");
$("wun").innerHTML=[["c","°C · km/h"],["f","°F · mph"]].map(u=>`<button class="chip" data-u="${u[0]}" aria-pressed="${wun==u[0]}">${u[1]}</button>`).join("")}
async function wload(p){wp=p;wchips();const id=++wreq,f=wun=="f";
$("wout").innerHTML=`<p class="wload"><span class="spin2"></span> Loading weather for ${esc(p.name)}…</p>`;
const url=`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7&temperature_unit=${f?"fahrenheit":"celsius"}&wind_speed_unit=${f?"mph":"kmh"}`;
try{const ac=new AbortController(),t=setTimeout(()=>ac.abort(),12000);const r=await fetch(url,{signal:ac.signal});clearTimeout(t);if(!r.ok)throw new Error("HTTP "+r.status);const d=await r.json();if(id!=wreq)return;if(!d.current||!d.daily)throw new Error("Unexpected response");wshow(p,d)}
catch(e){if(id!=wreq)return;$("wout").innerHTML=`<div class="werr" role="alert"><b>Could not load weather.</b> ${e.name=="AbortError"?"The request timed out.":"The weather service did not respond."} No data is shown. <button class="chip" id="wretry">Try again</button></div>`;$("wretry").onclick=()=>wload(p)}}
function wshow(p,d){const c=d.current,u=d.current_units||{},q=d.daily,[tx,ic]=wd(c.weather_code);
const days=q.time.map((t,i)=>{const [cx,ci]=wd(q.weather_code[i]),nm=i==0?"Today":new Date(t+"T00:00:00").toLocaleDateString(undefined,{weekday:"short"});
return`<div class="wday"><b>${nm}</b><span class="wi">${ci}</span><small>${cx}</small><div>${wn(q.temperature_2m_max[i])}° <small>${wn(q.temperature_2m_min[i])}°</small></div><small>💧 ${q.precipitation_probability_max[i]==null?"–":q.precipitation_probability_max[i]+"%"}</small></div>`}).join("");
$("wout").innerHTML=`<div class="wnow"><div><h3>${esc(p.name)}${p.sub?", "+esc(p.sub):""}</h3><div class="wtemp">${wn(c.temperature_2m)}${esc(u.temperature_2m||"°")}</div><p>${ic} ${tx} · Feels like ${wn(c.apparent_temperature)}${esc(u.apparent_temperature||"°")}</p></div>
<div class="wstats"><div><span>💧</span><b>${wn(c.relative_humidity_2m)}${esc(u.relative_humidity_2m||"%")}</b>Humidity</div><div><span>💨</span><b>${wn(c.wind_speed_10m)} ${esc(u.wind_speed_10m||"")}</b>Wind speed</div></div></div>
<p class="note">Local time at this location when measured: ${esc(String(c.time).replace("T"," "))}</p><h3 class="wfh">7-day forecast</h3><div class="wfc">${days}</div>`}
async function wsearch(q){const id=++wreq;$("wout").innerHTML=`<p class="wload"><span class="spin2"></span> Searching for “${esc(q)}”…</p>`;
try{const r=await fetch("https://geocoding-api.open-meteo.com/v1/search?count=5&language=en&format=json&name="+encodeURIComponent(q));if(!r.ok)throw 0;const d=await r.json();if(id!=wreq)return;
wres=(d.results||[]).map(x=>({name:x.name,sub:[x.admin1,x.country].filter(Boolean).join(", "),lat:x.latitude,lon:x.longitude}));
if(!wres.length){$("wout").innerHTML=`<div class="werr" role="alert">No city found for “${esc(q)}”. Check the spelling or try another name.</div>`;return}
if(wres.length==1){wload(wres[0]);return}
$("wout").innerHTML=`<p><b>Select a location</b></p><div class="wchoices">${wres.map((x,i)=>`<button data-i="${i}">${esc(x.name)} <small>${esc(x.sub)}</small></button>`).join("")}</div>`}
catch(e){if(id!=wreq)return;$("wout").innerHTML=`<div class="werr" role="alert"><b>Search failed.</b> The location service did not respond. Check your connection and try again.</div>`}}
$("wsearch").onsubmit=e=>{e.preventDefault();const q=$("wq").value.trim();if(q)wsearch(q)};
$("wpre").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;const p=WPRE[b.dataset.i];wload({name:p[0],sub:p[3],lat:p[1],lon:p[2]})};
$("wun").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;wun=b.dataset.u;wchips();if(wp)wload(wp)};
$("wout").onclick=e=>{const b=e.target.closest(".wchoices button");if(b)wload(wres[b.dataset.i])};
wchips();wload({name:WPRE[0][0],sub:WPRE[0][3],lat:WPRE[0][1],lon:WPRE[0][2]});
/* videos */
const VT={dev:"How HDDs and SSDs work",diff:"HDD vs SSD",cloud:"Cloud and data centers",sec:"Cybersecurity"};
const VID=[
{t:"How do hard drives work?",src:"TED-Ed",len:"about 5 min",topic:"dev",kind:"ted",id:"kanawat_senanan_how_do_hard_drives_work",ico:"💽",d:"An animated lesson on how a hard drive stores so much information in such a small space, and the engineers and scientists who made it possible.",link:"https://www.ted.com/talks/kanawat_senanan_how_do_hard_drives_work"},
{t:"What's the difference between HDD and SSD?",src:"Mr Long Computer Terms",len:"YouTube",topic:"diff",kind:"yt",id:"xlwghmT6NWc",ico:"⚡",d:"Explains what an HDD and an SSD are, how each one stores data, and how the two differ.",link:"https://www.youtube.com/watch?v=xlwghmT6NWc"},
{t:"What is the Internet, really?",src:"Andrew Blum · TED",len:"about 12 min",topic:"cloud",kind:"ted",id:"andrew_blum_what_is_the_internet_really",ico:"☁️",d:"After a squirrel chews through his cable, journalist Andrew Blum goes looking for where the Internet physically lives: large data centers, network hubs and undersea cables. A look at where cloud data is actually stored.",link:"https://www.ted.com/talks/andrew_blum_what_is_the_internet_really"},
{t:"What's wrong with your pa$$w0rd?",src:"Lorrie Faith Cranor · TED",len:"TED Talk",topic:"sec",kind:"ted",id:"lorrie_faith_cranor_what_s_wrong_with_your_pa_w0rd",ico:"🔐",d:"A researcher studied thousands of real passwords to find the common mistakes people and websites make, which helps you protect your accounts.",link:"https://www.ted.com/talks/lorrie_faith_cranor_what_s_wrong_with_your_pa_w0rd"}];
const vposter=(v,i)=>`<button class="vposter" data-i="${i}" aria-label="Play video: ${esc(v.t)}">${v.kind=="yt"?`<img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.parentNode.dataset.bad=1;this.remove()">`:`<span class="vico">${v.ico}</span>`}<span class="vplay">▶</span><span class="vlabel">Play video</span></button>`;
let vf="all",vp=null;
function vdraw(){vp=null;$("vfilt").innerHTML=[["all","All"],...Object.entries(VT)].map(([k,l])=>`<button class="chip" data-f="${k}" aria-pressed="${k==vf}">${l}</button>`).join("");
$("vgrid").innerHTML=VID.map((v,i)=>[v,i]).filter(([v])=>vf=="all"||v.topic==vf).map(([v,i])=>`<article class="vcard"><div class="vwrap" id="vw${i}">${vposter(v,i)}</div><div class="vbody"><span class="vtag">${VT[v.topic]}</span><h3>${esc(v.t)}</h3><p class="vsrc">${esc(v.src)} · ${v.len}</p><p>${v.d}</p><a href="${v.link}" target="_blank" rel="noopener">Open on ${v.kind=="ted"?"TED":"YouTube"} ↗</a></div></article>`).join("")}
$("vfilt").onclick=e=>{const b=e.target.closest(".chip");if(b){vf=b.dataset.f;vdraw()}};
$("vgrid").onclick=e=>{const b=e.target.closest(".vposter");if(!b)return;const i=+b.dataset.i,v=VID[i],w=$("vw"+i);
if(b.dataset.bad){if(!w.querySelector(".vmsg"))w.insertAdjacentHTML("beforeend",`<p class="vmsg">This video could not be confirmed and may have been removed. Try the "Open on YouTube" link below.</p>`);return}
if(vp!==null&&vp!==i&&$("vw"+vp))$("vw"+vp).innerHTML=vposter(VID[vp],vp);vp=i;
const src=v.kind=="ted"?`https://embed.ted.com/talks/${v.id}`:`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
w.innerHTML=`<iframe src="${src}" title="${esc(v.t)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
if(!au.paused)au.pause()};
vdraw();
/* movies */
const MV=[
{t:"How Safe Are You Really?",sub:"TEDx talk · information security",kind:"ted",id:"will_schmidt_how_safe_are_you_really",ico:"🔐",d:"Explores how and why hackers go after your passwords and personal information. It pairs well with this chapter's backup and security section.",lic:"Shown with TED's official embed player.",link:"https://www.ted.com/talks/will_schmidt_how_safe_are_you_really",src:"TED"},
{t:"When You Are a Pedestrian",sub:"1948 · public-domain educational film",kind:"ia",id:"WhenYouA1948",ico:"🎞️",thumb:"https://archive.org/services/img/WhenYouA1948",d:"A 1948 educational short about pedestrian safety. It was the first film in the Prelinger Archives collection, which is now free for anyone to watch and reuse.",lic:"Public domain. Hosted by the Internet Archive.",link:"https://archive.org/details/WhenYouA1948",src:"the Internet Archive"}];
let mi=0;
const mposter=m=>`<button class="vposter" aria-label="Play film: ${esc(m.t)}">${m.thumb?`<img src="${m.thumb}" alt="" onerror="this.remove()">`:`<span class="vico">${m.ico}</span>`}<span class="mpost"><small>${esc(m.sub)}</small><b>${esc(m.t)}</b></span><span class="vplay">▶</span></button>`;
function mdraw(){const m=MV[mi];
$("mvsel").innerHTML=MV.map((f,i)=>`<button class="chip" data-i="${i}" aria-pressed="${i==mi}">${f.ico} ${esc(f.t)}</button>`).join("");
$("mvstage").innerHTML=mposter(m);
$("mvinfo").innerHTML=`<span class="vtag">${esc(m.sub)}</span><h3>${esc(m.t)}</h3><p>${m.d}</p><p class="vsrc">${m.lic}</p><a href="${m.link}" target="_blank" rel="noopener">Open on ${m.src} ↗</a><p class="note">If the film does not load or your school blocks the player, use the link above to watch it directly.</p>`}
$("mvsel").onclick=e=>{const b=e.target.closest(".chip");if(b){mi=+b.dataset.i;mdraw()}};
$("mvstage").onclick=e=>{if(!e.target.closest(".vposter"))return;const m=MV[mi],src=m.kind=="ted"?`https://embed.ted.com/talks/${m.id}`:`https://archive.org/embed/${m.id}`;
$("mvstage").innerHTML=`<iframe src="${src}" title="${esc(m.t)}" allow="fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;if(!au.paused)au.pause()};
mdraw();
/* chatbot */
const CHAT_API_URL=""; /* Paste your secure server URL here to enable the live AI. Never paste an API key. */
const CK="storage-chat-v2";let convos=[],cc=null,hist=[],live=!!CHAT_API_URL,busy=false,rv=null;
try{convos=JSON.parse(localStorage.getItem(CK)||"[]");if(!Array.isArray(convos))convos=[]}catch(e){convos=[]}
try{const old=JSON.parse(localStorage.getItem("storage-chat-v1")||"[]");if(old.length&&!convos.length)convos.push({id:Date.now(),title:"Earlier chat",ts:Date.now(),msgs:old})}catch(e){}
function newConvo(){cc={id:Date.now(),title:"New chat",ts:Date.now(),msgs:[]};convos.unshift(cc);hist=cc.msgs}
const csave=()=>{if(cc&&cc.msgs.length){const f=cc.msgs.find(m=>m.r=="me");if(f)cc.title=f.t.slice(0,40);cc.ts=Date.now()}try{localStorage.setItem(CK,JSON.stringify(convos.filter(c=>c.msgs.length).slice(0,20).map(c=>({id:c.id,title:c.title,ts:c.ts,msgs:c.msgs.slice(-60)}))))}catch(e){}if(!$("chist").hidden)renderHist()};
function badge(){$("cmode").textContent=live?"🟢 Live AI (Claude)":"🟡 Demo mode: predefined answers, not a live AI";$("cmode").className="cbadge "+(live?"live":"demo");
$("cnote").textContent=live?"AI can make mistakes. Check important facts with your textbook.":"Demo mode can chat a little and answer storage questions. For open conversation about any topic, connect the live AI (see chatbot-server/README.md)."}
function cshow(m){const d=document.createElement("div");d.className="msg "+(m.r=="me"?"me":"bot")+(m.h?"":" txt");if(m.h)d.innerHTML=m.t;else d.textContent=m.t;$("clog").appendChild(d);$("clog").scrollTop=$("clog").scrollHeight;return d}
function say(t,r,h){const m={r,t,h:!!h};hist.push(m);csave();return cshow(m)}
const KB=[
[["how are you","how r you","how do you do","whats up","what's up"],10,"I'm doing well, thanks for asking! I'm best at storage questions, so what would you like to know?"],
[["who are you","your name","what are you","who made you"],10,"I'm the storage chatbot for this Chapter 7 website. In demo mode I use built-in notes. With a live AI connected, I can chat about almost anything."],
[["what can you do","can you help","help me"],6,"I can explain storage concepts, compare HDDs, SSDs, USB drives and the cloud, recommend storage for your needs, work out how many files fit on a device, explain backup and security, and quiz you on the chapter."],
[["joke","funny"],10,"Why don't hard drives ever win races? They keep going in circles!"],
[["good morning","good afternoon","good evening"],10,"Hello! Hope your day is going well. What would you like to learn about storage?"],
[["bye","goodbye","see you","good night"],10,"Goodbye! Come back any time to chat or review the chapter."],
[["i love you","you are great","you're great","good job"],10,"Thank you, that's kind! Let me know if there's anything else I can help with."],
[["compare","comparison","hdd ssd usb cloud","all four"],10,"Here is a quick comparison:<ul><li><b>HDD:</b> cheapest per GB and very large, but slower and fragile when running.</li><li><b>SSD:</b> fast and tough, but costs more per GB.</li><li><b>USB drive:</b> tiny and portable, but easy to lose and modest in size.</li><li><b>Cloud:</b> reach files anywhere and the provider backs them up, but you need internet and pay fees.</li></ul>See the <a href='#compare'>comparison table</a> to compare more."],
[["hdd vs ssd","ssd vs hdd","hdd and ssd","ssd and hdd","hdd or ssd","ssd or hdd"],8,"An SSD uses flash chips with no moving parts, so it is much faster and tougher. An HDD uses spinning magnetic platters, so it costs far less per GB and holds huge amounts. Pick an SSD for speed and an HDD for cheap bulk storage."],
[["hdd","hard drive","hard disk","platter","platters"],0,"An HDD (hard disk drive) stores data magnetically on spinning platters read by a moving head. It is cheap per GB and holds a lot, but it is slower and can break if dropped."],
[["ssd","solid state","solid-state","flash memory"],0,"An SSD (solid-state drive) keeps data in flash memory chips. With no moving parts it is fast, quiet and tough, but costs more per GB than an HDD."],
[["nvme","pcie","m.2"],0,"NVMe SSDs connect over PCIe lanes and reach about 3,000 to 7,000+ MB/s, far faster than SATA. They suit gaming and video editing."],
[["sata"],0,"SATA is an older drive connection. SATA SSDs top out near 550 MB/s, still much faster than an HDD, and work in older computers."],
[["usb","flash drive","thumb drive","pen drive"],0,"A USB flash drive is a small plug-in flash stick. It is portable and cheap, perfect for moving files, but easy to lose and slower than an SSD."],
[["sd card","memory card","microsd","sd"],0,"Memory cards (SD and microSD) are small removable flash cards for cameras, phones and consoles. Choose a fast speed class for video."],
[["cd","dvd","blu-ray","bluray","optical","disc"],0,"Optical discs are read by a laser. A CD holds about 700 MB, a DVD 4.7 GB and a Blu-ray 25 GB or more. They are cheap but slow and scratch easily."],
[["cloud","google drive","onedrive","dropbox","icloud","data center","datacenter"],0,"Cloud storage keeps your files on a provider's servers in data centers, so you can reach them from any device with internet. See data centers on the <a href='#map'>map</a>."],
[["ram","volatile","memory"],0,"RAM is fast working memory that clears when power is off. Storage keeps data permanently. Your computer loads files from storage into RAM to use them."],
[["kb","mb","gb","tb","byte","bytes","bit","bits","capacity","units"],0,"Each unit is about 1,000 times the last: KB, MB, GB, TB. A phone photo is a few MB, a film a few GB. Ask me something like \"how many photos fit on 128 GB?\""],
[["speed","fast","faster","slow","mb/s"],0,"NVMe SSDs are fastest, then SATA SSDs, then HDDs. Optical discs and slow cards are slowest. Cloud speed depends on your internet."],
[["durable","durability","cost","price","portable","portability"],0,"Judge storage by capacity, speed, durability, portability and cost. HDDs win on cost per GB, SSDs on speed and durability, USB drives and cards on portability."],
[["backup","back up","3-2-1","321","restore"],0,"Follow the 3-2-1 rule: keep 3 copies of your data, on 2 different types of media, with 1 copy off-site, such as the cloud."],
[["encrypt","encrypted","encryption","bitlocker","filevault"],0,"Encryption scrambles data so only someone with the key can read it. Turn on BitLocker (Windows) or FileVault (Mac) so a lost drive stays private."],
[["security","secure","safe","protect","password","passwords","hacker","malware","ransomware","2fa","virus"],0,"To keep data safe: use strong, unique passwords, turn on two-factor authentication, keep software updated, encrypt drives, and keep backups in case of malware. See the <a href='#security'>security checklist</a>."],
[["game","games","gaming","gamer"],10,"For gaming, an NVMe SSD (1 TB or more) gives the shortest load times. On a budget, use a SATA SSD for favorite games and an HDD for the rest."],
[["school","homework","student","assignment"],10,"For schoolwork, a laptop SSD plus cloud storage is ideal. On a budget, a USB flash drive plus free cloud storage works well. Keep a second copy of important work."],
[["photo","photos","photography","camera"],10,"For photography, use fast memory cards in the camera, an NVMe SSD for editing, and an HDD plus cloud for long-term backups."],
[["business","company","office"],10,"For business, use encrypted drives, managed cloud storage with access controls, and regular backups kept off-site."],
[["cheap","budget","cheapest","affordable"],10,"On a budget, an HDD gives the most space per dollar, and a USB flash drive is a cheap way to carry files. Add free cloud storage for a backup copy."],
[["carry","travel","portable storage"],10,"To carry files, a USB flash drive or a small external SSD is best. Memory cards work for cameras and phones."],
[["share","team","collaborate"],10,"To share files with others, use cloud storage. Everyone can reach the same files from anywhere."],
[["recommend","suggest","which storage","what should i buy","best storage","help me choose"],0,"Happy to help! Tell me what you need it for (gaming, schoolwork, photos, business or backups) and whether cost, speed or portability matters most. You can also try the <a href='#recommend'>recommendation tool</a>."],
[["hello","hi","hey"],0,"Hello! Ask me about HDDs, SSDs, USB drives, the cloud, capacity or security, or tap \"Quiz me\" to review the chapter."],
[["thanks","thank"],0,"You're welcome! Ask another question any time."]];
const kre=k=>new RegExp("(^|[^a-z0-9])"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?($|[^a-z0-9])");
function demo(q){if(/what('?s| is) (the )?(time|date|day)|what day (is|are)/i.test(q))return "Right now it is "+new Date().toLocaleString([],{weekday:"long",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})+" on your device.";
const m=q.match(/(\d+(?:\.\d+)?)\s*(tb|gb|mb)\b/i);
if(m&&/fit|store|hold|how many|photo|song|video|capacity/i.test(q)){const mb=+m[1]*{mb:1,gb:1e3,tb:1e6}[m[2].toLowerCase()];
return `A ${m[1]} ${m[2].toUpperCase()} device holds roughly ${Math.floor(mb/4).toLocaleString()} phone photos (4 MB each), ${Math.floor(mb/4).toLocaleString()} MP3 songs (4 MB each) or ${Math.floor(mb/6e3).toLocaleString()} hours of HD video (6 GB per hour). Real space is a bit less. Try the <a href='#calculator'>calculator</a> for your own mix.`}
q=q.toLowerCase();let best=0,ans=null;KB.forEach(([ks,b,a])=>{let sc=0;ks.forEach(k=>{if(kre(k).test(q))sc+=k.length+b});if(sc>best){best=sc;ans=a}});
return ans||"I can't answer that in demo mode. I only know storage topics and some small talk. For open conversation about anything, the live AI has to be connected. Meanwhile, ask me about HDDs, SSDs, USB drives, the cloud, backups or security, or tap \"Quiz me\"."}
/* review mode */
const REV=[["Which storage has no moving parts?",["HDD","SSD","Optical drive"],1,"SSDs use flash chips, so nothing spins."],["Which is cheapest per GB?",["HDD","NVMe SSD","Memory card"],0,"HDDs give the most space for the least money."],["What does the 3-2-1 backup rule mean?",["3 copies, 2 media types, 1 off-site","3 drives, 2 passwords, 1 cloud account","3 backups a day"],0,"Spreading copies across media and places protects against any single failure."],["What does encryption do?",["Makes files smaller","Scrambles data so only a key holder can read it","Speeds up a drive"],1,"A stolen encrypted drive is unreadable without the key."],["Why is NVMe faster than SATA?",["It uses PCIe lanes","It spins faster","It uses a laser"],0,"PCIe offers far more bandwidth than SATA."],["About how many GB is 1 TB?",["100","1,000","1,000,000"],1,"Each unit is about 1,000 times the last."],["Cloud storage always needs…",["A DVD drive","An internet connection","A USB port"],1,"You reach cloud files over the internet."],["Which optical disc holds the most?",["CD","DVD","Blu-ray"],2,"The blue laser reads smaller pits, so Blu-ray fits more."]];
function sug(){$("csug").innerHTML=["Compare HDD, SSD, USB and cloud","What is NVMe?","How many photos fit on 128 GB?","Recommend storage for gaming","Is my data safe?","Quiz me on the chapter"].map(q=>`<button class="chip">${q}</button>`).join("")}
function askRev(){const q=REV[rv.i];say(`Question ${rv.i+1} of ${REV.length}: ${q[0]}`,"bot");$("csug").innerHTML=q[1].map(o=>`<button class="chip">${o}</button>`).join("")}
function startReview(){rv={i:0,s:0};say("Let's review the chapter. Pick an answer below, or type \"stop\" to end.","bot");askRev()}
function endReview(msg){say(msg,"bot");rv=null;sug()}
function gradeRev(t){const q=REV[rv.i];if(/^stop$/i.test(t.trim()))return endReview("Review ended. Ask me anything else!");
let k=q[1].findIndex(o=>o.toLowerCase()==t.trim().toLowerCase());if(k<0){const l="abc".indexOf(t.trim().toLowerCase());if(t.trim().length==1&&l>=0&&l<q[1].length)k=l}
if(k<0){say("Please choose one of the options, or type \"stop\".","bot");return}
const ok=k==q[2];if(ok)rv.s++;say((ok?"Correct! ":"Not quite. The answer is: "+q[1][q[2]]+". ")+q[3],"bot");rv.i++;
if(rv.i>=REV.length)endReview(`Review finished. You scored ${rv.s} out of ${REV.length}.`);else askRev()}
/* sending */
async function send(text){text=text.trim();if(!text||busy)return;say(text,"me");
if(rv){gradeRev(text);return}
if(/^(quiz me|review|test me)/i.test(text)){startReview();return}
if(!live){setTimeout(()=>say(demo(text),"bot",true),300);return}
busy=true;$("csend").disabled=true;const w=cshow({r:"bot",t:"Thinking…"});
try{let msgs=hist.map(m=>({role:m.r=="me"?"user":"assistant",content:m.t.replace(/<[^>]+>/g,"")}));while(msgs.length&&msgs[0].role!="user")msgs.shift();msgs=msgs.slice(-20);
const ac=new AbortController(),t=setTimeout(()=>ac.abort(),25000);
const r=await fetch(CHAT_API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs}),signal:ac.signal});clearTimeout(t);
if(!r.ok)throw 0;const d=await r.json();if(!d.reply)throw 0;w.remove();say(d.reply,"bot")}
catch(e){w.remove();live=false;badge();say("The live AI is not available right now, so I switched to demo mode.","bot");say(demo(text),"bot",true)}
finally{busy=false;$("csend").disabled=false}}
$("cform").onsubmit=e=>{e.preventDefault();const v=$("cin").value;$("cin").value="";send(v)};
$("csug").onclick=e=>{const b=e.target.closest(".chip");if(b)send(b.textContent)};
const GREET='Hi! I am your storage chatbot. Ask me anything about digital storage, or just chat. Tap "Quiz me" to review the chapter.';
function greet(){cshow({r:"bot",t:GREET})}
function renderHist(){const L=convos.filter(c=>c.msgs.length);$("chist").innerHTML=L.length?L.map(c=>`<div class="hitem${c===cc?" on":""}"><button class="hopen" data-id="${c.id}">${esc(c.title)}<small>${new Date(c.ts).toLocaleString([],{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</small></button><button class="hdel" data-del="${c.id}" aria-label="Delete this conversation">✕</button></div>`).join(""):"<p class='note'>No saved conversations yet.</p>"}
function render(){$("clog").innerHTML="";hist.forEach(cshow);if(!hist.length)greet();sug()}
const idle=()=>{if(busy){say("Please wait for the reply to finish first.","bot");return false}return true};
$("chistbtn").onclick=()=>{const p=$("chist");p.hidden=!p.hidden;$("chistbtn").setAttribute("aria-expanded",!p.hidden);if(!p.hidden)renderHist()};
$("cnew").onclick=()=>{if(!idle())return;if(cc.msgs.length||!convos.includes(cc))newConvo();rv=null;render();$("chist").hidden=true;$("chistbtn").setAttribute("aria-expanded","false")};
$("cclear").onclick=()=>{if(!idle())return;convos=convos.filter(c=>c!==cc);newConvo();rv=null;csave();render()};
$("chist").onclick=e=>{if(!idle())return;const o=e.target.closest(".hopen"),d=e.target.closest(".hdel");
if(o){const c=convos.find(x=>x.id==o.dataset.id);if(c){cc=c;hist=c.msgs;rv=null;render();$("chist").hidden=true;$("chistbtn").setAttribute("aria-expanded","false")}}
else if(d){convos=convos.filter(x=>x.id!=d.dataset.del);if(!convos.includes(cc)){newConvo();rv=null;render()}csave();renderHist()}};
if(convos.filter(c=>c.msgs.length).length){cc=convos.find(c=>c.msgs.length);hist=cc.msgs}else newConvo();
render();badge();
/* nav highlight */
if("IntersectionObserver" in window){const lk=[...document.querySelectorAll("#menu a")],io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)lk.forEach(a=>{const on=a.getAttribute("href")=="#"+en.target.id;a.classList.toggle("active",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")})}),{rootMargin:"-45% 0px -50% 0px"});document.querySelectorAll(".group").forEach(g=>io.observe(g))}
const bg=document.querySelector(".burger"),mn=document.getElementById("menu");
bg.onclick=()=>{const o=mn.classList.toggle("show");bg.setAttribute("aria-expanded",o)};mn.onclick=()=>mn.classList.remove("show");
