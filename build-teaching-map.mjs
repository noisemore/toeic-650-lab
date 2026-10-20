// Reviewed mapping build for the existing bank. The output is static and checked in.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {questions} from './data.js';
if(createHash('sha256').update(JSON.stringify(questions)).digest('hex')!=='7c2019b371e6dc89729ec60a6b1e7a9765e98a4a47a27f0f317e24363c6ba9d0')throw Error('Question bank changed: review every changed teaching mapping before rebuilding.');
const grammarMap={
 '過去式':'past','情態助動詞':'modal','介系詞':'timePrep','比較級':'comparative','條件句':'conditionClause','被動語態':'passive','固定搭配':'collocationPhrase','詞性':'adjective','副詞':'adverb','完成式':'presentPerfect','連接詞':'timeClause','主詞一致':'agreement','代名詞':'possessive','動詞形式':'imperative','時間子句':'timeClause',
 '名詞位置':'noun','形容詞位置':'adjective','副詞修飾':'adverb','主詞動詞一致：單數':'agreement','主詞動詞一致：複數':'agreement','現在完成式':'presentPerfect','未來式':'future','不定詞':'infinitive','動名詞':'gerund','介系詞後動名詞':'prepGerund','最高級':'superlative','同等比較':'equality','時間介系詞':'timePrep','期限與持續':'deadline','原因連接詞':'causeClause','讓步連接詞':'concessionClause','關係代名詞：人':'relativePerson','關係代名詞：物':'relativeThing','所有格':'possessive','反身代名詞':'reflexive','可數與不可數':'quantifiers','其他與另一個':'other','分詞形容詞':'feelingParticiple','目的表達':'purposeInfinitive','情態動詞':'modal','固定搭配：介系詞':'collocationPrep','固定搭配：動詞':'collocationPhrase','商務詞彙：採購':'lexicalMeaning','商務詞彙：人資':'lexicalMeaning','商務詞彙：物流':'lexicalMeaning','工程詞彙：維修':'lexicalMeaning','工程詞彙：品質':'lexicalMeaning','商務詞彙：會議與行程':'lexicalMeaning','連接副詞':'linkResult','雙連接詞與平行結構':'pairedConnector','假設語氣':'subjunctive','平行結構':'parallel'
};
const overrides={
 'P2-004':'responseRequest','P2-006':'responseFrequency','P2-007':'responseRequest','P2-008':'responseNegative','P2-009':'responseChoice','P2-010':'responseMethod','P2-011':'responseNegative','P2-012':'responseChoice',
 'P5-X189':'adjective','P7-X040':'readWord','P3-X004':'listenSequence','P3-X015':'listenSequence','P4-X033':'listenSequence','P4-X048':'listenSequence','P4-X062':'listenSequence','P4-X090':'listenSequence',
 'P5-005':'recipientPrep','P5-009':'collocationPrep','P5-012':'sinceMarker','P5-013':'untilClause','P5-016':'agreementNear','P5-018':'placePrep','P5-020':'timeClause','P5-025':'perfectMarkers','P5-028':'collocationPrep','P5-032':'nounModifier','P5-034':'collocationPrep','P5-036':'collocationPhrase',
 'P5-XR002':'agreementNear','P5-XR004':'futurePerfect','P5-XR006':'purposeClause','P5-XR008':'lexicalMeaning','P5-XR009':'comparativeAdverb','P5-XR011':'subjunctive','P5-XR012':'contrastPhrase','P5-XR013':'none','P5-XR014':'untilClause','P5-XR015':'sinceMarker','P5-XR019':'participlePassive',
 'P5-XO001':'participleActive','P5-XO002':'participlePassive','P5-XO003':'participlePassive','P5-XO004':'participlePassive','P5-XO005':'participlePassive','P5-XO006':'participleActive','P5-XO007':'participlePassive','P5-XO008':'participlePassive','P5-XO009':'participlePassive','P5-XO012':'participleActive','P5-XO013':'participlePassive','P5-XO014':'participlePassive','P5-XO015':'participlePriorPassive','P5-XO016':'participlePassive','P5-XO017':'participlePassive'
};
// Original Part 6 labels were generic. These assignments were reviewed per blank.
const p6Legacy=['timePrep','modal','insertion','lexicalMeaning','infinitive','nounModifier','insertion','adverb','rangePrep','passive','insertion','noun'];
const p6Groups=[
 ['agreement','noun','causeClause'],['passive','adjective','timeClause'],['adjective','collocationPrep','conditionClause'],['comparative','adjective','linkAddition'],['adjective','timeClause','timeClause'],['adjective','deadline','linkResult'],['lexicalMeaning','deadline','timeClause'],['adverb','adjective','conditionClause'],['adjective','contrastPhrase','linkOtherwise'],['adjective','conditionClause','rangePrep'],['passive','contrastClause','collocationPrep'],['noun','contrastClause','timeClause'],['noun','adjective','conditionClause'],['collocationPrep','participleActive','timeClause'],['participlePassive','conditionClause','adverb'],['adjective','timeClause','contrastPhrase'],['modal','contrastClause','causeClause'],['lexicalMeaning','contrastPhrase','linkAddition'],['participlePassive','adjective','conditionClause'],['collocationPhrase','timeClause','linkAddition'],['modal','adjective','conditionClause'],['contrastPhrase','adverb','timeClause'],['modal','conditionClause','linkAddition'],['noun','conditionClause','purposePrep'],['passive','timeClause','conditionClause'],['passive','collocationPrep','conditionClause'],['adjective','collocationPrep','conditionClause'],['lexicalMeaning','linkContrast','conditionClause'],['passive','purposeClause','conditionClause'],['bareInfinitive','linkResult','timeClause']
];
for(let i=0;i<12;i++)overrides[`P6-${String(i+1).padStart(3,'0')}`]=p6Legacy[i];
for(let g=0;g<30;g++)for(let n=0;n<4;n++)overrides[`P6-X${String(g*4+n+1).padStart(3,'0')}`]=n===3?'insertion':p6Groups[g][n];
const p6New=['periodPrep','lexicalMeaning','insertion','noun','comparative','lexicalMeaning','insertion','concessionClause','future','gerund','insertion','infinitive','collocationPhrase','adverb','insertion','lexicalMeaning','noun','linkContrast','insertion','lexicalMeaning'];
for(let i=0;i<20;i++)overrides[`P6-XR${String(i+1).padStart(3,'0')}`]=p6New[i];
// These are sentence-linking transitions with different logical functions.
const linking={'In contrast':'linkContrast','In addition':'linkAddition',Therefore:'linkResult',Consequently:'linkResult',Thus:'linkResult',Otherwise:'linkOtherwise',However:'linkContrast',Nevertheless:'linkContrast',Meanwhile:'linkAddition',Furthermore:'linkAddition',Additionally:'linkAddition',Similarly:'linkAddition'};
const teaching={};
for(const q of questions){let lesson=overrides[q.id],reason=lesson?'逐題／空格核對':q.grammar;
 if(!lesson&&q.part===1)lesson='photo';
 if(!lesson&&q.part===2){const first=q.audio.split('\n')[0];lesson=/^when/i.test(first)?'responseTime':/^who/i.test(first)?'responsePerson':/^where/i.test(first)?'responsePlace':/^why/i.test(first)?'listenReason':/^how often/i.test(first)?'responseFrequency':/^how (much|many|long)/i.test(first)?'responseQuantity':q.grammar==='二選一'?'responseChoice':q.grammar==='否定與附加問句'?'responseNegative':['請求','提議與邀請'].includes(q.grammar)?'responseRequest':q.grammar==='陳述與間接回應'?'responseIndirect':/^how/i.test(first)?'responseMethod':'responseConfirm';reason='應答題問句目的核對'}
 if(!lesson&&[3,4].includes(q.part)){const t=q.question;lesson=/purpose|mainly|discussing|being announced|issue are .*discussing/i.test(t)?'listenPurpose':/^why|what caused|what is causing/i.test(t)?'listenReason':/^where/i.test(t)?'listenPlace':/^who/i.test(t)?'listenPerson':/^when|what time|how (many|much|long)|weight compare/i.test(t)?'listenNumber':/do next|should.*do|must.*do|ask|recommend|prepare|will.*do|before visiting|before escalating|what should|what must/i.test(t)?'listenAction':'listenDetail';reason='聽力題目需求核對'}
 if(!lesson&&q.part===5){lesson=grammarMap[q.grammar];if(q.grammar==='連接副詞'){const a=q.options[q.answer];lesson=linking[a[0].toUpperCase()+a.slice(1)];}if(!lesson)throw Error('Unreviewed grammar: '+q.id+' '+q.grammar)}
 if(!lesson&&q.part===7){const t=q.question,g=q.grammar;
  lesson=/計算|推算|金額|數量|預算/.test(g)?'calculation':/purpose|mainly|primarily|main idea/i.test(t)||g==='主旨'?'readPurpose':/what does.*(word|mean)|most nearly mean/i.test(t)||g==='文意字義'?'readWord':/refer to|that explains|指涉/.test(t.toLowerCase()+' '+g)?'readReference':/\bnot\b|\bexcept\b|否定題/i.test(t+' '+g)?'readNegative':/infer|imply|suggest|concluded|probably|most likely|reasonable/.test(t.toLowerCase())||/推論|語氣立場|綜合判斷/.test(g)?'inference':/條件|例外|授權/.test(g)?'condition':/^why/i.test(t)?'readReason':/文件交叉判讀|跨文件|整合|對照/.test(g)?'integration':'detail';reason='閱讀問題與解析核對';
 }
 if(!lesson)throw Error('Missing: '+q.id);
 // All lexical targets use their tested word/phrase, not merely a broad vocabulary category.
 let transfer=lesson;
 if(['lexicalMeaning','collocationPhrase','collocationPrep'].includes(lesson))transfer+=':'+q.options[q.answer].toLowerCase()+':'+(lesson==='collocationPrep'?q.question.split('_____')[0].trim().split(/\s+/).at(-1)?.toLowerCase()||q.group||q.id:'');
 teaching[q.id]={lesson,transfer};
}
for(const id of ['P7-004','P7-008','P7-015','P7-017','P7-023','P7-025'])teaching[id]={lesson:'calculation',transfer:'calculation'};

teaching['P5-X189'].explanation='informative 是形容詞，作 found 的受詞補語，描述 presentation 的性質；highly 是副詞，修飾 informative。這題不是 -ed／-ing 感受分詞的選擇。';
fs.writeFileSync('teaching-map.js','// Reviewed per-question focus for the frozen 1,172-question bank.\nexport const TEACHING='+JSON.stringify(teaching,null,1)+';\n');
const digest=createHash('sha256').update(JSON.stringify(questions)).digest('hex');
console.log('bank SHA256',digest,'mapped',Object.keys(teaching).length,'focuses',new Set(Object.values(teaching).map(x=>x.lesson)).size);
