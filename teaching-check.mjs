import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {questions} from './data.js';
import {TEACHING} from './teaching-map.js';
import {LESSONS,skillFor,teachingFor,teachingExplanation,transferQuestions,learningReport} from './learning.js';
// Frozen source data: this repair changes teaching only, without rewriting question meanings/history IDs.
assert.equal(createHash('sha256').update(JSON.stringify(questions)).digest('hex'),'7c2019b371e6dc89729ec60a6b1e7a9765e98a4a47a27f0f317e24363c6ba9d0');
assert.equal(Object.keys(TEACHING).length,1172);
for(const q of questions){const focus=teachingFor(q);assert(focus,q.id);assert.notEqual(focus.lesson,'questionSpecific',q.id);assert(LESSONS[focus.lesson]?.rule&&LESSONS[focus.lesson]?.example,q.id);assert(teachingExplanation(q),q.id)}
// Independently reviewed regression fixtures: examples of the actual rules each question requires.
const expected={
 'P2-004':'responseRequest','P2-006':'responseFrequency','P2-007':'responseRequest','P2-008':'responseNegative','P2-009':'responseChoice','P2-010':'responseMethod','P2-011':'responseNegative','P2-012':'responseChoice',
 'P5-003':'timePrep','P5-005':'recipientPrep','P5-012':'sinceMarker','P5-013':'untilClause','P5-016':'agreementNear','P5-018':'placePrep','P5-021':'possessive','P5-023':'imperative','P5-025':'perfectMarkers','P5-032':'nounModifier',
 'P5-X141':'relativePerson','P5-X148':'relativeThing','P5-X155':'possessive','P5-X162':'reflexive','P5-X169':'quantifiers','P5-X176':'other','P5-X183':'feelingParticiple','P5-X189':'adjective','P5-X268':'linkContrast','P5-X270':'linkOtherwise','P5-X274':'pairedConnector',
 'P5-XR004':'futurePerfect','P5-XR006':'purposeClause','P5-XR009':'comparativeAdverb','P5-XR011':'subjunctive','P5-XR012':'contrastPhrase','P5-XR013':'none','P5-XR014':'untilClause','P5-XR015':'sinceMarker','P5-XR019':'participlePassive',
 'P5-XO001':'participleActive','P5-XO002':'participlePassive','P5-XO010':'subjunctive','P5-XO015':'participlePriorPassive','P5-XO018':'parallel','P5-XO019':'parallel','P5-XO022':'parallel','P5-XO024':'parallel',
 'P6-001':'timePrep','P6-002':'modal','P6-003':'insertion','P6-006':'nounModifier','P6-008':'adverb','P6-010':'passive','P6-012':'noun',
 'P6-X001':'agreement','P6-X003':'causeClause','P6-X004':'insertion','P6-X013':'comparative','P6-X021':'adjective','P6-X022':'deadline','P6-X035':'linkOtherwise','P6-X041':'passive','P6-X054':'participleActive','P6-X059':'adverb','P6-X069':'lexicalMeaning','P6-X110':'linkContrast','P6-X114':'purposeClause','P6-X117':'bareInfinitive',
 'P6-XR001':'periodPrep','P6-XR004':'noun','P6-XR005':'comparative','P6-XR008':'concessionClause','P6-XR009':'future','P6-XR010':'gerund','P6-XR012':'infinitive','P6-XR014':'adverb','P6-XR018':'linkContrast',
 'P7-001':'readPurpose','P7-004':'calculation','P7-011':'readReference','P7-X004':'readWord','P7-X040':'readWord','P7-X041':'readPurpose','P7-X053':'readNegative',
 'P3-X004':'listenSequence','P3-X015':'listenSequence','P4-X048':'listenSequence','P4-X062':'listenSequence'
};
const byId=new Map(questions.map(q=>[q.id,q]));for(const [id,key] of Object.entries(expected))assert.equal(skillFor(byId.get(id)),key,id);
assert.match(teachingExplanation(byId.get('P5-X189')),/受詞補語/);assert.notEqual(teachingExplanation(byId.get('P5-X189')),byId.get('P5-X189').explanation);
assert.match(LESSONS.relativePerson.rule,/who/);assert.match(LESSONS.possessive.rule,/their/);assert.match(LESSONS.parallel.rule,/相同語法功能/);assert.match(LESSONS.futurePerfect.rule,/will have/);
for(const q of questions){for(const id of transferQuestions({history:[]},questions,q)){const other=byId.get(id);assert.equal(other.part,q.part);assert.equal(teachingFor(other).transfer,teachingFor(q).transfer);assert.notEqual(id,q.id);if(q.group)assert.notEqual(other.group,q.group)}}
const possessive=transferQuestions({history:[]},questions,byId.get('P5-021'));assert(possessive.length);assert(possessive.every(id=>skillFor(byId.get(id))==='possessive'));assert(!possessive.includes('P5-X141'));
assert.equal(teachingFor({...questions[0],id:'unreviewed-id'}),null);assert.equal(skillFor({...questions[0],id:'unreviewed-id'}),'questionSpecific');assert.deepEqual(transferQuestions({},questions,{...questions[0],id:'unreviewed-id'}),[]);
const history=[{id:'P5-X141',correct:false,date:'2026-10-20',skill:'pronouns'}],before=JSON.stringify(history);assert.equal(learningReport({history},questions,'2026-10-20').skills[0].key,'relativePerson');assert.equal(JSON.stringify(history),before);
console.log(`PASS: all 1172 static teaching mappings, ${Object.keys(expected).length} independently reviewed focus regressions, corrected informative explanation, all same-focus/same-Part transfers, safe unmapped fallback, unchanged bank and legacy history.`);
