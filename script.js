


const D=[['Ядро грамматики',[['Морфология','🧩','#4f46e5'],['Синтаксис','🔗','#0ea5e9']]],
['Внутреннее устройство слов и звуков',[['Фонетика','🔊','#7c3aed'],['Орфоэпия','🎤','#db2777'],['Графика','✏️','#0891b2'],['Морфемика','🧱','#ea580c'],['Словообразование','🌱','#16a34a']]],
['Значение слов и выражений',[['Лексикология','📖','#2563eb'],['Фразеология','💬','#c026d3'],['Семантика','🔍','#0d9488']]],
['Правила письма и оформления',[['Орфография','🔤','#4338ca'],['Пунктуация','❗','#dc2626']]],
['Речь, стили и история языка',[['Стилистика','🎨','#9333ea'],['Культура речи','🗣️','#0284c7'],['Текстоведение','🧭','#059669'],['История языка и диалектология','📜','#b45309']]]];
const TERMS=[['Глагол','часть речи: действие или состояние'],['Начальная форма','форма на вопрос «что делать?» или «что сделать?»'],['Вид','показывает, процесс это или результат'],['Спряжение','изменение глагола по лицам и числам (I и II)'],['Наклонение','способ выражения действия: факт, желание, просьба'],['Возвратный глагол','глагол с постфиксом -ся / -сь'],['Переходный глагол','действие переходит на предмет: читать (что?) книгу'],['Окончание','изменяемая часть слова в конце']];
const SN=[['Маленький','прилагательное','adj','Отвечает на вопрос «какой?», называет признак предмета и согласуется с существительным «мальчик».'],['мальчик','существительное','n','Отвечает на вопрос «кто?», называет предмет, изменяется по падежам.'],['быстро','наречие','adv','Отвечает на вопрос «как?», обозначает признак действия, не изменяется.'],['побежал','глагол','v','Отвечает на вопрос «что сделал?», обозначает действие; прошедшее время, совершенный вид.'],['домой','наречие','adv','Отвечает на вопрос «куда?», не изменяется, относится к глаголу.']];
const L=window.LESSONS;
D.forEach(c=>c[1].forEach(d=>{const a=Object.keys(L).filter(k=>L[k].disc==d[0]).map(k=>[k,L[k].t]);if(a.length)d[3]=a}));
let S={};try{S=JSON.parse(localStorage.getItem('rg')||'{}')}catch(e){}
S.done=S.done||{};S.sc=S.sc||{};S.ex=S.ex||{};S.mis=S.mis||{};
const save=()=>{S.last=new Date().toLocaleDateString('ru-RU');try{localStorage.setItem('rg',JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),M=$('#m'),ids=Object.keys(L);
const exN=id=>Object.keys(S.ex).filter(k=>k.startsWith(id+':e:')).length;
const pct=id=>Math.round(Math.min(exN(id),10)*4+(S.sc[id]!=null?30:0)+(S.done[id]?30:0));
const total=()=>Math.round(ids.reduce((a,i)=>a+pct(i),0)/ids.length);
const dtab=['Теория','Наглядно','Примеры','Упражнения','Тест','Итог'];
function toast(t){const d=document.createElement('div');d.textContent=t;d.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:12px;z-index:9';document.body.append(d);setTimeout(()=>d.remove(),2600)}
function nav(){$('#nav').innerHTML=D.map(c=>`<h4>${c[0]}</h4>`+c[1].map(d=>`<button data-d="${d[0]}"><span>${d[1]}</span>${d[0]}</button>`+(d[3]||[]).map(l=>`<button class="sub" data-l="${l[0]}">${l[1]}${S.done[l[0]]?' ✔':''}</button>`).join('')).join('')).join('')+'<h4>Справочники</h4><button data-x="dict">📚 Словарь терминов</button><button data-x="rev">🔁 Повторить ошибки ('+Object.keys(S.mis).length+')</button>'}
function sent(el){el.innerHTML=SN.map((w,i)=>`<button class="w ${w[2]}" data-i="${i}">${w[0]}</button>`).join('')+'<div class="wc">Нажмите на слово, чтобы увидеть его разбор.</div>';el.onclick=e=>{const b=e.target.closest('.w');if(!b)return;const w=SN[b.dataset.i];el.querySelector('.wc').innerHTML=`<b>${w[0]}</b> — ${w[1]}. ${w[3]}`}}
function quiz(el,items,test,onEnd){
el.innerHTML=items.map((q,i)=>`<div class="q" data-i="${i}"><b>${i+1}.</b> ${q[0]}${q[1].map((o,j)=>`<button class="opt" data-j="${j}">${o}</button>`).join('')}<div class="fb"></div></div>`).join('')+(test?'<p><button class="main" id="chk">Проверить тест</button></p><div id="res"></div>':'');
const rev=(qe,j)=>{const q=items[qe.dataset.i],ok=j==q[2],k=q.k,f=qe.querySelector('.fb');
qe.querySelectorAll('.opt').forEach((b,x)=>{b.disabled=true;b.classList.toggle('ok',x==q[2]);if(x==j&&!ok)b.classList.add('bad')});
f.innerHTML=(ok?'✔ Верно. ':'✘ Неверно. Правильный ответ: <b>'+q[1][q[2]]+'</b>. ')+q[3];f.className='fb show '+(ok?'g':'r');
if(ok){delete S.mis[k];if(k.includes(':e:'))S.ex[k]=1}else S.mis[k]=1;save();return ok};
el.onclick=e=>{const b=e.target.closest('.opt');if(b){const qe=b.closest('.q');if(test){qe.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel')}else{rev(qe,b.dataset.j);nav();if(onEnd)onEnd()}}
if(e.target.id=='chk'){let n=0;el.querySelectorAll('.q').forEach(qe=>{const s=qe.querySelector('.sel');if(rev(qe,s?s.dataset.j:-1))n++});const p=Math.round(n/items.length*100);
el.querySelector('#chk').remove();el.querySelector('#res').innerHTML=`<div class="card"><h3>Результат: ${n} из ${items.length} (${p}%)</h3><div class="bar"><i style="width:0" id="rb"></i></div><p>Верно: ${n}. Неверно: ${items.length-n}.</p><button class="main" id="again">Пройти тест заново</button></div>`;
setTimeout(()=>{$('#rb').style.width=p+'%'},50);if(onEnd)onEnd(p);nav()}
if(e.target.id=='again')quiz(el,items,test,onEnd)}}
const tag=(id,kind,a)=>a.map((q,i)=>{const r=q.slice();r.k=id+':'+kind+':'+i;return r});
function home(){const pr=total(),cont=ids.find(i=>!S.done[i]);
M.innerHTML=`<div class="hero"><h1>Изучай русский язык легко</h1><p>Объяснения простыми словами, разборы, упражнения и тесты. Нажмите на слово, чтобы увидеть, какая это часть речи:</p><div id="hs"></div><p style="margin-top:16px"><button class="main" id="go">Начать обучение</button></p></div>
<div class="card"><b>Общий прогресс: ${pr}%</b><div class="bar" style="margin:8px 0"><i style="width:${pr}%"></i></div><small>Готово уроков: ${ids.length} (остальные добавим по тому же образцу). Последнее занятие: ${S.last||'ещё не было'}. Выполнено упражнений: ${Object.keys(S.ex).length}.</small>${cont?`<p><button class="main" data-l="${cont}">Продолжить: ${L[cont].t}</button></p>`:''}</div>`+D.map(c=>`<h3>${c[0]}</h3><div class="grid">${c[1].map(d=>`<button class="dc" style="--c:${d[2]}" data-d="${d[0]}"><span>${d[1]}</span><b>${d[0]}</b><br><small>${d[3]?'Уроков: '+d[3].length:'Скоро'}</small></button>`).join('')}</div>`).join('');sent($('#hs'));$('#go').onclick=()=>open('verb',0)}
function open(id,t){const l=L[id];M.innerHTML=`<div class="crumb"><button data-x="home">Главная</button> / ${l.disc} / ${l.t}</div><div class="bar" style="margin:8px 0"><i style="width:${pct(id)}%"></i></div><div class="tabs">${dtab.map((n,i)=>`<button data-t="${i}" class="${i==t?'on':''}">${n}</button>`).join('')}</div><div class="card" id="c"></div>`;
const c=$('#c');M.onclick=e=>{const b=e.target.closest('[data-t]');if(b&&b.closest('.tabs'))open(id,+b.dataset.t)};
if(t==0)c.innerHTML=l.th;
if(t==1){c.innerHTML='<h2>Наглядно: части речи в предложении</h2><div id="s"></div><h3>Три времени глагола</h3><p><button class="w v">читал</button> → <button class="w v">читаю</button> → <button class="w v">буду читать</button></p><p>Прошедшее, настоящее, будущее: смысл один, меняется время.</p>';sent($('#s'))}
if(t==2)c.innerHTML='<h2>Примеры с разбором</h2>'+l.ex.map((x,i)=>`<div class="ex card"><b>${i+1}. ${x[0]}</b><span>${x[1]}</span><span><b>Ответ:</b> ${x[2]}</span></div>`).join('');
if(t==3){c.innerHTML='<h2>Упражнения</h2><p>Ответ проверяется сразу.</p><div id="z"></div>';quiz($('#z'),tag(id,'e',l.exr),false,()=>{$('.bar i').style.width=pct(id)+'%'})}
if(t==4){c.innerHTML='<h2>Тест по теме</h2><div id="z"></div>';quiz($('#z'),tag(id,'t',l.te),true,p=>{if(p!=null){S.sc[id]=p;save()}})}
if(t==5){c.innerHTML=l.sum+`<p><button class="main" id="dn">${S.done[id]?'Тема изучена ✔':'Тема изучена'}</button> <button class="ib" data-x="home">К списку тем</button> ${ids[ids.indexOf(id)+1]?`<button class="main" data-l="${ids[ids.indexOf(id)+1]}">Следующая тема</button>`:''}</p>`;$('#dn').onclick=()=>{S.done[id]=1;save();nav();toast('Тема «'+l.t+'» отмечена как изученная');open(id,5)}}
if(t<5)c.insertAdjacentHTML('beforeend',`<p><button class="main" data-t="${t+1}">Дальше: ${dtab[t+1]}</button></p>`);
M.scrollIntoView();save();nav()}
function dict(){M.innerHTML='<div class="card"><h2>Словарь терминов</h2>'+TERMS.map(t=>`<p><b>${t[0]}</b> — ${t[1]}.</p>`).join('')+'</div>'}
function review(){const it=Object.keys(S.mis).map(k=>{const [id,kd,i]=k.split(':'),q=(kd=='e'?L[id].exr:L[id].te)[i].slice();q.k=k;return q});
M.innerHTML='<div class="card"><h2>Повторение ошибок</h2>'+(it.length?'<div id="z"></div>':'<p>Ошибок пока нет. Пройдите упражнения и тест, и здесь появятся задания, в которых вы ошиблись.</p>')+'</div>';if(it.length)quiz($('#z'),it,false)}
function dis(n){const d=D.flatMap(c=>c[1]).find(x=>x[0]==n);if(d[3])open(d[3][0][0],0);else toast('Дисциплина «'+n+'» пока без уроков: это следующий этап.')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-l],[data-d],[data-x]');if(!b)return;$('#nav').classList.remove('open');
if(b.dataset.l)open(b.dataset.l,0);else if(b.dataset.d)dis(b.dataset.d);else if(b.dataset.x=='home')home();else if(b.dataset.x=='dict')dict();else if(b.dataset.x=='rev')review()});
$('#logo').onclick=home;$('#bur').onclick=()=>$('#nav').classList.toggle('open');
$('#th').onclick=()=>{const d=document.documentElement,n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;S.theme=n;save()};
$('#q').oninput=e=>{const v=e.target.value.trim().toLowerCase(),r=$('#sr');if(!v){r.innerHTML='';return}
const hit=[];D.forEach(c=>c[1].forEach(d=>{if(d[0].toLowerCase().includes(v))hit.push(`<button data-d="${d[0]}">${d[1]} ${d[0]}</button>`);(d[3]||[]).forEach(l=>{if(l[1].toLowerCase().includes(v)||L[l[0]].th.toLowerCase().includes(v))hit.push(`<button data-l="${l[0]}">Урок: ${l[1]}</button>`)})}));
TERMS.forEach(t=>{if(t[0].toLowerCase().includes(v))hit.push('<button data-x="dict">Словарь: '+t[0]+'</button>')});r.innerHTML=hit.slice(0,8).join('')||'<button>Ничего не найдено</button>'};
document.addEventListener('click',e=>{if(!e.target.closest('#sb'))$('#sr').innerHTML=''});
document.documentElement.dataset.theme=S.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
nav();home();