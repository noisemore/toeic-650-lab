import * as learning from './learning.js';
import {audioMeta,ACCENTS} from './audio-meta.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {questions,words,engineering} from './data.js';
import {dailyDate,dailyGoal,ensureDailyPlan,dailyProgress,dailyQuestionOrder} from './daily.js';
import {officialSources,levelFor,levelLabels} from './practice-sources.js';
import {sceneSvg} from './scenes.js';
import {lexiconPage,filterLexicon,LEXICON_SOURCES} from './lexicon.js';
const root=new URL('./',import.meta.url),read=f=>fs.readFileSync(new URL(f,root),'utf8');
assert.equal(questions.length,1172);assert.equal(words.length,3000);assert.equal(engineering.length,400);
assert.equal(new Set([...questions,...words,...engineering].map(q=>q.id)).size,4572);
const counts=[30,132,102,102,360,152,294];
for(let p=1;p<=7;p++)assert.equal(questions.filter(q=>q.part===p).length,counts[p-1]);
for(const q of questions){
  assert(q.question&&q.explanation.length>=8&&q.grammar&&q.topic,q.id);
  assert.equal(q.options.length,q.part===2?3:4,q.id);
  assert.equal(new Set(q.options).size,q.options.length,q.id);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,q.id);
  if(q.part<5){assert(q.audio&&q.translation&&q.audioSrc,q.id);assert(fs.statSync(new URL(q.audioSrc,root)).size>1000,q.id)}
  if(q.part===1)assert(sceneSvg(q.scene).includes('<img'),q.id);
  if(q.part===5)assert(q.question.includes('_____'),q.id);
  if(q.part===6)assert(q.passage&&q.group&&q.passage.includes('[4]'),q.id);
  if(q.part===7)assert(q.documents?.every(d=>d.title&&d.text),q.id);
}
const groups=Map.groupBy(questions.filter(q=>q.group),q=>q.group);
for(const [id,items] of groups){assert.equal(items.length,items[0].groupSize||(items[0].part===6?4:items[0].part===7&&id.includes('-X')?5:3),id);assert.equal(new Set(items.map(q=>JSON.stringify([q.audio,q.passage,q.documents]))).size,1,id)}
assert.deepEqual([...new Set(questions.filter(q=>q.part===7).map(q=>q.documents.length))].sort(),[1,2,3]);
// Freeze all original 120 records, not just their IDs, to preserve historical answer meanings.
const oldQuestions=questions.filter(q=>!q.id.includes('-X'));
assert.equal(oldQuestions.length,120);
assert.equal(createHash('sha256').update(JSON.stringify(oldQuestions)).digest('hex'),'634e7a8f152245876c4955c3145c5650b0b1f4a3a0b6e04418b3c7203b291b32');
assert.equal(groups.size,170);
const fingerprints=questions.map(q=>JSON.stringify([q.part,q.question,q.stimulus,q.audio,q.passage,q.documents,q.scene]));
assert.equal(new Set(fingerprints).size,questions.length,'duplicate prompt and stimulus');
assert.equal(new Set(questions.filter(q=>q.part===1).map(q=>q.scene)).size,30);
assert.equal(new Set(questions.filter(q=>q.part<5).map(q=>q.audioSrc)).size,230);
assert.equal(new Set(questions.filter(q=>q.part===5&&q.id.includes('-X')&&q.sourceKind!=='open').map(q=>q.grammar)).size,40);
for(const [id,items] of groups){
  assert.equal(new Set(items.map(q=>q.question)).size,items.length,id+' repeated question');
  if(items[0].part===6)for(let n=1;n<=4;n++)assert.equal(items[0].passage.split('['+n+']').length-1,1,id+' blank '+n);
  if(items[0].part===7&&id.includes('-X'))assert(items[0].translation&&items[0].documents.length>=1&&items[0].documents.length<=3,id);
}
for(const q of questions.filter(q=>q.part<=2))for(let i=0;i<q.options.length;i++)assert(q.audio.includes(String.fromCharCode(65+i)+'. '+q.options[i]),q.id+' audio option order');
// Independent checks for cross-document arithmetic and constraints, beyond answer-index ranges.
const answerAt=(group,offset)=>{const q=groups.get(group)[offset];return q.options[q.answer]};
assert.equal(answerAt('P7-XG15',2),'$220'); // 190 room + 30 projector
assert.equal(answerAt('P7-XG16',1),'$2,380'); // 2000 goods + 20*15 certificates + 80 shipping
assert.equal(answerAt('P7-XG16',2),'$120'); // 2500 budget - 2380
assert.equal(answerAt('P7-XG23',2),'$340'); // (18+2)*16 + 20
assert.equal(answerAt('P7-XG26',1),'$285'); // 180 labor + 45 travel + 60 cable, no seal
assert.equal(answerAt('P7-XG28',0),'Rail');
assert.equal(answerAt('P7-XG28',3),'About 8:50 a.m.'); // 8:40 rail + 10-minute walk, before 9
assert.equal(answerAt('P7-XG29',0),'$570');
assert.equal(answerAt('P7-XG29',1),'$610');
assert.equal(answerAt('P7-XG29',3),'$40');
assert.equal(answerAt('P7-XG33',0),'Twenty-six'); // 24-2+4
assert.equal(answerAt('P7-XG33',1),'Twenty-one'); // 26-5 vegetarian
assert.equal(answerAt('P7-XG33',2),'$415'); // 26*15+25
assert.equal(answerAt('P7-XG33',3),'Yes, with $5 remaining');
assert.equal(answerAt('P7-XG34',2),'$960');
assert.equal(answerAt('P7-XG35',0),'Version 3');
assert.equal(answerAt('P7-XG36',4),'Four');
console.log('PASS: preserved original 120 full records; 904 distinct additions, 30 unique scenes, 230 audio files, 40 new grammar/usage skills, aligned listening option order.');
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
console.log('PASS: 1,172 unique questions, all seven parts, answer ranges, 170 consistent groups, single/double/triple readings, expanded vocabulary and PWA icons.');
// Persisted random daily tasks: local dates, exact counts, no duplicated completion, safe legacy imports.
assert.equal(dailyDate(new Date(2026,0,2,0,1)), '2026-01-02');
assert.equal(words.filter(w=>w.example&&w.exampleZh).length,400);
const seeded=seed=>()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
const taskData={history:[],reviews:{},settings:{dailyGoal:10,dailyWordGoal:5}};
const firstPlan=ensureDailyPlan(taskData,questions,words,'2026-10-19',seeded(123));assert(firstPlan.changed);
assert.equal(new Set(firstPlan.plan.questionOrder).size,1172);assert.equal(new Set(firstPlan.plan.wordOrder).size,400);
assert.notDeepEqual(firstPlan.plan.questionOrder,questions.map(q=>q.id));
const repeatPlan=ensureDailyPlan(taskData,questions,words,'2026-10-19',()=>{throw Error('Must not redraw on same day')});assert(!repeatPlan.changed);assert.equal(repeatPlan.plan,firstPlan.plan);
for(const [id,items] of groups){const positions=items.map(q=>firstPlan.plan.questionOrder.indexOf(q.id));for(let n=1;n<positions.length;n++)assert.equal(positions[n],positions[n-1]+1,id+' daily group order')}
let progress=dailyProgress(taskData,firstPlan.plan);assert.equal(progress.questionIds.length,10);assert.equal(progress.wordIds.length,5);assert.equal(progress.completed,0);
const initialIds=[...progress.questionIds],initialWords=[...progress.wordIds];
taskData.history.push({id:initialIds[0],date:'2026-10-18'},{id:initialIds[1],date:'2026-10-19'},{id:initialIds[1],date:'2026-10-19'});
progress=dailyProgress(taskData,firstPlan.plan);assert.equal(progress.completed,1);assert.equal(progress.remaining.length,9);assert(!progress.remaining.includes(initialIds[1]));
taskData.settings.dailyGoal=15;taskData.settings.dailyWordGoal=8;progress=dailyProgress(taskData,firstPlan.plan);assert.deepEqual(progress.questionIds.slice(0,10),initialIds);assert.deepEqual(progress.wordIds.slice(0,5),initialWords);assert.equal(progress.completed,1);
firstPlan.plan.learnedWordIds=[initialWords[0]];assert.equal(dailyProgress(taskData,firstPlan.plan).wordsCompleted,1);
const restored=JSON.parse(JSON.stringify(taskData));assert(!ensureDailyPlan(restored,questions,words,'2026-10-19').changed);assert.deepEqual(dailyProgress(restored,restored.daily),progress={...dailyProgress(taskData,taskData.daily)});
for(const goal of [1,2,3,9,10,99,100]){taskData.settings.dailyGoal=goal;assert.equal(dailyProgress(taskData,firstPlan.plan).questionIds.length,goal)}
taskData.settings.dailyGoal=0;taskData.settings.dailyWordGoal=21;assert.equal(dailyProgress(taskData,firstPlan.plan).goal,10);assert.equal(dailyProgress(taskData,firstPlan.plan).wordGoal,5);
const nextDay=ensureDailyPlan(taskData,questions,words,'2026-10-20',seeded(987));assert(nextDay.changed);assert.notDeepEqual(nextDay.plan.questionOrder,initialIds);assert.notDeepEqual(nextDay.plan.wordOrder.slice(0,5),initialWords);assert.equal(nextDay.plan.learnedWordIds.length,0);assert.equal(dailyProgress(taskData,nextDay.plan).completed,0);
const corrupt={settings:{},history:[],daily:{date:'2026-10-19',questionOrder:['missing'],wordOrder:['missing']}};assert(ensureDailyPlan(corrupt,questions,words,'2026-10-19').changed);
const invalidLearned={settings:{},history:[],daily:JSON.parse(JSON.stringify(firstPlan.plan))};invalidLearned.daily.learnedWordIds=[initialWords[0],initialWords[0],'missing'];ensureDailyPlan(invalidLearned,questions,words,'2026-10-19');assert.deepEqual(invalidLearned.daily.learnedWordIds,[initialWords[0]]);
console.log('PASS: daily random sampling from all questions and 400 example-rich words, local-day rollover, same-day persistence, exact goals, resize prefixes, resume, unique daily progress, group order and malformed backup repair.');
// Render the real app functions with a small DOM/storage harness (no browser/audio engine).
let html='',speech=[],listeners={},status={textContent:''};
const element={get innerHTML(){return html},set innerHTML(value){html=value}};
const document={getElementById:id=>id==='app'?element:status,addEventListener:(name,f)=>listeners[name]=f,querySelector:()=>null,createElement:()=>({className:'',textContent:'',remove(){}}),body:{append(){}}};
const window={scrollTo(){},addEventListener(){},speechSynthesis:null};
const speechSynthesis={cancel(){},getVoices:()=>[{lang:'en-US'}],speak(u){speech.push(u)}};window.speechSynthesis=speechSynthesis;
const context=vm.createContext({...learning,document,window,navigator:{},speechSynthesis,SpeechSynthesisUtterance:class{constructor(text){this.text=text}},questions,words,engineering,dailyDate,dailyGoal,ensureDailyPlan,dailyProgress,sceneSvg,officialSources,levelFor,levelLabels,audioMeta,ACCENTS,lexiconPage,LEXICON_SOURCES,console,setTimeout:()=>0,clearTimeout(){},Date,Blob,URL,confirm:()=>true});
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
// Large-bank pagination, safe searches, and random queues retain all group members in order.
run("partFilter='all';mode='all';practicePage=0;practiceSearch='';practice()");
assert.equal((html.match(/class="listbtn"/g)||[]).length,30);assert(html.includes('1 / 40'));
const pageOne=html;run('practicePage=1;practice()');assert.notEqual(html,pageOne);assert(html.includes('2 / 40'));
run("practiceSearch='P5-X';practicePage=0;practice()");assert.equal(run('practiceIds().length'),324);assert(html.includes('1 / 11'));
run("practiceSearch='被動語態';practice()");assert(run('practiceIds().length')>=7);
run("practiceSearch='no-such-question-zz';practice()");assert(html.includes('目前沒有符合條件'));
run("practiceSearch='';practicePage=999;practice()");assert.equal(run('practicePage'),39);assert.equal((html.match(/class="listbtn"/g)||[]).length,2);
run("practicePage=0;const shuffled=shuffledPracticeIds()");
const shuffled=run('shuffled');assert.equal(shuffled.length,1172);assert.equal(new Set(shuffled).size,1172);
for(const [id,items] of groups){const positions=items.map(q=>shuffled.indexOf(q.id));for(let n=1;n<positions.length;n++)assert.equal(positions[n],positions[n-1]+1,id+' shuffled adjacency')}
console.log('PASS: 30-question pagination, final page, ID/Chinese searches, empty results, grouped random queue with no omissions or duplicates.');
// Old v1 history and bookmarks remain valid; wrong answers clear only after a correct retry.
run("data=defaultData();data.history=[{id:'P5-001',correct:false,date:'2026-10-18'}];data.bookmarks=['P5-001'];partFilter='5';mode='wrong'");
assert.equal(run('practiceIds().join()'),'P5-001');
run("data.history.push({id:'P5-001',correct:true,date:'2026-10-19'});stats()");assert.equal(run('practiceIds().length'),0);
run("mode='saved'");assert.equal(run('practiceIds().join()'),'P5-001');assert(html.includes('各 Part 進度'));
run('index=0;playListening()');assert(speech[0].text.includes('A.'));speech[0].onend();assert.equal(speech.length,2);run('stopAudio()');speech[1].onend();assert.equal(speech.length,2);
run("data=defaultData();home()");assert(!html.includes('尚未開發'));assert(html.includes('daily-goals-form'));assert(html.includes('data-action="daily-start"'));assert.equal((html.match(/data-daily-word-id=/g)||[]).length,5);assert(html.includes('例句｜Example'));
run("mode='wrong';partFilter='5';practiceSearch='nonexistent';const todayPlan=currentDaily();quizQueue=currentDailyProgress().remaining;dailyQuizDate=today();index=questions.findIndex(q=>q.id===quizQueue[0]);selected=null;reveal=false;quiz()");assert(html.includes('← 今日任務'));assert.equal(run('quizQueue.length'),10);run("dailyQuizDate=null;mode='all';partFilter='all';practiceSearch=''");
run("lexicon('words')");assert.equal((html.match(/data-word-id=/g)||[]).length,30);assert(!html.includes('undefined'));
run("lexStates.engineering.search='MFC';lexicon('engineering')");assert(html.includes('mass flow controller'));
run("lexStates.engineering.search='zzzz-no-result';lexicon('engineering')");assert(html.includes('沒有符合的詞彙'));
run("data.reviews={'W-1':{at:'2026-10-18'}};lexStates.words.status='studied';lexicon('words')");assert(html.includes('maintenance'));assert.equal((html.match(/data-word-id=/g)||[]).length,1);
console.log('PASS: all 1,172 quiz screens, hidden listening answers, correct-answer feedback, part filtering, v1 history/bookmarks compatibility, audio stop cancellation.');
// Exercise actual daily buttons, saves, quiz submissions and completion routing.
let persistedDailyData;
context.testDB={transaction(){return {objectStore(){return {put(value){persistedDailyData=JSON.parse(JSON.stringify(value));const request={};queueMicrotask(()=>request.onsuccess?.());return request}}}}}};
run("db=testDB;data=defaultData();data.settings.dailyGoal=2;data.settings.dailyWordGoal=1;page='home';home()");
const dailyInitial=JSON.parse(run('JSON.stringify(currentDailyProgress().questionIds)'));
await run('startDaily()');assert.equal(run('dailyQuizDate'),run('today()'));assert.equal(run('page'),'quiz');assert.equal(run('quizQueue.length'),2);assert.equal(run('questions[index].id'),dailyInitial[0]);
await run('selected=questions[index].answer;submit()');assert.equal(run('currentDailyProgress().completed'),1);assert.equal(persistedDailyData.history.length,1);
await listeners.click({target:{closest:()=>({dataset:{nav:'home'}})}});
await run('startDaily()');assert.equal(run('quizQueue.length'),1);assert.equal(run('questions[index].id'),dailyInitial[1]);
await run('selected=questions[index].answer;submit()');await listeners.click({target:{closest:()=>({dataset:{action:'next'}})}});assert.equal(run('page'),'home');assert.equal(run('currentDailyProgress().completed'),2);assert(html.includes('再練今日題目'));
await run('startDaily()');assert.equal(run('quizQueue.length'),2);await run('selected=questions[index].answer;submit()');assert.equal(run('currentDailyProgress().completed'),2,'repeat does not inflate progress');
run("page='home';home()");const featured=run('currentDailyProgress().wordIds[0]');
await listeners.click({target:{closest:()=>({dataset:{dailyWord:featured}})}});assert.equal(run('currentDailyProgress().wordsCompleted'),1);assert(persistedDailyData.reviews[featured]);
context.savedDaily=JSON.parse(JSON.stringify(persistedDailyData));run('data=savedDaily;home()');assert.equal(run('currentDailyProgress().wordsCompleted'),1);assert(html.includes('✓ 今日已學'));
const oldOrder=run('JSON.stringify(data.daily.questionOrder)');const oldGet=document.getElementById;
document.getElementById=id=>id==='daily-goal'?{value:'4'}:id==='daily-word-goal'?{value:'3'}:oldGet(id);
await listeners.submit({target:{id:'daily-goals-form'},preventDefault(){}});assert.equal(run('currentDailyProgress().goal'),4);assert.equal(run('currentDailyProgress().wordGoal'),3);assert.equal(run('JSON.stringify(data.daily.questionOrder)'),oldOrder);assert.equal(persistedDailyData.settings.dailyGoal,4);
document.getElementById=id=>id==='daily-goal'?{value:'0'}:id==='daily-word-goal'?{value:'30'}:oldGet(id);
await listeners.submit({target:{id:'daily-goals-form'},preventDefault(){}});assert.equal(run('data.settings.dailyGoal'),4);assert.equal(run('data.settings.dailyWordGoal'),3);document.getElementById=oldGet;
run("dailyQuizDate='2000-01-01';page='quiz'");await listeners.click({target:{closest:()=>({dataset:{action:'next'}})}});assert.equal(run('page'),'home');assert.equal(run('dailyQuizDate'),null);
console.log('PASS: real daily start/resume/replay buttons, quiz-save persistence, completion returns home, learned-word persistence, goal form validation and midnight-session exit.');
// Exercise the actual service worker offline, with a previous-version cache and an unrelated app cache.
const base='https://noisemore.github.io/toeic-650-lab/',normalize=x=>new URL(typeof x==='string'?x:x.url,base).href;
const stores=new Map([['toeic-650-lab-v1.0.1',new Map()],['unrelated-app',new Map()]]),events={};let offline=false;
const caches={async keys(){return [...stores.keys()]},async delete(k){return stores.delete(k)},async open(name){if(!stores.has(name))stores.set(name,new Map());const entries=stores.get(name);return {async addAll(paths){for(const path of paths){assert.equal(path.cache,'reload');const relative=new URL(path.url).pathname.slice(new URL(base).pathname.length);const f=relative||'index.html';assert(fs.existsSync(new URL(f,root)),f);entries.set(normalize(path),{ok:true,body:f})}},async match(req){return entries.get(normalize(req))}}}};
vm.runInNewContext(read('sw.js'),{caches,URL,Request:class{constructor(url,options){this.url=String(url);this.cache=options.cache}},location:{origin:'https://noisemore.github.io'},fetch:async()=>{if(offline)throw Error('offline');return {ok:true}},self:{registration:{scope:base},clients:{claim(){}},skipWaiting(){},addEventListener(n,f){events[n]=f}}});
let pending;events.install({waitUntil(p){pending=p}});await pending;events.activate({waitUntil(p){pending=p}});await pending;
assert(!stores.has('toeic-650-lab-v1.0.1'));assert(stores.has('unrelated-app'));offline=true;
for(const url of stores.get('toeic-650-lab-v5.0.1').keys()){let result;events.fetch({request:{url,method:'GET'},respondWith(p){result=p}});assert(await result,url)}
let fallback;events.fetch({request:{url:base+'?source=home',method:'GET',mode:'navigate'},respondWith(p){fallback=p}});assert.equal((await fallback).body,'index.html');
let intercepted=false;events.fetch({request:{url:'https://noisemore.github.io/another-app/',method:'GET'},respondWith(){intercepted=true}});assert(!intercepted);
console.log('PASS: 286 fresh-network precached resources offline, navigation fallback, scoped requests, prior-version cache cleanup and unrelated cache preservation.');
console.log('NOT COVERED: Android install/flight mode and audible speech output require a real device; live browser smoke test is separate.');

