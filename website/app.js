const subjects = [
  {slug:"mathematics",name:"Mathematics",desc:"Study materials and revision resources.",icon:"∑"},
  {slug:"physics",name:"Physics",desc:"Notes, books and previous examinations.",icon:"⚡"},
  {slug:"chemistry",name:"Chemistry",desc:"Notes, books and previous examinations.",icon:"⚗"},
  {slug:"biology",name:"Biology",desc:"Notes, books and previous examinations.",icon:"🧬"},
  {slug:"english",name:"English",desc:"Study materials and revision resources.",icon:"A"},
  {slug:"geography",name:"Geography",desc:"Notes, books and previous examinations.",icon:"🌍"},
  {slug:"history",name:"History",desc:"Notes, books and previous examinations.",icon:"⌛"},
  {slug:"somali",name:"Af-Soomaali",desc:"Study materials and revision resources.",icon:"أ"},
  {slug:"arabic",name:"Arabic",desc:"Study materials and revision resources.",icon:"ع"},
  {slug:"islamic",name:"Islamic Studies",desc:"Notes, books and previous examinations.",icon:"☪"},
  {slug:"ict",name:"ICT",desc:"Notes, books and previous examinations.",icon:"⌘"},
  {slug:"business",name:"Business",desc:"Study materials and revision resources.",icon:"▣"}
];

const typeMeta = {
  "pdf-notes": {label:"PDF Notes", icon:"📄"},
  "books": {label:"Books", icon:"📚"},
  "past-exams": {label:"Past Exams", icon:"📝"}
};

const sample = (s, type) => {
  if(type==="pdf-notes") return [{title:`${s.name} — Sample Notes`, file:`${s.slug}-sample-notes.pdf`, desc:`Sample ${s.name} notes. `}];
  if(type==="books") return [{title:`${s.name} — Sample Book`, file:`${s.slug}-sample-book.pdf`, desc:`Sample ${s.name} book. `}];
  return [{title:`${s.name} —  Past Exam 2026`, file:`${s.slug}-past-exam-2026.pdf`, desc:`Sample ${s.name} `}];
};

function resourcePath(subject, type, file){ return `documents/${subject}/${type}/${file}`; }

function nav(){
  document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));
  document.getElementById("menuBtn")?.addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
}

function subjectCard(s){
  return `<article class="subject-card">
    <div class="subject-icon">${s.icon}</div>
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
    <a class="link" href="#subject/${s.slug}">Explore Subject →</a>
  </article>`;
}

function home(){
  document.title="Garaad Kaab Academy";
  return `<section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">FORM FOUR • STUDY RESOURCE HUB</span>
        <h1>Everything you need to <span>study smarter.</span></h1>
        <p>Find Form Four PDF notes, books and past examinations for your subjects — organized in one clean, simple place.</p>
        <div class="actions">
          <a class="btn btn-primary" href="#subjects">Explore Subjects →</a>
          <a class="btn btn-light" href="#resources">Browse Resources</a>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-top"><strong>Learning resources</strong><span class="pulse"></span></div>
        <div class="resource-mini"><strong>📄 PDF Notes</strong><span>Read online or download</span></div>
        <div class="resource-mini"><strong>📚 Books</strong><span>Textbooks and revision books</span></div>
        <div class="resource-mini"><strong>📝 Past Exams</strong><span>Practice with previous papers</span></div>
      </div>
    </div>
  </section>
  <section class="section" id="subjects">
    <div class="container">
      <div class="section-head"><div><h2>Subjects</h2><p>Choose a subject to find its notes, books and past exams.</p></div><input id="subjectSearch" class="search" placeholder="Search subjects..." /></div>
      <div id="subjectGrid" class="subject-grid">${subjects.map(subjectCard).join("")}</div>
      <div class="stats">
        <div class="stat"><strong>${subjects.length}</strong><span>Subjects</span></div>
        <div class="stat"><strong>3</strong><span>Resource categories</span></div>
        <div class="stat"><strong>PDF</strong><span>Readable online</span></div>
        <div class="stat"><strong>Free</strong><span>Student access</span></div>
      </div>
    </div>
  </section>`;
}

