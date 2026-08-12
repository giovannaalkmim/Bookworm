"use client";

import { useMemo, useState } from "react";
import { BookOpen, Compass, Heart, Home, Library, MessageCircle, MoreHorizontal, Plus, Search, Send, Star, User, X } from "lucide-react";

const books = [
  { title: "Torto Arado", author: "Itamar Vieira Junior", cover: "linear-gradient(145deg,#d98525,#47230f)", status: "Lendo", progress: 68 },
  { title: "A Vegetariana", author: "Han Kang", cover: "linear-gradient(145deg,#e8e0cd,#788a67)", status: "Quero ler", progress: 0 },
  { title: "Cem Anos de Solidão", author: "Gabriel García Márquez", cover: "linear-gradient(145deg,#243f80,#dfb63c)", status: "Lido", progress: 100 },
  { title: "Água Viva", author: "Clarice Lispector", cover: "linear-gradient(145deg,#e05a66,#2b2450)", status: "Lido", progress: 100 },
  { title: "O Avesso da Pele", author: "Jeferson Tenório", cover: "linear-gradient(145deg,#e3b72b,#161616)", status: "Quero ler", progress: 0 },
];

const posts = [
  { name: "Lívia Ramos", user: "@liviaverso", initials: "LR", time: "há 18 min", book: books[0], text: "A escrita vai abrindo a terra e a memória ao mesmo tempo. Precisei parar aqui para respirar — que capítulo.", likes: 128, comments: 16, page: "Página 179 de 264", rating: 5 },
  { name: "Caio Nunes", user: "@caiolendo", initials: "CN", time: "há 2 h", book: books[2], text: "Terminei Macondo com a sensação de ter vivido muitas vidas. Um livro que muda de forma toda vez que a gente lembra dele.", likes: 94, comments: 21, page: "Leitura concluída", rating: 5 },
  { name: "Maya Costa", user: "@entrepaginas", initials: "MC", time: "ontem", book: books[3], text: "Não é um livro para entender depressa. É para deixar as frases pousarem e voltarem quando quiserem.", likes: 76, comments: 8, page: "42% concluído", rating: 4 },
];

function Cover({ book, small = false }: { book: typeof books[number]; small?: boolean }) {
  return <div className={small ? "cover small" : "cover"} style={{ background: book.cover }}><span>{book.title}</span><small>{book.author}</small></div>;
}