const clips=JSON.parse(read("audio-metadata.json")).clips;assert.equal(Object.keys(clips).length,230);
for(const q of questions.filter(q=>q.part<5)){const c=clips[q.audioSrc];assert(c&&c.duration>3,q.id);assert.equal(c.transcriptSha256,createHash("sha256").update(q.audio).digest("hex"),q.id);assert.deepEqual(c.accents,audioMeta[q.audioSrc].accents);if(q.part===3)assert.equal(c.speakers.length,2,q.id)}
for(const country of ["US","GB","CA","AU"])assert(Object.values(clips).filter(c=>c.accents.includes(country)).length>=50);
for(const q of questions.filter(q=>q.part===1)){const src=sceneSvg(q.scene).match(/src="\.\/(.*?)"/)[1];assert(fs.statSync(new URL(src,root)).size>10000);assert(stores.get("toeic-650-lab-v5.0.1").has(base+src))}
assert.equal(stores.get("toeic-650-lab-v5.0.1").size,286);
console.log("PASS: four regional accents, fixed dialogue voices, exact script hashes, all 30 photo assets cached and 286 resources.");

// Reading-only navigation, new-bank entry and back navigation use the real event handlers.
run("data=defaultData();practiceSection='all';page='home';home()");
assert(html.includes('閱讀測驗｜Reading'));assert(html.includes('806 題'));
await listeners.click({target:{closest:()=>({dataset:{action:'reading'}})}});
assert.equal(run('practiceSection'),'reading');assert.equal(run('practiceIds().length'),806);
assert(html.includes('閱讀測驗題庫'));assert(!html.includes('data-part="1"'));
await listeners.click({target:{closest:()=>({dataset:{readingPart:'7'}})}});
assert.equal(run('practiceIds().length'),294);
await listeners.click({target:{closest:()=>({dataset:{action:'reading-new'}})}});
assert.equal(run('practiceIds().length'),100);assert(run('practiceIds().every(id=>id.includes("-XR"))'));
const readingQueue=run('shuffledPracticeIds()');assert.equal(readingQueue.length,100);
run("startAt('P7-XR041')");assert.equal((html.match(/class="document"/g)||[]).length,3);assert(!html.includes('listening-audio'));
await listeners.click({target:{closest:()=>({dataset:{nav:'practice'}})}});
assert.equal(run('practiceSection'),'reading');assert.equal(run('practiceIds().length'),100);
run("startAt('P5-XR001');selected=(questions[index].answer+1)%4");await run('submit()');
run("practiceSearch='';mode='wrong';practice()");assert(run('practiceIds().includes("P5-XR001")'));
run("startAt('P5-XR001');selected=questions[index].answer");await run('submit()');
run("mode='wrong';practice()");assert(!run('practiceIds().includes("P5-XR001")'));
await listeners.click({target:{closest:()=>({dataset:{section:'listening'}})}});
run("mode='all';practiceSearch='';practice()");assert.equal(run('practiceIds().length'),366);
await listeners.click({target:{closest:()=>({dataset:{action:'all-practice'}})}});assert.equal(run('practiceIds().length'),1172);

