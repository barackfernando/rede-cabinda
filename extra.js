/* extras.js — Rede Cabinda Pro: aba Aprender + segurança. Carregar DEPOIS do script principal. */

/* ========== 1. ABA 🎓 APRENDER ========== */
(function(){
const $=id=>document.getElementById(id);
const L={
"👋 Básico":[["mbote","olá"],["matondo","obrigado"],["Nzambi","Deus"],["zola","amar"],["nzola","amor"],["kyese","alegria"],["mpasi","dor"],["nzala","fome"],["vita","guerra"],["mfiba","beijo"]],
"👨‍👩‍👧 Família e gente":[["ngudi","mãe"],["mama","mãe"],["tata","pai"],["mpangi","irmão, irmã"],["nsanga","irmã"],["mwana","criança, filho"],["n'kundi","amigo"],["muntu","pessoa, homem"],["yakala","homem"],["mfumu","chefe"],["nzenza","estrangeiro"]],
"🌿 Natureza":[["maza","água"],["tiya","fogo"],["mvula","chuva"],["ngonde","lua"],["ntetembwa","estrela"],["n'ti","árvore"],["mfinda","floresta"],["lukaya","folha"],["luvuma","flor"],["senge","areia"],["nsi","chão, terra"]],
"🐾 Animais":[["nsusu","galinha"],["mbumba","gato"],["nkombo","cabra"],["ngombe","boi"],["nzau","elefante"],["ngo","leopardo"],["nkewa","macaco"],["nyoka","cobra"],["nkosi","leão"],["ngandu","crocodilo"]],
"🧍 Corpo e alma":[["nwa","boca"],["dinu","dente"],["lubini","língua"],["nsuki","cabelo"],["nima","costas"],["nitu","corpo"],["moyo","alma"],["mwanda","espírito"],["dilu","choro"]],
"🔢 Números e tempo":[["kole","dois"],["tanu","cinco"],["kumi","dez"],["lumbu","dia"]],
"🏃 Verbos":[["dya","comer"],["nwa","beber"],["leka","dormir"],["lundumuka","correr"],["dyata","andar"],["vova","falar"],["vana","dar"],["dila","chorar"],["yimbila","cantar"],["sumba","comprar"],["longoka","aprender"],["zaya","saber"],["longa","ensinar"],["zibula","abrir"],["kanga","fechar"],["kota","entrar"],["vingila","esperar"],["sadisa","ajudar"],["sukula","lavar"],["soneka","escrever"],["telama","levantar(-se)"]],
"🏡 Casa e dia a dia":[["nzo","casa"],["mbanza","cidade"],["vata","aldeia"],["nzila","caminho"],["mfulu","cama"],["kunda","cadeira"],["lekwa","cesto"],["tiba","banana"],["lukasa","feijão"],["nzimbu","dinheiro"],["sikola","escola"],["n'kanda","livro"],["n'kinzi","festa"],["n'siku","lei"],["n'lungu","canoa, barco"],["lwazi","machado"],["nsengo","enxada"],["nzanza","flecha"],["tadi","ferro"]],
"🎨 Qualidades":[["m'bi","feio"]]
};
const MINHAS="⭐ Minhas palavras";
try{const vistos=new Set(BASE.map(w=>w[1].toLowerCase()));Object.values(L).forEach(l=>l.forEach(([k,sg])=>{if(!vistos.has(k.toLowerCase())){vistos.add(k.toLowerCase());BASE.push(['Kikongo',k,sg]);}}));}catch(e){}
const ler=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}};
const gravar=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let atual=null;

const aba=document.createElement('div');
aba.className='tab';aba.textContent='🎓 Aprender';
aba.onclick=function(){trocarTab('aprender',this);proxima();};
const tabs=$('tabsApp');tabs.insertBefore(aba,tabs.lastElementChild);

const p=document.createElement('div');p.id='aprender';p.className='painel';
p.innerHTML=`<div class="barra-topo">🎓 Aprender Kikongo</div><div class="dic">
<select id="apTema"></select>
<div class="dia"><small id="apProg"></small><b id="apPal">-</b><span id="apSig" style="visibility:hidden"></span></div>
<button class="btn alt" id="apVer">👁️ Ver significado</button>
<button class="btn" id="apSei">✅ Já sei</button>
<button class="btn danger" id="apNao">🔁 Ainda não</button>
<h3 class="sec">📥 Importar do dicionário</h3>
<textarea id="apTxt" rows="6" placeholder="Cola aqui o texto de uma página do dicionário, ou escreve:&#10;palavra = significado" style="width:100%;padding:12px;background:var(--card);color:var(--text);border:2px solid transparent;border-radius:12px;font-size:16px"></textarea>
<button class="btn alt" id="apAdd">Ler e guardar palavras</button>
<p class="aviso">Aceita linhas do dicionário (ex.: Água S. maza, n'langu) ou "kikongo = português". Revê a grafia antes de partilhar. Só importa o que tens autorização para usar.</p></div>`;
document.querySelector('.container').appendChild(p);

