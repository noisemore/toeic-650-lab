import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {questions,words,engineering} from './data.js';
import {sceneSvg} from './scenes.js';
import {lexiconPage,filterLexicon,LEXICON_SOURCES} from './lexicon.js';
const root=new URL('./',import.meta.url),read=f=>fs.readFileSync(new URL(f,root),'utf8');
assert.equal(questions.length,120);assert.equal(words.length,3000);assert.equal(engineering.length,400);
assert.equal(new Set([...questions,...words,...engineering].map(q=>q.id)).size,3520);
const counts=[6,12,12,12,36,12,30];
for(let p=1;p<=7;p++)assert.equal(questions.filter(q=>q.part===p).length,counts[p-1]);
for(const q of questions){
  assert(q.question&&q.explanation.length>=8&&q.grammar&&q.topic,q.id);
  assert.equal(q.options.length,q.part===2?3:4,q.id);
  assert.equal(new Set(q.options).size,q.options.length,q.id);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,q.id);
  if(q.part<5){assert(q.audio&&q.translation&&q.audioSrc,q.id);assert(fs.statSync(new URL(q.audioSrc,root)).size>1000,q.id)}
  if(q.part===1)assert(sceneSvg(q.scene).includes('<svg'),q.id);
  if(q.part===5)assert(q.question.includes('_____'),q.id);
  if(q.part===6)assert(q.passage&&q.group&&q.passage.includes('[4]'),q.id);
  if(q.part===7)assert(q.documents?.every(d=>d.title&&d.text),q.id);
}
const groups=Map.groupBy(questions.filter(q=>q.group),q=>q.group);
for(const [id,items] of groups){assert.equal(items.length,items[0].part===6?4:3,id);assert.equal(new Set(items.map(q=>JSON.stringify([q.audio,q.passage,q.documents]))).size,1,id)}
assert.deepEqual([...new Set(questions.filter(q=>q.part===7).map(q=>q.documents.length))].sort(),[1,2,3]);
for(const list of [words,engineering]){assert.equal(new Set(list.map(x=>x.term.normalize('NFKC').toLowerCase())).size,list.length);for(const x of list){assert(x.term&&/[\u3400-\u9fff]/.test(x.zh)&&x.topic&&x.tier,x.id);assert.equal(!!x.example,!!x.exampleZh,x.id);assert.equal(!!x.collocation,!!x.collocationZh,x.id)}}
assert.equal(words.filter(x=>x.tier==='職場重點').length,400);assert.equal(words.filter(x=>x.collocation&&x.collocationZh).length,400);for(const x of engineering)assert(x.example&&x.exampleZh,x.id);
const engineeringGroups=Map.groupBy(engineering,x=>x.topic);assert.equal(engineeringGroups.size,16);for(const group of engineeringGroups.values())assert.equal(group.length,25);
const oldWords=['maintenance','inspection','schedule','supplier','invoice','shipment','warranty','procedure','equipment','confirm','request','deadline','available','efficient','replacement','annual','submit','department','purchase','notify'];
const oldEngineering=['chamber','vacuum pump','pressure rise','outgassing','leak rate','seal','gasket','gearbox','torque','troubleshoot','root cause','downtime','preventive maintenance','work order','lockout/tagout','personal protective equipment','escalate','field service engineer','service manual','calibration'];
for(let i=0;i<20;i++){assert.equal(words.find(x=>x.id==='W-'+(i+1)).term,oldWords[i]);assert.equal(engineering.find(x=>x.id==='E-'+(i+1)).term,oldEngineering[i])}
const allState={search:'',topic:'all',tier:'all',status:'all',pageNo:0};assert.equal(lexiconPage(words,allState).items.length,30);assert.equal(lexiconPage(words,{...allState,pageNo:999}).pageNo,99);
assert.equal(lexiconPage(words,{...allState,search:'zzzz-no-result'}).total,0);
assert(filterLexicon(words,{...allState,search:'invoice 發票'}).some(x=>x.term==='invoice'));
assert(filterLexicon(engineering,{...allState,search:'MFC'}).some(x=>x.term==='mass flow controller'));
assert(filterLexicon(engineering,{...allState,search:'壓升'}).some(x=>x.term==='pressure rise'));
assert.equal(filterLexicon(words,{...allState,tier:'職場重點'}).length,400);
assert.equal(filterLexicon(engineering,{...allState,topic:'洩漏與放氣'}).length,25);
assert.equal(filterLexicon(words,{...allState,status:'studied'},{'W-1':{at:'2026-10-18'}})[0].term,'maintenance');
assert(!filterLexicon(words,{...allState,status:'pending'},{'W-1':{at:'2026-10-18'}}).some(x=>x.id==='W-1'));
assert(LEXICON_SOURCES.every(([name,url])=>name&&url.startsWith('https://')));
console.log('PASS: 3,000 unique words, 400 original collocations, 400 engineering examples, 16 topics, preserved 40 legacy review IDs, bilingual/acronym searches and pagination.');
const manifest=JSON.parse(read('manifest.webmanifest'));assert.equal(manifest.scope,'./');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons){const bytes=fs.readFileSync(new URL(icon.src,root));const size=Number(icon.sizes.split('x')[0]);assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size)}
console.log('PASS: 120 unique questions, all seven parts, answer ranges, 21 consistent groups, single/double/triple readings, expanded vocabulary and PWA icons.');
// Render the real app functions with a small DOM/storage harness (no browser/audio engine).
let html='',speech=[],listeners={},status={textContent:''};
const element={get innerHTML(){return html},set innerHTML(value){html=value}};
const document={getElementById:id=>id==='app'?element:status,addEventListener:(name,f)=>listeners[name]=f,querySelector:()=>null,createElement:()=>({className:'',textContent:'',remove(){}}),body:{append(){}}};
const window={scrollTo(){},addEventListener(){},speechSynthesis:null};
const speechSynthesis={cancel(){},getVoices:()=>[{lang:'en-US'}],speak(u){speech.push(u)}};window.speechSynthesis=speechSynthesis;
const context=vm.createContext({document,window,navigator:{},speechSynthesis,SpeechSynthesisUtterance:class{constructor(text){this.text=text}},questions,words,engineering,sceneSvg,lexiconPage,LEXICON_SOURCES,console,setTimeout:()=>0,clearTimeout(){},Date,Blob,URL,confirm:()=>true});
const app=read('app.js').replace(/^import .*;\n/gm,'').replace(/\ninit\(\);\s*$/,'');vm.runInContext(app,context);
const run=s=>vm.runInContext(s,context);
for(let i=0;i<questions.length;i++){
  run(`index=${i};selected=null;reveal=false;quizQueue=[questions[index].id];quiz()`);
  const q=questions[i];assert(html.includes(q.id),q.id);
  if(q.part<=2)assert(!html.includes(q.options[q.answer]),q.id+' listening answer hidden');
  if(q.part<5)assert(html.includes('data-action="listen"'));
  run('selected=questions[index].answer;reveal=true;quiz()');assert(html.includes('✓ 答對了！'),q.id);
  assert(!html.includes('undefined'),q.id+' undefined UI');
}
for(let p=1;p<=7;p++){run(`partFilter='${p}';mode='all';practice()`);assert.equal(run('practiceIds().length'),counts[p-1])}
// Old v1 history and bookmarks remain valid; wrong answers clear only after a correct retry.
run("data=defaultData();data.history=[{id:'P5-001',correct:false,date:'2026-10-18'}];data.bookmarks=['P5-001'];partFilter='5';mode='wrong'");
assert.equal(run('practiceIds().join()'),'P5-001');
run("data.history.push({id:'P5-001',correct:true,date:'2026-10-19'});stats()");assert.equal(run('practiceIds().length'),0);
run("mode='saved'");assert.equal(run('practiceIds().join()'),'P5-001');assert(html.includes('各 Part 進度'));
run('index=0;playListening()');assert(speech[0].text.includes('A.'));speech[0].onend();assert.equal(speech.length,2);run('stopAudio()');speech[1].onend();assert.equal(speech.length,2);
run('home()');assert(!html.includes('尚未開發'));
run("lexicon('words')");assert.equal((html.match(/data-word-id=/g)||[]).length,30);assert(!html.includes('undefined'));
run("lexStates.engineering.search='MFC';lexicon('engineering')");assert(html.includes('mass flow controller'));
run("lexStates.engineering.search='zzzz-no-result';lexicon('engineering')");assert(html.includes('沒有符合的詞彙'));
run("data.reviews={'W-1':{at:'2026-10-18'}};lexStates.words.status='studied';lexicon('words')");assert(html.includes('maintenance'));assert.equal((html.match(/data-word-id=/g)||[]).length,1);
console.log('PASS: all 120 quiz screens, hidden listening answers, correct-answer feedback, part filtering, v1 history/bookmarks compatibility, audio stop cancellation.');
// Exercise the actual service worker offline, with a previous-version cache and an unrelated app cache.
const base='https://noisemore.github.io/toeic-650-lab/',normalize=x=>new URL(typeof x==='string'?x:x.url,base).href;
const stores=new Map([['toeic-650-lab-v1.0.1',new Map()],['unrelated-app',new Map()]]),events={};let offline=false;
const caches={async keys(){return [...stores.keys()]},async delete(k){return stores.delete(k)},async open(name){if(!stores.has(name))stores.set(name,new Map());const entries=stores.get(name);return {async addAll(paths){for(const path of paths){assert.equal(path.cache,'reload');const relative=new URL(path.url).pathname.slice(new URL(base).pathname.length);const f=relative||'index.html';assert(fs.existsSync(new URL(f,root)),f);entries.set(normalize(path),{ok:true,body:f})}},async match(req){return entries.get(normalize(req))}}}};
vm.runInNewContext(read('sw.js'),{caches,URL,Request:class{constructor(url,options){this.url=String(url);this.cache=options.cache}},location:{origin:'https://noisemore.github.io'},fetch:async()=>{if(offline)throw Error('offline');return {ok:true}},self:{registration:{scope:base},clients:{claim(){}},skipWaiting(){},addEventListener(n,f){events[n]=f}}});
let pending;events.install({waitUntil(p){pending=p}});await pending;events.activate({waitUntil(p){pending=p}});await pending;
assert(!stores.has('toeic-650-lab-v1.0.1'));assert(stores.has('unrelated-app'));offline=true;
for(const url of stores.get('toeic-650-lab-v3.0.0').keys()){let result;events.fetch({request:{url,method:'GET'},respondWith(p){result=p}});assert(await result,url)}
let fallback;events.fetch({request:{url:base+'?source=home',method:'GET',mode:'navigate'},respondWith(p){fallback=p}});assert.equal((await fallback).body,'index.html');
let intercepted=false;events.fetch({request:{url:'https://noisemore.github.io/another-app/',method:'GET'},respondWith(){intercepted=true}});assert(!intercepted);
console.log('PASS: 39 fresh-network precached resources offline, navigation fallback, scoped requests, prior-version cache cleanup and unrelated cache preservation.');
console.log('NOT COVERED: Android install/flight mode and audible speech output require a real device; live browser smoke test is separate.');