function resources(){
  return `<section class="section" id="resources">
    <div class="container">
      <div class="section-head"><div><h2>Resources</h2><p>Search across the academy's subjects and resource types.</p></div><input id="resourceSearch" class="search" placeholder="Search resources..." /></div>
      <div id="resourceResults" class="resource-list"></div>
    </div>
  </section>`;
}

function subjectPage(slug){
  const s=subjects.find(x=>x.slug===slug);
  if(!s) return `<section class="section"><div class="container"><div class="empty">Subject not found.</div></div></section>`;
  document.title=`${s.name} — Garaad Kaab Academy`;
  return `<section class="resource-page"><div class="container">
    <div class="breadcrumb"><a href="#home">Home</a> / <a href="#subjects">Subjects</a> / ${s.name}</div>
    <div class="subject-title"><div class="subject-icon">${s.icon}</div><div><h1>${s.name}</h1><p style="margin:6px 0 0;color:var(--muted)">${s.desc}</p></div></div>
    ${Object.keys(typeMeta).map(type => `<section class="resource-section">
      <h2>${typeMeta[type].icon} ${typeMeta[type].label}</h2>
      <div class="resource-list">${sample(s,type).map(r=>resourceCard(s,type,r)).join("")}</div>
    </section>`).join("")}
  </div></section>`;
}

function resourceCard(s,type,r){
  const path=resourcePath(s.slug,type,r.file);
  return `<article class="resource-card">
    <span class="resource-type">${typeMeta[type].label}</span>
    <h3>${r.title}</h3>
    <p>${r.desc}</p>
    <div class="resource-actions">
      <a class="btn btn-primary" href="#reader?file=${encodeURIComponent(path)}&title=${encodeURIComponent(r.title)}">👁 View PDF</a>
      <a class="btn btn-download" href="${path}" download>⬇ Download</a>
    </div>
  </article>`;
}

function reader(params){
  const file=params.get("file"), title=params.get("title") || "PDF Resource";
  if(!file) return `<section class="section"><div class="container"><div class="empty">PDF file not found.</div></div></section>`;
  document.title=`${title} — Garaad Kaab Academy`;
  return `<section class="reader"><div class="container">
    <div class="reader-head">
      <div><div class="breadcrumb"><a href="#home">Home</a> / PDF Reader</div><h1>${decodeURIComponent(title)}</h1></div>
      <a class="btn btn-download" href="${file}" download>⬇ Download PDF</a>
    </div>
    <div class="notice">If your browser displays its built-in PDF viewer, you can read, zoom, navigate pages and use its print/fullscreen controls.</div>
    <iframe class="pdf-frame" src="${file}" title="${decodeURIComponent(title)}"></iframe>
  </div></section>`;
}

function allResources(){
  return subjects.flatMap(s=>Object.keys(typeMeta).flatMap(type=>sample(s,type).map(r=>({s,type,r}))));
}

function wireHome(){
  const input=document.getElementById("subjectSearch");
  const grid=document.getElementById("subjectGrid");
  input?.addEventListener("input",()=>{
    const q=input.value.toLowerCase().trim();
    grid.innerHTML=subjects.filter(s=>(s.name+" "+s.desc).toLowerCase().includes(q)).map(subjectCard).join("") || `<div class="empty" style="grid-column:1/-1">No subjects found.</div>`;
  });
}
function wireResources(){
  const input=document.getElementById("resourceSearch");
  const out=document.getElementById("resourceResults");
  const render=(q="")=>{
    const list=allResources().filter(x=>(x.s.name+" "+x.r.title+" "+x.type).toLowerCase().includes(q.toLowerCase()));
    out.innerHTML=list.map(x=>resourceCard(x.s,x.type,x.r)).join("") || `<div class="empty" style="grid-column:1/-1">No resources found.</div>`;
  };
  render(); input?.addEventListener("input",()=>render(input.value));
}

function route(){
  const hash=location.hash || "#home";
  const app=document.getElementById("app");
  if(hash.startsWith("#subject/")) app.innerHTML=subjectPage(hash.split("/")[1]);
  else if(hash.startsWith("#reader?")) app.innerHTML=reader(new URLSearchParams(hash.split("?")[1]));
  else if(hash==="#resources") app.innerHTML=resources();
  else app.innerHTML=home();
  nav();
  wireHome();
  wireResources();
  window.scrollTo({top:0,behavior:"instant"});
}
window.addEventListener("hashchange",route);
route();