$('apTema').innerHTML=Object.keys(L).concat(MINHAS).map(t=>`<option>${t}</option>`).join('');
$('apTema').onchange=proxima;

function lista(){const t=$('apTema').value;return t===MINHAS?ler('apMinhas'):L[t];}
function proxima(){
  const lst=lista(),sab=ler('apSabidas'),pend=lst.filter(w=>!sab.includes(w[0]+'|'+w[1]));
  $('apProg').textContent=(lst.length-pend.length)+' de '+lst.length+' aprendidas';
  $('apSig').style.visibility='hidden';
  if(!pend.length){atual=null;$('apPal').textContent=lst.length?'🎉 Tema completo!':'Sem palavras aqui ainda';$('apSig').textContent='';return;}
  atual=pend[Math.floor(Math.random()*pend.length)];
  $('apPal').textContent=atual[0];$('apSig').textContent=atual[1];
}
$('apVer').onclick=()=>{$('apSig').style.visibility='visible';};
$('apNao').onclick=proxima;
$('apSei').onclick=()=>{
  if(!atual)return;
  const s=ler('apSabidas');s.push(atual[0]+'|'+atual[1]);gravar('apSabidas',s);
  if(navigator.vibrate)navigator.vibrate(60);proxima();
};

function lerTexto(txt){
  const out=[];
  txt.split('\n').forEach(l=>{
    l=l.trim();if(!l)return;
    if(l.includes('=')){const a=l.split('=');if(a[0].trim()&&a[1].trim())out.push([a[0].trim().slice(0,40),a.slice(1).join('=').trim().slice(0,80)]);return;}
    const m=l.match(/^([A-Za-zÀ-ÿ\-]+)\s+(?:[SsVv]\.?|Adj\.?|Adv\.?|Interj\.?|Arij\.?|Atij\.?)\s*(.+)$/);
    if(!m)return;
    const k=m[2].split(/[;:(]/)[0].replace(/\.$/,'').split(',').map(s=>s.trim()).filter(Boolean).slice(0,3).join(', ');
    if(k)out.push([k.slice(0,40),m[1]]);
  });
  return out;
}

$('apAdd').onclick=()=>{
  const novas=lerTexto($('apTxt').value).slice(0,500);
  if(!novas.length)return alert('Não encontrei palavras. Usa linhas do dicionário ou "kikongo = português".');
  if(!confirm('Encontrei '+novas.length+' palavras. Guardar?'))return;
  gravar('apMinhas',ler('apMinhas').concat(novas));
  if(typeof db!=='undefined'&&db&&confirm('Partilhar estas palavras com toda a Rede?')){
    const u={};
    novas.forEach(w=>{u[db.ref('dicionario').push().key]={lingua:'Kikongo',palavra:w[0],sig:w[1],por:nome};});
    db.ref('dicionario').update(u).then(()=>alert('Partilhado com a Rede! ✅')).catch(()=>alert('Não foi possível partilhar. Verifica as regras do Firebase.'));
  }
  $('apTxt').value='';$('apTema').value=MINHAS;proxima();
};
})();