// Same-day bank expansion preserves today's order, word choices and learned markers.
const previousBank=questions.filter(q=>!q.id.includes('-XR')&&!q.id.includes('-XO')),migrating={settings:{dailyGoal:10,dailyWordGoal:5},history:[]};
const prior=ensureDailyPlan(migrating,previousBank,words,'2026-10-19',()=>.4).plan;
prior.learnedWordIds=[prior.wordOrder[0]];const before=structuredClone(prior);
assert(ensureDailyPlan(migrating,questions,words,'2026-10-19',()=>.6).changed);
assert.deepEqual(migrating.daily.questionOrder.slice(0,1024),before.questionOrder);
assert.deepEqual(migrating.daily.wordOrder,before.wordOrder);assert.deepEqual(migrating.daily.learnedWordIds,before.learnedWordIds);
assert.equal(new Set(migrating.daily.questionOrder).size,1172);

// Independently calculated answers for the new cross-document tasks.
assert.equal(answerAt('P7-XR05',0),'About 10:35 a.m.');
assert.equal(answerAt('P7-XR06',0),'Twenty-one');assert.equal(answerAt('P7-XR06',1),'$0');
assert.equal(answerAt('P7-XR07',1),'9:45 a.m.');
assert.equal(answerAt('P7-XR08',1),'$220');assert.equal(answerAt('P7-XR08',2),'$30');assert.equal(answerAt('P7-XR08',4),'$130');
assert.equal(answerAt('P7-XR09',2),'$230');
assert.equal(answerAt('P7-XR10',0),'The 8:30 a.m. shuttle');assert.equal(answerAt('P7-XR10',1),'9:00 a.m.');
assert.equal(answerAt('P7-XR11',0),'Eighteen');assert.equal(answerAt('P7-XR11',1),'$438');assert.equal(answerAt('P7-XR11',2),'$12');
assert.equal(answerAt('P7-XR12',1),'$1,920');
assert.equal(questions.filter(q=>q.id.includes('-XR')).length,100);
console.log('PASS: reading-only 806 questions, 100-new-question entry, 3-document rendering, wrong-answer retry, section navigation, same-day 1024→1172 migration and independent arithmetic checks.');