export default function HomePage() {
  const [tab, setTab] = useState("Início");
  const [composer, setComposer] = useState(false);
  const [search, setSearch] = useState("");
  const [profileTab, setProfileTab] = useState("Postagens");
  const [status, setStatus] = useState("Lendo");
  const [progressMode, setProgressMode] = useState("Porcentagem");
  const [progress, setProgress] = useState(68);
  const [postText, setPostText] = useState("");
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => books.filter(b => `${b.title} ${b.author}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const notify = (text: string) => { setToast(text); setTimeout(() => setToast(""), 2400); };

  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => setTab("Início")}><span className="brandmark">B</span><span>BOOKWORM</span></button>
      <nav>
        {[{n:"Início",i:Home},{n:"Descobrir",i:Compass},{n:"Biblioteca",i:Library}].map(({n,i:Icon}) => <button key={n} className={tab===n?"active":""} onClick={() => setTab(n)}><Icon size={19}/>{n}</button>)}
      </nav>
      <div className="actions"><button className="searchButton" onClick={() => setTab("Descobrir")}><Search size={18}/><span>Buscar livros</span></button><button className="newPost" onClick={() => setComposer(true)}><Plus size={19}/>Publicar</button><button className="avatar" onClick={() => setTab("Perfil")}>AM</button></div>
    </header>

    {tab === "Início" && <div className="layout">
      <section className="feed">
        <div className="welcome"><div><p>TERÇA-FEIRA, 12 DE AGOSTO</p><h1>O que você está lendo?</h1></div><button onClick={() => setComposer(true)}><Plus size={18}/> Registrar leitura</button></div>
        <div className="quick" onClick={() => setComposer(true)}><span className="avatar">AM</span><span>Compartilhe um pensamento sobre sua leitura...</span><BookOpen size={20}/></div>
        <div className="feedtitle"><h2>Da sua rede</h2><button>Mais recentes</button></div>
        {posts.map((p, idx) => <article className="post" key={p.user}>
          <div className="posthead"><span className={`avatar tone${idx}`}>{p.initials}</span><div><strong>{p.name}</strong><p>{p.user} · {p.time}</p></div><button className="icon"><MoreHorizontal/></button></div>
          <div className="postbody"><Cover book={p.book}/><div className="postcopy"><div className="reading"><BookOpen size={15}/> {idx===1?"terminou":"está lendo"} <b>{p.book.title}</b></div><p>{p.text}</p><div className="progressrow"><span>{p.page}</span><span>{p.book.progress || 100}%</span></div><div className="bar"><i style={{width:`${p.book.progress || 100}%`}}/></div><div className="stars">{[1,2,3,4,5].map(s=><Star key={s} size={16} fill={s<=p.rating?"currentColor":"none"}/>)}</div></div></div>
          <div className="engage"><button onClick={() => notify("Você curtiu esta publicação")}><Heart size={18}/>{p.likes}</button><button><MessageCircle size={18}/>{p.comments}</button><button className="share"><Send size={17}/></button></div>
        </article>)}
      </section>
      <aside><div className="sidecard"><div className="sidetitle"><h3>Em alta nesta semana</h3><button>Ver todos</button></div>{books.slice(0,3).map((b,i)=><div className="trend" key={b.title}><span className="rank">0{i+1}</span><Cover book={b} small/><div><strong>{b.title}</strong><p>{b.author}</p><small><Star size={12} fill="currentColor"/> 4.{8-i} · {12-i*3} mil leituras</small></div></div>)}</div><div className="quote"><p>“Um leitor vive mil vidas antes de morrer.”</p><small>— George R. R. Martin</small></div></aside>
    </div>}

    {tab === "Descobrir" && <section className="discover page"><p className="eyebrow">EXPLORE NOVAS HISTÓRIAS</p><h1>Encontre sua próxima leitura</h1><div className="bigsearch"><Search/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Busque por título ou autor..."/></div><div className="chips">{["Todos","Ficção","Romance","Clássicos","Fantasia","Biografias"].map((c,i)=><button className={i===0?"selected":""} key={c}>{c}</button>)}</div><div className="bookgrid">{filtered.map(b=><div className="bookcard" key={b.title}><Cover book={b}/><h3>{b.title}</h3><p>{b.author}</p><button onClick={()=>notify(`${b.title} adicionado à biblioteca`)}><Plus size={16}/> Biblioteca</button></div>)}</div></section>}

    {tab === "Biblioteca" && <section className="page library"><p className="eyebrow">SUA ESTANTE</p><h1>Minha biblioteca</h1><div className="stats"><div><b>12</b><span>Quero ler</span></div><div><b>3</b><span>Lendo</span></div><div><b>47</b><span>Lidos</span></div></div><div className="chips">{["Todos","Quero ler","Lendo","Lidos"].map((c,i)=><button className={i===0?"selected":""} key={c}>{c}</button>)}</div><div className="shelf">{books.map(b=><div className="shelfbook" key={b.title}><Cover book={b}/><div><span className="status">{b.status}</span><h3>{b.title}</h3><p>{b.author}</p>{b.progress>0&&<><div className="bar"><i style={{width:`${b.progress}%`}}/></div><small>{b.progress}% concluído</small></>}</div></div>)}</div></section>}

    {tab === "Perfil" && <section className="profile page"><div className="profilecover"/><div className="profileintro"><span className="bigavatar">AM</span><button>Editar perfil</button><h1>Ana Martins</h1><p className="handle">@anamartins</p><p>Leitora de ficção brasileira, café sem açúcar e histórias que continuam depois da última página.</p><div className="followers"><b>328</b> seguindo <b>1.204</b> seguidores</div></div><div className="profiletabs">{["Postagens","Biblioteca","Favoritos"].map(t=><button className={profileTab===t?"active":""} onClick={()=>setProfileTab(t)} key={t}>{t}</button>)}</div>{profileTab==="Postagens"?<div className="profileposts">{posts.slice(0,2).map(p=><article key={p.user}><small>Você registrou uma leitura · {p.time}</small><p>{p.text}</p><strong>{p.book.title}</strong></article>)}</div>:<div className="bookgrid compact">{books.slice(0,4).map(b=><div className="bookcard" key={b.title}><Cover book={b}/><h3>{b.title}</h3><p>{b.status}</p></div>)}</div>}</section>}

    {composer && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setComposer(false)}}><div className="modal"><div className="modalhead"><div><p>NOVA PUBLICAÇÃO</p><h2>Registre sua leitura</h2></div><button className="icon" onClick={()=>setComposer(false)}><X/></button></div><label>Livro</label><div className="selectedbook"><Cover book={books[0]} small/><div><b>{books[0].title}</b><span>{books[0].author}</span></div><button>Trocar</button></div><label>Status de leitura</label><div className="segmented">{["Quero ler","Lendo","Lido"].map(s=><button className={status===s?"selected":""} onClick={()=>setStatus(s)} key={s}>{s}</button>)}</div>{status==="Lendo"&&<><div className="mode"><label>Seu progresso</label><select value={progressMode} onChange={e=>setProgressMode(e.target.value)}><option>Porcentagem</option><option>Página</option></select></div><input className="range" type="range" min="0" max="100" value={progress} onChange={e=>setProgress(+e.target.value)}/><div className="progressvalue"><b>{progressMode==="Porcentagem"?`${progress}%`:`Página ${Math.round(progress*2.64)}`}</b><span>{progress}% concluído</span></div></>}<label>O que está achando?</label><textarea value={postText} onChange={e=>setPostText(e.target.value)} placeholder="Uma frase, uma impressão, uma descoberta..."/><div className="modalfoot"><span>{postText.length}/500</span><button onClick={()=>{setComposer(false);notify("Sua leitura foi publicada!")}}><Send size={17}/> Publicar leitura</button></div></div></div>}
    {toast&&<div className="toast">{toast}</div>}
    <nav className="mobileNav">{[{n:"Início",i:Home},{n:"Descobrir",i:Search},{n:"Biblioteca",i:Library},{n:"Perfil",i:User}].map(({n,i:Icon})=><button className={tab===n?"active":""} onClick={()=>setTab(n)} key={n}><Icon/><span>{n}</span></button>)}</nav>
  </main>;
}