/* ========== 2. SEGURANÇA (servidor da IA, limites, denúncias, painel Admin) ========== */
(function(){
const WORKER='https://rede-cabinda-ia.barackfernando22.workers.dev';
const $=id=>document.getElementById(id);
const TS=()=>firebase.database.ServerValue.TIMESTAMP;

// Esconde o pedido da chave GROQ (agora a chave fica no servidor)
try{localStorage.setItem('apiKey','gsk_servidor');}catch(e){}
['kConta','kLogin','rKey'].forEach(i=>{const e=$(i);if(e){e.value='gsk_servidor';e.style.display='none';}});
document.querySelectorAll('.aviso').forEach(a=>{if(/Chave grátis/.test(a.textContent))a.style.display='none';});

// IA passa pelo servidor
window.chamarGroq=async function(msgs,signal){
  const t=await firebase.auth().currentUser.getIdToken();
  const r=await fetch(WORKER+'/ia',{method:'POST',signal,
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+t},
    body:JSON.stringify({mensagens:msgs.filter(m=>m.role!=='system').slice(-10),nome,curso:cursoAtual,idioma:$('idiomaSelect').value})});
  const d=await r.json().catch(()=>({}));
  if(r.ok)return d;
  const e=new Error(d.erro||('Erro '+r.status));e.status=r.status;throw e;
};

// Enviar mensagem com limite de velocidade
window.enviarSala=function(sala,inputId){
  const el=$(inputId),texto=el.value.trim();
  if(!texto||!db)return;
  const k=db.ref('msgs/'+sala).push().key,u={};
  u['msgs/'+sala+'/'+k]={uid,nome,curso:cursoAtual,texto:texto.slice(0,500),hora:TS()};
  u['limite/'+uid]=TS();
  db.ref().update(u).then(()=>{const t=parseInt(lerLS('statsMsg','0'))+1;gravarLS('statsMsg',t);$('statsMsg').textContent=t;})
   .catch(()=>alert('Mensagem não enviada. Espera 2 segundos entre mensagens, ou a tua conta pode estar suspensa.'));
  el.value='';
};

// Ler mensagens, com botão de denunciar
window.carregarSala=function(sala,cid){
  const ref=db.ref('msgs/'+sala).limitToLast(100);
  ref.on('child_added',s=>{
    const m=s.val();if(!m||!m.texto)return;
    const minha=m.uid?m.uid===uid:m.nome===nome;
    const hora=new Date(m.hora).toLocaleTimeString('pt-AO',{hour:'2-digit',minute:'2-digit'});
    const d=addMsg(cid,m.nome,(minha?'':'<div class="nome">'+esc(m.nome)+'</div>')+esc(m.texto)+'<div class="hora">'+hora+(minha?'':' <span class="den" style="cursor:pointer">⚠️</span>')+'</div>',minha?'mine':'');
    d.dataset.k=s.key;
    const b=d.querySelector('.den');if(b)b.onclick=()=>denunciar(sala,s.key,m);
    if(!minha&&m.hora>inicio){
      if($('somMsg').checked)tocarSom();
      if($('vibrar').checked&&navigator.vibrate)navigator.vibrate(200);
    }
  },()=>addMsg(cid,'Sistema','⚠️ Sem permissão para ler. Confirma o email ou a conta pode estar suspensa.','bot'));
  ref.on('child_removed',s=>{const e=$(cid).querySelector('[data-k="'+s.key+'"]');if(e)e.remove();});
};
function denunciar(sala,key,m){
  if(!confirm('Denunciar esta mensagem?'))return;
  db.ref('denuncias/'+key+'_'+uid).set({sala,key,autor:m.uid||'',nome:m.nome,texto:String(m.texto).slice(0,200),hora:TS()})
    .then(()=>alert('Denúncia enviada. Obrigado!')).catch(()=>alert('Já denunciaste esta mensagem.'));
}

// Ranking com limites
window.responder=function(b,o){
  if(respondido)return;respondido=true;
  if(o===certa){
    b.classList.add('ok');seq++;
    pontos+=10+Math.min(seq-1,5)*2;
    if(navigator.vibrate)navigator.vibrate(60);
    db.ref('ranking/'+uid).set({nome,curso:cursoAtual,pontos,ultimo:TS()}).catch(()=>{});
  }else{
    b.classList.add('no');seq=0;
    [...$('opcoes').children].forEach(x=>{if(x.textContent===certa)x.classList.add('ok');});
  }
  $('meusPontos').textContent=pontos;
  $('seqTxt').textContent='Sequência: '+seq+(seq>=3?' 🔥':'');
  setTimeout(novaPergunta,1300);
};

// Painel do dono
const _abrir=window.abrirApp;
window.abrirApp=async function(...a){
  await _abrir.apply(this,a);
  if(!db||!uid)return;
  db.ref('admins/'+uid).once('value').then(s=>{if(s.val()===true)criarAdmin();}).catch(()=>{});
};
function criarAdmin(){
  if($('admin'))return;
  const aba=document.createElement('div');aba.className='tab';aba.textContent='🛡️ Admin';
  aba.onclick=function(){trocarTab('admin',this);carregarAdmin();};
  const tabs=$('tabsApp');tabs.insertBefore(aba,tabs.lastElementChild);
  const p=document.createElement('div');p.id='admin';p.className='painel';
  p.innerHTML='<div class="barra-topo">🛡️ Segurança (só dono)</div><div class="dic"><button class="btn alt" id="admAtu">🔄 Atualizar</button><h3 class="sec">🚨 Alertas do servidor</h3><div id="admLogs"></div><h3 class="sec">⚠️ Denúncias</h3><div id="admDen"></div><h3 class="sec">⛔ Banidos</h3><div id="admBan"></div></div>';
  document.querySelector('.container').appendChild(p);
  $('admAtu').onclick=carregarAdmin;
}
function botoes(el,lista){
  lista.forEach(([n,f])=>{
    const b=document.createElement('button');b.className='opt';b.textContent=n;
    b.onclick=async()=>{try{await f();}catch(e){alert('Falhou: '+e.message);}carregarAdmin();};
    el.appendChild(b);
  });
}
async function carregarAdmin(){
  const t=await firebase.auth().currentUser.getIdToken();
  fetch(WORKER+'/admin/logs',{headers:{Authorization:'Bearer '+t}}).then(r=>r.json()).then(d=>{
    $('admLogs').innerHTML=(d.logs||[]).map(l=>'<div class="item"><small>'+esc(l.tipo)+'</small> '+new Date(l.t).toLocaleString('pt-AO')+'<br><i>uid '+esc(l.uid)+' · '+esc(l.detalhe)+'</i></div>').join('')||'<p class="aviso">Sem alertas ✅</p>';
  }).catch(()=>{$('admLogs').innerHTML='<p class="aviso">Não consegui ligar ao servidor.</p>';});
  db.ref('denuncias').limitToLast(30).once('value').then(s=>{
    const box=$('admDen');box.innerHTML='';
    s.forEach(c=>{
      const d=c.val(),el=document.createElement('div');el.className='item';
      el.innerHTML='<small>'+esc(d.nome)+'</small> '+esc(d.texto)+'<br>';
      botoes(el,[
        ['🗑️ Apagar mensagem',async()=>{await db.ref('msgs/'+d.sala+'/'+d.key).remove();await db.ref('denuncias/'+c.key).remove();}],
        ['⛔ Banir autor',async()=>{if(!d.autor)throw new Error('mensagem antiga, sem autor');await db.ref('banidos/'+d.autor).set({nome:d.nome,hora:TS()});await db.ref('denuncias/'+c.key).remove();}],
        ['Ignorar',()=>db.ref('denuncias/'+c.key).remove()]
      ]);
      box.appendChild(el);
    });
    if(!box.children.length)box.innerHTML='<p class="aviso">Sem denúncias ✅</p>';
  }).catch(()=>{});
  db.ref('banidos').once('value').then(s=>{
    const box=$('admBan');box.innerHTML='';
    s.forEach(c=>{
      const d=c.val(),el=document.createElement('div');el.className='item';
      el.innerHTML='<small>'+esc((d&&d.nome)||c.key)+'</small><br>';
      botoes(el,[['✅ Desbanir',()=>db.ref('banidos/'+c.key).remove()]]);
      box.appendChild(el);
    });
    if(!box.children.length)box.innerHTML='<p class="aviso">Ninguém banido.</p>';
  }).catch(()=>{});
}
})();