assert.equal(previousBank.length,1024);assert.equal(createHash("sha256").update(JSON.stringify(previousBank)).digest("hex"),"29747f2ac05762558b429e83307c9c3b5fa157d7566baa8e81d0dbcb7cb0a421");
console.log("PASS: all previous 1024 question records are unchanged.");

const imported=questions.filter(q=>q.sourceKind==='open');assert.equal(imported.length,48);assert.equal(imported.filter(q=>q.part===5).length,24);
for(const q of imported){assert.equal(q.sourceLicense,'MIT');assert.equal(q.sourceCommit,'a940bb8b479ef4d06af468015d757041c3d2e457');if(q.part===7){assert(q.documents.some(d=>d.text.includes(q.evidence)),q.id);assert.equal(q.choiceNotes.length,4);assert.equal(q.groupSize,4)}}
await listeners.click({target:{closest:()=>({dataset:{action:'advanced'}})}});assert.equal(run('practiceIds().length'),48);
await listeners.click({target:{closest:()=>({dataset:{action:'sources'}})}});assert(html.includes('官方樣題'));assert.equal(officialSources.length,4);
await listeners.click({target:{closest:()=>({dataset:{action:'images'}})}});assert.equal((html.match(/<img /g)||[]).length,30);
console.log('PASS: 48 MIT-attributed public simulations, answer evidence, advanced selector, source links and 30-image gallery.');

