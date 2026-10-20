import assert from 'node:assert/strict';
import {questions} from './data.js';
import {LESSONS,skillFor,addDays,questionSchedule,learningReport,buildStudyOrder,ensureStudyPlan,transferQuestions,rateWord,wordDue} from './learning.js';
for(const q of questions){const l=LESSONS[skillFor(q)];assert(l?.rule&&l.example&&l.zh&&l.trap&&l.steps,q.id)}
assert.equal(addDays('2026-12-31',1),'2027-01-01');assert.equal(addDays('2028-02-28',1),'2028-02-29');
const q=questions.find(q=>q.part===5),other=questions.find(x=>x.id!==q.id&&skillFor(x)===skillFor(q));
const h=(date,correct,confidence='sure')=>({id:q.id,date,correct,confidence});
let hist=[h('2026-10-20',false),h('2026-10-20',true)];let sched=questionSchedule(hist,questions,'2026-10-20').get(q.id);assert.equal(sched.streak,0);assert.equal(sched.due,'2026-10-21');assert(!sched.dueNow);
assert(questionSchedule(hist,questions,'2026-10-21').get(q.id).dueNow);
hist.push(h('2026-10-21',true));sched=questionSchedule(hist,questions,'2026-10-21').get(q.id);assert.equal(sched.streak,1);assert.equal(sched.interval,1);
hist.push(h('2026-10-22',true),h('2026-10-22',true));assert.equal(questionSchedule(hist,questions,'2026-10-22').get(q.id).interval,3);
hist.push(h('2026-10-25',true));assert.equal(questionSchedule(hist,questions,'2026-10-25').get(q.id).interval,7);
hist.push(h('2026-11-01',true,'guess'));assert.equal(questionSchedule(hist,questions,'2026-11-01').get(q.id).streak,0);
assert.equal(questionSchedule([...hist,h('bad',true),h('2026-02-30',false),h('2099-01-01',false)],questions,'2026-11-01').get(q.id).due,'2026-11-02');
const data={history:hist,bookmarks:[q.id],reviews:{},settings:{dailyGoal:10}};const prior=JSON.stringify(data);const report=learningReport(data,questions,'2026-11-01');assert.equal(report.firstTotal,1);assert.equal(report.firstCorrect,0);assert.equal(report.skills[0].label,'樣本不足');assert.equal(JSON.stringify(data),prior);
const qs=questions.filter(x=>skillFor(x)===skillFor(q)).slice(0,4);const weakData={history:qs.slice(0,3).map(x=>({id:x.id,date:'2026-10-19',correct:false})),settings:{}};
const order=buildStudyOrder(weakData,questions,'2026-10-20',()=>.37);assert.equal(order.order.length,1172);assert.equal(new Set(order.order).size,1172);assert.equal(order.reasons[qs[3].id],'weak');assert.equal(order.reasons[qs[0].id],'review');
for(const id of new Set(questions.map(q=>q.group).filter(Boolean))){const ids=questions.filter(q=>q.group===id).map(q=>q.id);const start=order.order.indexOf(ids[0]);assert.deepEqual(order.order.slice(start,start+ids.length),ids,id)}
assert(ensureStudyPlan(weakData,questions,'2026-10-20').changed);const frozen=JSON.stringify(weakData.studyPlan);weakData.history.push({id:qs[3].id,date:'2026-10-20',correct:true});assert(!ensureStudyPlan(weakData,questions,'2026-10-20').changed);assert.equal(JSON.stringify(weakData.studyPlan),frozen);assert(ensureStudyPlan(weakData,questions,'2026-10-21').changed);
const beforeLegacy=JSON.stringify({history:data.history,bookmarks:data.bookmarks,reviews:data.reviews});ensureStudyPlan(data,questions,'2026-11-01');assert.equal(JSON.stringify({history:data.history,bookmarks:data.bookmarks,reviews:data.reviews}),beforeLegacy);
const transfers=transferQuestions({history:[{id:other.id}]},questions,q);assert(transfers.every(id=>id!==q.id&&skillFor(questions.find(x=>x.id===id))===skillFor(q)));if(transfers.length>1)assert.notEqual(transfers[0],other.id);
const memory={};assert.equal(rateWord(memory,'word',true,'2026-10-20').due,'2026-10-21');assert.equal(rateWord(memory,'word',true,'2026-10-20').streak,1);assert.equal(rateWord(memory,'word',true,'2026-10-21').due,'2026-10-24');assert.equal(rateWord(memory,'word',false,'2026-10-21').streak,0);assert.equal(rateWord(memory,'word',true,'2026-10-21').due,'2026-10-22');assert.equal(wordDue(memory,[{id:'word'}],'2026-10-22').length,1);
console.log(`PASS: ${Object.keys(LESSONS).length} bilingual lessons, all 1172 skill mappings, distinct-day scheduling, same-day lapse protection, guess handling, year/leap rollovers, invalid dates, first-attempt reports, adaptive priorities, complete grouped plans, stable-day plans, legacy preservation, transfer questions and word recall schedules.`);