/* ========== 3. CHAT MELHORADO: fotos, emojis, menu (segurar na mensagem), sem Fiote ========== */
(function(){
const $=id=>document.getElementById(id);
const TS=()=>firebase.database.ServerValue.TIMESTAMP;
let admin=false;

// Idioma: sem Fiote
const sel=$('idiomaSelect');
if(sel)[...sel.options].forEach(o=>{if(o.value==='fiote')o.remove();});
try{if(localStorage.getItem('idioma')==='fiote')localStorage.setItem('idioma','kikongo');}catch(e){}

// Dica por baixo da barra das salas
['chat','curso'].forEach(id=>{const b=document.querySelector('#'+id+' .barra-topo');if(b)b.insertAdjacentHTML('afterend','<div style="font-size:11px;color:#8696a0;text-align:center;padding:4px;background:var(--bg)">Segura numa mensagem para ver as opções</div>');});

// Saber se é dono
const _a=window.abrirApp;
window.abrirApp=async function(...a){
  await _a.apply(this,a);
  if(!db||!uid)return;
  db.ref('admins/'+uid).once('value').then(s=>{admin=s.val()===true;}).catch(()=>{});
};

const respostas={},barrasResp={},cache={};
function mostrarResp(rid){
  const o=respostas[rid],b=barrasResp[rid];if(!b)return;
  if(!o){b.style.display='none';b.textContent='';return;}
  b.style.display='flex';
  b.innerHTML='<div style="flex:1;min-width:0;border-left:3px solid var(--dourado);padding-left:8px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><b></b> <span></span></div><button class="icon-btn" style="width:32px;height:32px;font-size:14px">✕</button>';
  b.querySelector('b').textContent='↩️ '+o.n;
  b.querySelector('span').textContent=o.t;
  b.querySelector('button').onclick=()=>{respostas[rid]=null;mostrarResp(rid);};
}
function definirResp(sala,key,m){
  const rid=sala==='Geral'?'texto':'textoCurso';
  respostas[rid]={k:key,n:String(m.nome).slice(0,30),t:((m.img&&m.texto==='📷 Foto')?'📷 Foto':String(m.texto||'📷 Foto')).slice(0,100)};
  mostrarResp(rid);$(rid).focus();
}
function irPara(cid,k){
  const e=$(cid).querySelector('[data-k="'+k+'"]');
  if(!e)return alert('A mensagem original já não está no ecrã (é muito antiga ou foi apagada).');
  e.scrollIntoView({block:'center',behavior:'smooth'});
  const bb=e.querySelector('.bubble');bb.style.outline='2px solid var(--dourado)';setTimeout(()=>{bb.style.outline='';},1400);
}
function seg(el,fn){
  let t;
  const ini=()=>{t=setTimeout(()=>{fn();if(navigator.vibrate)navigator.vibrate(30);},500);};
  const fim=()=>clearTimeout(t);
  el.addEventListener('touchstart',ini,{passive:true});
  ['touchend','touchmove','touchcancel'].forEach(e=>el.addEventListener(e,fim,{passive:true}));
  el.addEventListener('contextmenu',e=>{e.preventDefault();fn();});
}
function ver(src,key){
  const d=document.createElement('div');
  d.style.cssText='position:fixed;inset:0;background:#000e;z-index:99;overflow:auto;display:flex;align-items:center;justify-content:center';
  const im=document.createElement('img');im.src=src;im.style.cssText='max-width:100%;max-height:100vh;margin:auto';
  const x=document.createElement('button');x.textContent='✕';x.className='icon-btn';x.style.cssText='position:fixed;top:12px;right:12px;z-index:100';
  const st=document.createElement('div');st.style.cssText='position:fixed;bottom:14px;left:0;right:0;text-align:center;color:#fff;font-size:13px;z-index:100;pointer-events:none';
  let zoom=false;
  im.onclick=()=>{zoom=!zoom;im.style.maxWidth=zoom?'none':'100%';im.style.maxHeight=zoom?'none':'100vh';d.style.display=zoom?'block':'flex';};
  x.onclick=()=>d.remove();
  d.append(im,x,st);document.body.appendChild(d);
  if(key){
    st.textContent='A carregar a qualidade completa…';
    db.ref('fotos/'+key+'/d').once('value').then(s=>{const v=s.val();if(v&&OKIMG.test(v)){im.src=v;st.textContent='Toca na foto para ampliar';}else st.textContent='';}).catch(()=>{st.textContent='';});
  }else st.textContent='Toca na foto para ampliar';
}
function apagar(sala,key,m){
  const u={};u['msgs/'+sala+'/'+key]=null;if(m.full)u['fotos/'+key]=null;
  return db.ref().update(u);
}
function menu(sala,key,m,minha){
  const velho=$('menuMsg');if(velho)velho.remove();
  const w=document.createElement('div');w.id='menuMsg';
  w.style.cssText='position:fixed;inset:0;background:#0008;z-index:98;display:flex;align-items:flex-end';
  const c=document.createElement('div');
  c.style.cssText='width:100%;max-width:900px;margin:0 auto;background:var(--bg2);border-radius:18px 18px 0 0;padding:14px';
  w.appendChild(c);w.onclick=e=>{if(e.target===w)w.remove();};
  const add=(t,f,cl)=>{
    const b=document.createElement('button');b.className='btn '+(cl||'alt');b.textContent=t;
    b.onclick=async()=>{w.remove();try{await f();}catch(e){alert('Não foi possível: '+e.message);}};
    c.appendChild(b);
  };
  add('↩️ Responder',()=>definirResp(sala,key,m));
  if(m.texto&&navigator.clipboard)add('📋 Copiar texto',()=>navigator.clipboard.writeText(m.texto));
  if(minha)add('🗑️ Apagar a minha mensagem',()=>apagar(sala,key,m),'danger');
  else add('⚠️ Denunciar mensagem',()=>db.ref('denuncias/'+key+'_'+uid).set({sala,key,autor:m.uid||'',nome:m.nome,texto:String(m.texto||'📷').slice(0,200),hora:TS()}).then(()=>alert('Denúncia enviada. Obrigado!')));
  if(admin){
    if(!minha)add('🛡️ Apagar (dono)',()=>apagar(sala,key,m),'danger');
    if(!minha&&m.uid)add('⛔ Banir '+m.nome,async()=>{if(confirm('Banir '+m.nome+'?'))await db.ref('banidos/'+m.uid).set({nome:m.nome,hora:TS()});},'danger');
  }
  add('Cancelar',()=>{});
  document.body.appendChild(w);
}

const OKIMG=/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/;
window.carregarSala=function(sala,cid){
  const ref=db.ref('msgs/'+sala).limitToLast(60);
  ref.on('child_added',s=>{
    const m=s.val();if(!m||(!m.texto&&!m.img))return;
    const minha=m.uid?m.uid===uid:m.nome===nome;
    const hora=new Date(m.hora).toLocaleTimeString('pt-AO',{hour:'2-digit',minute:'2-digit'});
    const img=m.img&&OKIMG.test(m.img)?'<img class="fotoMsg" alt="foto" style="width:100%;max-width:200px;max-height:200px;object-fit:cover;border-radius:10px;display:block;margin:4px 0;cursor:pointer">':'';
    const txt=(m.img&&m.texto==='📷 Foto')?'':esc(m.texto||'');
    let cit='';
    if(m.resp&&typeof m.resp==='object'&&/^[-\w]{1,40}$/.test(String(m.resp.k))){
      cit='<div class="cit" style="border-left:3px solid var(--dourado);background:#0003;border-radius:8px;padding:4px 8px;margin-bottom:4px;font-size:12px;cursor:pointer;overflow:hidden"><img class="qimg" alt="" style="float:right;width:34px;height:34px;object-fit:cover;border-radius:6px;margin-left:6px"><b>'+esc(String(m.resp.n||'').slice(0,30))+'</b><br>'+esc(String(m.resp.t||'').slice(0,100))+'</div>';
    }
    const d=addMsg(cid,m.nome,(minha?'':'<div class="nome">'+esc(m.nome)+'</div>')+cit+img+txt+'<div class="hora">'+hora+'</div>',minha?'mine':'');
    d.dataset.k=s.key;cache[s.key]=m;
    const q=d.querySelector('.cit');
    if(q){q.onclick=()=>irPara(cid,m.resp.k);const qi=d.querySelector('.qimg'),o=cache[m.resp.k];if(qi){if(o&&o.img&&OKIMG.test(o.img))qi.src=o.img;else qi.remove();}}
    const f=d.querySelector('.fotoMsg');if(f){f.src=m.img;f.onclick=()=>ver(m.img,m.full?s.key:null);}
    seg(d.querySelector('.bubble'),()=>menu(sala,s.key,m,minha));
    if(!minha&&m.hora>inicio){
      if($('somMsg').checked)tocarSom();
      if($('vibrar').checked&&navigator.vibrate)navigator.vibrate(200);
    }
  },()=>addMsg(cid,'Sistema','⚠️ Sem permissão para ler. Confirma o email ou a conta pode estar suspensa.','bot'));
  ref.on('child_removed',s=>{const e=$(cid).querySelector('[data-k="'+s.key+'"]');if(e)e.remove();});
};

function enviar(sala,texto,img,full,resp){
  if(!db)return;
  const k=db.ref('msgs/'+sala).push().key,u={},m={uid,nome,curso:cursoAtual,texto:texto.slice(0,500),hora:TS()};
  if(img)m.img=img;
  if(resp)m.resp=resp;
  if(full){m.full=true;u['fotos/'+k]={uid,d:full};}
  u['msgs/'+sala+'/'+k]=m;u['limite/'+uid]=TS();
  db.ref().update(u).then(()=>{const t=parseInt(lerLS('statsMsg','0'))+1;gravarLS('statsMsg',t);$('statsMsg').textContent=t;})
   .catch(()=>alert('Não enviada. Espera 2 segundos entre mensagens, ou a tua conta pode estar suspensa.'));
}
window.enviarSala=function(sala,inputId){
  const el=$(inputId),t=el.value.trim();
  if(!t)return;
  enviar(sala,t,null,null,respostas[inputId]);respostas[inputId]=null;mostrarResp(inputId);el.value='';
};

function reduzir(im,max,q,limite){
  let url='';
  for(let i=0;i<8;i++){
    const r=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');
    c.width=Math.round(im.width*r);c.height=Math.round(im.height*r);
    c.getContext('2d').drawImage(im,0,0,c.width,c.height);
    url=c.toDataURL('image/jpeg',q);
    if(url.length<=limite)return url;
    max*=0.85;q=Math.max(0.45,q-0.06);
  }
  throw new Error('grande');
}
function comprimir(f){
  return new Promise((ok,err)=>{
    const im=new Image(),u=URL.createObjectURL(f);
    im.onload=()=>{URL.revokeObjectURL(u);try{ok({thumb:reduzir(im,560,0.7,90000),full:reduzir(im,1280,0.82,380000)});}catch(e){err(e);}};
    im.onerror=()=>err(new Error('img'));
    im.src=u;
  });
}

const EMOJIS=['😀','😂','😍','🙏','👍','❤️','🔥','🎉','😢','😮','👏','🙌','🇦🇴','🌍','💪','🤝'];
function ferramentas(inputId,salaFn){
  const inp=$(inputId);if(!inp||inp.dataset.f)return;inp.dataset.f='1';
  const area=inp.parentElement,painel=area.parentElement;
  const mk=t=>{const b=document.createElement('button');b.className='icon-btn';b.textContent=t;return b;};
  const foto=mk('📷'),emo=mk('😊');
  const file=document.createElement('input');file.type='file';file.accept='image/*';file.style.display='none';
  const barra=document.createElement('div');
  barra.style.cssText='display:none;flex-wrap:wrap;gap:6px;padding:8px 12px;background:var(--bg2);border-top:2px solid #222';
  EMOJIS.forEach(e=>{const b=document.createElement('button');b.className='icon-btn';b.textContent=e;b.onclick=()=>{inp.value+=e;inp.focus();};barra.appendChild(b);});
  foto.onclick=()=>file.click();
  emo.onclick=()=>{barra.style.display=barra.style.display==='none'?'flex':'none';};
  file.onchange=async()=>{
    const f=file.files[0];file.value='';if(!f)return;
    if(!f.type.startsWith('image/'))return alert('Escolhe uma imagem.');
    try{const r=await comprimir(f);enviar(salaFn(),inp.value.trim()||'📷 Foto',r.thumb,r.full,respostas[inputId]);respostas[inputId]=null;mostrarResp(inputId);inp.value='';}
    catch(e){alert('Não consegui preparar a imagem. Tenta outra mais pequena.');}
  };
  area.insertBefore(foto,inp);area.insertBefore(emo,inp);area.appendChild(file);painel.insertBefore(barra,area);
  const br=document.createElement('div');
  br.style.cssText='display:none;align-items:center;gap:8px;padding:6px 12px;background:var(--bg2);border-top:2px solid #222';
  barrasResp[inputId]=br;painel.insertBefore(br,area);
}
ferramentas('texto',()=>'Geral');
ferramentas('textoCurso',()=>salaCurso);
})();