// v5 learning routes use real event handlers, saves and active-time clock.
run("db=testDB;data=defaultData();page='home';home()");assert(html.includes('學習教練'));assert.equal(run('data.settings.studyMode'),'smart');
const smartOrder=run('JSON.stringify(currentDaily().questionOrder)');const baseOrder=run('JSON.stringify(data.daily.questionOrder)');
await listeners.change({target:{id:'study-mode',value:'random'}});assert.equal(run('JSON.stringify(currentDaily().questionOrder)'),baseOrder);
await listeners.change({target:{id:'study-mode',value:'smart'}});assert.equal(run('JSON.stringify(currentDaily().questionOrder)'),smartOrder);
run("startAt('P5-XR001');selected=questions[index].answer");await listeners.click({target:{closest:()=>({dataset:{confidence:'guess'}})}});await run('submit()');assert.equal(persistedDailyData.history[0].confidence,'guess');assert(html.includes('這題標記為不確定'));assert(html.includes('考點短教學'));assert.equal(run('learningReport(data,questions,today()).firstCorrect'),0);
await listeners.click({target:{closest:()=>({dataset:{action:'transfer'}})}});assert.notEqual(run('questions[index].id'),'P5-XR001');assert.equal(run('skillFor(questions[index])'),learning.skillFor(questions.find(q=>q.id==='P5-XR001')));
await listeners.click({target:{closest:()=>({dataset:{action:'report'}})}});assert(html.includes('首次答對'));assert(html.includes('樣本不足'));assert(!html.includes('undefined'));
await listeners.click({target:{closest:()=>({dataset:{action:'flash-start'}})}});assert.equal(run('page'),'flash');const flashWord=run('flashItems().find(w=>w.id===flashQueue[0])');assert(!html.includes(flashWord.zh));
await listeners.click({target:{closest:()=>({dataset:{action:'flash-reveal'}})}});assert(html.includes(flashWord.zh));
await listeners.click({target:{closest:()=>({dataset:{wordRating:'no'}})}});assert.equal(persistedDailyData.wordMemory[flashWord.id].streak,0);assert.equal(persistedDailyData.wordMemory[flashWord.id].due,learning.addDays(run('today()'),1));assert.equal(run('flashIndex'),1);
run("data=defaultData();data.history=[{id:'P5-XR001',choice:0,correct:false,date:'2000-01-01'}];startDue()");assert.equal(run('questions[index].id'),'P5-XR001');assert(run('coachSession'));await run('selected=questions[index].answer;submit()');await listeners.click({target:{closest:()=>({dataset:{action:'next'}})}});assert.equal(run('page'),'session');assert(html.includes('本次練習完成'));
const originalDate=context.Date;let clockNow=1000;context.Date=class extends Date{static now(){return clockNow}};
run("startAt('P5-XR002')");clockNow=2100;run('pauseStudyClock()');assert.equal(run('studyElapsed'),1100);clockNow=9000;run('resumeStudyClock()');clockNow=9500;run('pauseStudyClock()');assert.equal(run('studyElapsed'),1600);context.Date=originalDate;
console.log('PASS: smart/random modes preserve separate plans, guessed answer scheduling, same-skill transfer, honest report samples, recall-before-reveal, persistent word ratings, due-session completion and active-time clock excludes paused time.');