/* ========== 4. ASSISTENTE FLUTUANTE: botão 🤖 no canto, em todas as abas ========== */
(function(){
const $=id=>document.getElementById(id);
const GUIA='Contexto da app Rede Cabinda Pro (usa só isto para explicar a app): abas Geral e Curso (chat; toca 📷 para foto e 😊 para emojis; segura numa mensagem para Responder, Copiar, Denunciar ou Apagar a tua), IA (perguntas), Dicionário (palavras em Kikongo e outras línguas; podes ensinar palavras), Desafio (quiz de palavras com pontos e ranking), África (cultura), Aprender (cartões por tema), Config (tema, som, idioma). Responde em no máximo 5 frases curtas, passo a passo, sem inventar funções. Se pedirem Kikongo, ensina palavras simples e avisa quando não tiveres certeza.';
const CHIPS=[['❓ Como uso a app?','Como uso a app? Explica as abas.'],['📖 Ensina-me Kikongo','Ensina-me 5 palavras simples em Kikongo.'],['🏆 Como ganho pontos?','Como ganho pontos no Desafio?'],['📷 Como mando fotos?','Como mando fotos e respondo a mensagens?']];
let hist=[],ocupado=false;

const fab=document.createElement('button');
fab.id='fabIA';fab.textContent='🤖';fab.title='Assistente IA';
fab.style.cssText='position:fixed;right:14px;bottom:92px;width:56px;height:56px;border-radius:50%;border:2px solid var(--dourado);background:linear-gradient(135deg,#8b5cf6,#00a8ff);color:#fff;font-size:26px;cursor:pointer;z-index:90;box-shadow:0 4px 14px #0008;display:none';
const painel=document.createElement('div');
painel.id='ajPainel';
painel.style.cssText='position:fixed;left:0;right:0;bottom:0;max-width:900px;margin:0 auto;height:72vh;background:var(--bg);border-radius:18px 18px 0 0;z-index:95;display:none;flex-direction:column;box-shadow:0 -6px 24px #000a;overflow:hidden';
painel.innerHTML='<div class="barra-topo" style="display:flex;justify-content:space-between;align-items:center"><span>🤖 Assistente IA Cabinda</span><button class="icon-btn" id="ajX" style="width:32px;height:32px;font-size:14px">✕</button></div><div class="msgs" id="ajMsgs"></div><div id="ajChips" style="display:flex;gap:6px;overflow-x:auto;padding:8px 12px;background:var(--bg2);border-top:2px solid #222"></div><div class="input-area"><input id="ajTxt" maxlength="650" placeholder="Pergunta como usar a app, ou pede ajuda..."><button class="icon-btn" id="ajEnv">➤</button></div>';
document.body.append(fab,painel);

CHIPS.forEach(([t,q])=>{
  const b=document.createElement('button');b.textContent=t;
  b.style.cssText='white-space:nowrap;padding:8px 12px;border-radius:18px;border:1px solid var(--dourado);background:var(--card);color:var(--text);font-size:13px;cursor:pointer';
  b.onclick=()=>perguntar(q);$('ajChips').appendChild(b);
});

function abrir(){
  painel.style.display='flex';fab.style.display='none';
  if(!$('ajMsgs').children.length)addMsg('ajMsgs','IA','<b>🤖 IA Cabinda:</b><br>Olá '+esc(nome)+'! Posso explicar como usar a app, ajudar nos estudos ou ensinar palavras em Kikongo. Em que posso ajudar?','bot');
  setTimeout(()=>$('ajTxt').focus(),100);
}
function fechar(){painel.style.display='none';fab.style.display='block';}

async function perguntar(q){
  q=(q||$('ajTxt').value).trim();
  if(!q||ocupado)return;
  $('ajTxt').value='';
  addMsg('ajMsgs',nome,esc(q),'mine');
  const c=addMsg('ajMsgs','IA','<span class="loading">Pensando...</span>','bot');
  ocupado=true;
  const ctrl=new AbortController(),t=setTimeout(()=>ctrl.abort(),40000);
  try{
    const msgs=[...hist.slice(-6),{role:'user',content:GUIA+'\n\nPergunta do aluno: '+q.slice(0,650)}];
    const d=await window.chamarGroq(msgs,ctrl.signal);
    const r=(d.choices[0].message.content||'').trim()||'Não consegui responder. Tenta outra vez.';
    hist.push({role:'user',content:q.slice(0,650)},{role:'assistant',content:r.slice(0,1400)});
    c.querySelector('.bubble').innerHTML='<b>🤖 IA Cabinda:</b><br>'+fmt(r);
  }catch(e){
    let m=e.message;
    if(e.name==='AbortError')m='A IA demorou demais. Tenta outra vez.';
    else if(e instanceof TypeError)m='Sem ligação ao servidor. Confirma a internet.';
    c.querySelector('.bubble').innerHTML='⚠️ '+esc(m);
  }finally{clearTimeout(t);ocupado=false;$('ajMsgs').scrollTop=$('ajMsgs').scrollHeight;}
}

fab.onclick=abrir;
$('ajX').onclick=fechar;
$('ajEnv').onclick=()=>perguntar();
$('ajTxt').addEventListener('keydown',e=>{if(e.key==='Enter')perguntar();});

// Mostrar o botão depois do login
const _a=window.abrirApp;
window.abrirApp=async function(...a){
  await _a.apply(this,a);
  if($('headerApp').style.display==='flex'&&painel.style.display==='none')fab.style.display='block';
};
})();