// Teaching regression: the shown rule and filled example must match the answered question.
run("db=testDB;data=defaultData();startAt('P5-X141');selected=questions[index].answer");await run('submit()');assert(html.includes('data-lesson="relativePerson"'));assert(html.includes('Employees who complete'));assert(html.includes('本題怎麼用'));assert(html.includes('補充例句（非本題原文）'));assert(!html.includes('their 修飾名詞'));
run("startAt('P5-X189');selected=questions[index].answer");await run('submit()');assert(html.includes('受詞補語'));assert(!html.includes('主詞感受使用 -ed'));
run("startAt('P5-XR004');selected=questions[index].answer");await run('submit()');assert(html.includes('data-lesson="futurePerfect"'));assert(html.includes('will have completed'));
run("startAt('P6-002');selected=questions[index].answer");await run('submit()');assert(html.includes('data-lesson="modal"'));await listeners.click({target:{closest:()=>({dataset:{action:'transfer'}})}});assert.equal(run('quizQueue.length'),1);assert.equal(run('questions[index].part'),6);assert.equal(run('skillFor(questions[index])'),'modal');
run("startSkill('parallel')");assert(run("quizQueue.every(id=>skillFor(questionById.get(id))==='parallel')"));
await import('./teaching-check.mjs');
console.log('PASS: actual UI shows relative-pronoun teaching, question-specific examples, corrected informative explanation and future perfect; Part 6 transfer opens the matched blank only; skill sessions contain no unrelated group members.');