/* ========== 5. APLICATIVO (PWA): só funciona na versão online (https) ========== */
(function(){
  if(location.protocol!=='https:')return;
  const h=document.head;
  const add=(tag,at)=>{const e=document.createElement(tag);Object.entries(at).forEach(([k,v])=>e.setAttribute(k,v));h.appendChild(e);};
  add('link',{rel:'manifest',href:'manifest.json'});
  add('meta',{name:'theme-color',content:'#0a0f1a'});
  add('link',{rel:'apple-touch-icon',href:'icon-192.png'});
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();

/* ========== 6. AVISO "NOVA VERSÃO" + botão Atualizar (só na versão online) ========== */
(function(){
  if(location.protocol!=='https:')return;
  let atual=null;
  async function verificar(){
    try{
      const r=await fetch('versao.json?t='+Date.now(),{cache:'no-store'});
      if(!r.ok)return;
      const d=await r.json();
      if(atual===null){atual=d.v;return;}
      if(d.v!==atual)aviso(d);
    }catch(e){}
  }
  function aviso(d){
    if(document.getElementById('avisoVersao'))return;
    const b=document.createElement('div');b.id='avisoVersao';
    b.style.cssText='position:fixed;top:0;left:0;right:0;z-index:120;background:#ffb800;color:#000;padding:10px 12px;padding-top:calc(10px + env(safe-area-inset-top,0px));display:flex;gap:10px;align-items:center;font-size:14px;box-shadow:0 2px 10px #0008';
    const t=document.createElement('div');t.style.flex='1';
    t.textContent='🔄 Nova versão disponível'+(d.nota?': '+String(d.nota).slice(0,90):'');
    const bt=document.createElement('button');bt.textContent='Atualizar';
    bt.style.cssText='background:#0a0f1a;color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer';
    bt.onclick=async()=>{
      bt.textContent='A atualizar…';
      try{
        if('caches' in window){const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)));}
        if('serviceWorker' in navigator){const rs=await navigator.serviceWorker.getRegistrations();await Promise.all(rs.map(r=>r.unregister()));}
      }catch(e){}
      location.reload();
    };
    b.append(t,bt);document.body.appendChild(b);
  }
  verificar();
  setInterval(verificar,300000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)verificar();});
})();
