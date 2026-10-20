import {focusedLessons} from './lesson-catalog.js';
import {TEACHING} from './teaching-map.js';
// Local, transparent learning rules. No score conversion or remote AI service.
export const LESSONS={
 preposition:{name:'介系詞與期限｜Prepositions & Deadlines',rule:'介系詞須配合時間、位置或片語；by 表示最晚期限，until 表示狀態持續到某時。',example:'Please return the form by Friday.',zh:'請最晚在週五前交回表單。',trap:'by Friday 是繳交期限；until Friday 通常描述持續到週五的狀態。',steps:'先分辨時間或位置；檢查期限與持續；將片語連同例句記憶。'},
 modal:{name:'情態助動詞｜Modal Verbs',rule:'can、must、should 等後面通常接原形動詞；若為被動，使用 modal + be + 過去分詞。',example:'All visitors must wear a badge.',zh:'所有訪客都必須配戴識別證。',trap:'不能因主詞是單數，就在 must 後的動詞加 s。',steps:'辨認情態助動詞；確認主動或被動；再判斷能力、義務或建議。'},
 subjunctive:{name:'建議與假設語氣｜Subjunctive Forms',rule:'在要求、建議或必要性後的 that 子句，正式用法可採原形動詞；被動使用 be 加過去分詞。',example:'It is essential that the file be reviewed.',zh:'這份檔案務必經過審查。',trap:'that 子句主詞是單數，仍可能使用原形 be；也要分辨一般事實陳述。',steps:'找要求或必要性表達；判斷子句主動被動；確認完整句意。'},
 photo:{name:'圖片與動作｜Photos & Actions',rule:'先確認人物、動作、物品與位置，再逐一核對敘述。圖片只支持看得到的事實。',example:'A woman is typing at a desk.',zh:'一位女子正在桌前打字。',trap:'聽到圖中物品的單字，不代表整句正確；留意人物、動作與方位是否都吻合。',steps:'先看圖預測動作；聽四個敘述；排除圖片無法證實的內容。'},
 response:{name:'問句與間接回應｜Questions & Responses',rule:'先辨認問句目的，再判斷回應是否完成溝通；合理回答可能沒有重複問句單字。',example:'Who will lead the tour? — Ask the receptionist.',zh:'誰會帶領導覽？——問問接待人員。',trap:'相似發音、重複單字與直接回答 yes 都可能是干擾。',steps:'抓 who/when/where 或邀請、請求；以意思配對；否定問句不要只靠 yes/no 判斷。'},
 listenPurpose:{name:'聽力主旨與意圖｜Listening Purpose',rule:'先抓說話者身分、場所與溝通目的，並用後續訊息確認。',example:'I’m calling to reschedule our appointment.',zh:'我打電話來是要改約。',trap:'開場背景不一定是主要目的；答案常使用同義改寫。',steps:'第一次以原速聽並作答；看解析後定位依據；最後關閉逐字稿再聽。'},
 listenDetail:{name:'聽力細節與行動｜Listening Details',rule:'區分原本安排、修改後安排，以及誰接下來要做什麼。',example:'Please send the revised schedule by noon.',zh:'請在中午前寄出修改後的時程。',trap:'第一個日期或數字可能只是舊安排；注意 but、instead、actually 之後的更正。',steps:'先讀題目需求；聽取人物、時間與行動；答後重聽關鍵句並跟讀。'},
 pos:{name:'詞性與修飾｜Word Forms',rule:'先看空格在句中的位置，再選名詞、動詞、形容詞或副詞。',example:'The technician inspected the equipment carefully.',zh:'技術人員仔細檢查了設備。',trap:'字義相近的同字根選項，要靠句構判斷；副詞不一定只修飾動詞。',steps:'找主詞與動詞；確認空格修飾誰；最後檢查意思。'},
 agreement:{name:'主詞動詞一致｜Subject–Verb Agreement',rule:'動詞要與真正主詞一致，不受中間介系詞片語的名詞影響。',example:'The list of spare parts is on the desk.',zh:'備品清單在桌上。',trap:'of spare parts 是修飾 list；主詞不是 parts。',steps:'圈出主詞中心詞；暫時略過修飾語；確認單複數與時態。'},
 tense:{name:'時態與時間｜Tense & Time',rule:'由時間線索與事件先後決定時態；完成式強調與另一時間點的關係。',example:'We have used this system since May.',zh:'我們自五月起就使用這套系統。',trap:'since、already 等是線索，但仍須確認句子的時間關係。',steps:'找時間詞；畫出事件先後；檢查助動詞後的動詞形式。'},
 passive:{name:'被動語態｜Passive Voice',rule:'主詞承受動作時，使用 be 加過去分詞，並配合時態。',example:'The replacement parts will be delivered tomorrow.',zh:'替換零件將於明天送達。',trap:'有 be 不一定是被動；要確認主詞與動作的關係。',steps:'問誰做、誰接受；判斷主動或被動；再核對時態。'},
 verbForm:{name:'不定詞與動名詞｜Infinitives & Gerunds',rule:'動詞後接 to V 或 V-ing 要看搭配；介系詞後的動作通常用 V-ing。',example:'We look forward to meeting the client.',zh:'我們期待與客戶見面。',trap:'look forward to 的 to 是介系詞，不是不定詞符號。',steps:'先辨認前面的動詞或介系詞；確認搭配；避免見到 to 就選原形。'},
 connectors:{name:'連接與邏輯｜Connectors',rule:'連接詞後可接子句；介系詞後接名詞片語。先判斷句構，再判斷因果、讓步或條件。',example:'Although the shipment was delayed, production continued.',zh:'雖然貨運延遲，生產仍持續進行。',trap:'although 與 despite 意義接近，但後接結構不同。',steps:'檢查空格後有沒有主詞動詞；判斷前後邏輯；留意標點。'},
 pronouns:{name:'代名詞與指涉｜Pronouns & Reference',rule:'由句中角色選主格、受格、所有格或反身代名詞，並確認指涉對象。',example:'The engineers checked their tools themselves.',zh:'工程師們親自檢查了他們的工具。',trap:'their 修飾名詞；themselves 表示親自，不能互換。',steps:'找指涉名詞；看空格是否接名詞；確認主受格與單複數。'},
 comparison:{name:'比較與數量｜Comparison & Quantity',rule:'比較兩者常用比較級；群體中最高程度常用最高級；數量詞需配合可數性。',example:'This model is more efficient than the previous one.',zh:'這個型號比前一個型號更有效率。',trap:'than 是線索，但不要忽略原級比較 as ... as。',steps:'確認比較範圍；檢查 than/as；核對可數、不可數與單複數。'},
 clauses:{name:'子句與分詞｜Clauses & Participles',rule:'分詞與省略子句須確認被修飾名詞是動作執行者還是承受者。',example:'The report submitted yesterday contains the results.',zh:'昨天提交的報告包含結果。',trap:'report 承受 submit 的動作，因此用 submitted；不能只看字尾選答案。',steps:'還原完整子句；找主動或被動關係；確認分詞修飾的對象。'},
 vocab:{name:'搭配與職場用字｜Collocations',rule:'除了詞義，也要檢查動詞與名詞、形容詞與介系詞的自然搭配。',example:'Please place an order for the replacement filter.',zh:'請訂購替換濾網。',trap:'中文意思接近的動詞未必能搭配同一名詞。',steps:'辨認職場情境；把片語一起讀；以完整例句記憶。'},
 insertion:{name:'句子插入與銜接｜Sentence Insertion',rule:'插入句須同時接得上前一句與後一句，注意代名詞與時間順序。',example:'The office will be closed on Friday. Normal service resumes on Monday.',zh:'辦公室週五休息，週一恢復正常服務。',trap:'只看前一句通順不夠；this、these、however 往往需要前文依據。',steps:'先讀全文目的；找指涉與轉折；插入後重讀前後三句。'},
 context:{name:'篇章上下文｜Text Context',rule:'先理解文章目的與段落關係，再決定文法、用字或句子。',example:'Your request has been approved. You may begin on Monday.',zh:'你的申請已核准，可以在週一開始。',trap:'單看空格附近可能合理，但與整段的時態或目的矛盾。',steps:'先快速讀全文；填空後回讀；檢查時間、人物與邏輯是否一致。'},
 inference:{name:'推論與意圖｜Inference & Intent',rule:'選文中能支持的推論，不靠常識添加未提到的假設。',example:'All morning sessions are full; afternoon seats remain available.',zh:'上午場都已額滿，下午場仍有名額。',trap:'可推知下午還能報名，不能推知上午場更便宜。',steps:'先找證據句；改寫成最小推論；排除超出文本的選項。'},
 integration:{name:'跨文件整合｜Cross-document Reading',rule:'先用姓名、訂單號、日期等資訊，確認多篇文件談的是同一件事。',example:'The invoice lists 12 units; the follow-up e-mail adds 3 more.',zh:'發票列出十二件，後續郵件再追加三件。',trap:'不同文件可能是舊版與修正版；不可直接把所有數字相加。',steps:'標記文件身分與日期；找交叉線索；確認最後有效版本與適用條件。'},
 calculation:{name:'數據與時間推算｜Numbers & Schedules',rule:'先列出適用條件，再計算數量、費用或時間，核對單位與例外。',example:'Three tickets at $20 each cost $60 before fees.',zh:'三張票每張二十元，加收費用前共六十元。',trap:'折扣門檻、運費與退費範圍可能只適用部分項目。',steps:'寫下數字與單位；檢查條件；算完回看題目問的是總額或差額。'},
 condition:{name:'條件與例外｜Conditions & Exceptions',rule:'辨認誰符合資格、必須先做什麼，以及規則的例外。',example:'Same-day service is available only with prior approval.',zh:'僅事先取得核准者可使用當日服務。',trap:'only、unless、except 會改變適用範圍，不能略讀。',steps:'把規則改寫成如果／才；找例外；逐項檢查選項是否滿足條件。'},
 detail:{name:'定位與同義改寫｜Details & Paraphrase',rule:'以題目線索找段落，再用整句意思核對答案，留意否定與改寫。',example:'The fee is waived. = You do not need to pay the fee.',zh:'費用已免除，也就是不必支付該費用。',trap:'選項重複原文字詞，不代表句意相同；NOT 題要逐項查證。',steps:'先讀問題；定位相關句；用自己的話改寫後比較選項。'}
};
Object.assign(LESSONS,focusedLessons);
export function teachingFor(q){const focus=TEACHING[q.id];return focus&&LESSONS[focus.lesson]?focus:null}
export function teachingExplanation(q){return TEACHING[q.id]?.explanation||q.explanation}
export function skillFor(q){return teachingFor(q)?.lesson||'questionSpecific'}
const dayNumber=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return NaN;const n=Date.parse(s+'T12:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===s?Math.floor(n/86400000):NaN};
export const addDays=(date,n)=>new Date((dayNumber(date)+n)*86400000).toISOString().slice(0,10);
export function questionSchedule(history,questions,date){
 const valid=new Set(questions.map(q=>q.id)),days=new Map();
 for(const h of history||[]){if(!valid.has(h.id)||!Number.isFinite(dayNumber(h.date))||h.date>date||typeof h.correct!=='boolean')continue;let per=days.get(h.id);if(!per){per=new Map();days.set(h.id,per)}const old=per.get(h.date);per.set(h.date,{...h,missed:!h.correct||h.confidence==='guess'||!!old?.missed})}
 const out=new Map();for(const [id,per] of days){let streak=0,last;for(const [d,h] of [...per].sort(([a],[b])=>a.localeCompare(b))){streak=h.missed?0:streak+1;last={...h,date:d}}const interval=[1,1,3,7,14,30][Math.min(streak,5)];out.set(id,{id,streak,interval,due:addDays(last.date,interval),lastDate:last.date,lastCorrect:last.correct,uncertain:last.confidence==='guess',dueNow:addDays(last.date,interval)<=date})}return out;
}
export function learningReport(data,questions,date){
 const map=new Map(questions.map(q=>[q.id,q])),first=new Map(),latest=new Map();
 const history=(data.history||[]).filter(h=>map.has(h.id)&&Number.isFinite(dayNumber(h.date))&&h.date<=date&&typeof h.correct==='boolean');
 for(const h of history){if(!first.has(h.id))first.set(h.id,h);latest.set(h.id,h)}
 const skills=new Map();for(const [id,h] of first){const key=skillFor(map.get(id));if(!skills.has(key))skills.set(key,{key,name:LESSONS[key].name,total:0,correct:0,recentCorrect:0});const s=skills.get(key);s.total++;if(h.correct&&h.confidence!=='guess')s.correct++;const last=latest.get(id);if(last.correct&&last.confidence!=='guess')s.recentCorrect++}
 const rows=[...skills.values()].map(s=>({...s,rate:Math.round(s.correct/s.total*100),latestRate:Math.round(s.recentCorrect/s.total*100),label:s.total<3?'樣本不足':s.correct/s.total<.7?'優先補強':'持續鞏固'})).sort((a,b)=>a.rate-b.rate||b.total-a.total);
 const dates=[...new Set(history.map(h=>h.date))].sort();let streak=0,cursor=date;if(!dates.includes(cursor))cursor=addDays(cursor,-1);while(dates.includes(cursor)){streak++;cursor=addDays(cursor,-1)}
 const timed=history.filter(h=>Number.isFinite(h.elapsedMs)&&h.elapsedMs>0&&h.elapsedMs<7200000);
 return {firstTotal:first.size,firstCorrect:[...first.values()].filter(h=>h.correct&&h.confidence!=='guess').length,skills:rows,streak,activeMinutes:Math.round(timed.reduce((a,h)=>a+h.elapsedMs,0)/60000),timedCount:timed.length,schedule:questionSchedule(history,questions,date),history};
}
export function buildStudyOrder(data,questions,date,random=Math.random){
 const report=learningReport(data,questions,date),weak=new Set(report.skills.filter(s=>s.total>=3&&s.rate<70).map(s=>s.key)),groups=new Map();
 for(const q of questions){const key=q.group||q.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q)}
 const buckets={review:[],weak:[],new:[],keep:[]},reasons={};
 for(const group of groups.values()){const kind=group.some(q=>report.schedule.get(q.id)?.dueNow)?'review':group.some(q=>weak.has(skillFor(q))&&!report.schedule.has(q.id))?'weak':group.some(q=>!report.schedule.has(q.id))?'new':'keep';buckets[kind].push(group);for(const q of group)reasons[q.id]=kind}
 for(const arr of Object.values(buckets))for(let i=arr.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}
 const pattern=['review','weak','weak','new','weak','review','weak','new','review','weak'],order=[];let n=0;
 while(Object.values(buckets).some(a=>a.length)){const preferred=pattern[n++%pattern.length],kind=buckets[preferred].length?preferred:['review','weak','new','keep'].find(k=>buckets[k].length);order.push(...buckets[kind].pop().map(q=>q.id))}
 return {date,order,reasons};
}
export const studyLabels={review:'到期複習',weak:'弱點補強',new:'新題探索',keep:'鞏固練習'};
export function ensureStudyPlan(data,questions,date,random=Math.random){
 const ids=new Set(questions.map(q=>q.id));let p=data.studyPlan,changed=false;
 if(!p||p.date!==date||!Array.isArray(p.order)||p.order.length!==ids.size||new Set(p.order).size!==ids.size||!p.order.every(id=>ids.has(id))){p=buildStudyOrder(data,questions,date,random);data.studyPlan=p;changed=true}
 return {plan:p,changed};
}
export function transferQuestions(data,questions,q,limit=10){
 const focus=teachingFor(q);if(!focus)return [];
 const seen=new Set((data.history||[]).map(h=>h.id));
 return questions.filter(x=>x.id!==q.id&&x.part===q.part&&(!q.group||x.group!==q.group)&&teachingFor(x)?.transfer===focus.transfer)
 .sort((a,b)=>Number(seen.has(a.id))-Number(seen.has(b.id))).slice(0,limit).map(x=>x.id);
}
export function wordDue(data,items,date){return items.filter(w=>data.wordMemory?.[w.id]&&Number.isFinite(dayNumber(data.wordMemory[w.id].due))&&data.wordMemory[w.id].due<=date)}
export function rateWord(data,id,remembered,date){
 if(!data.wordMemory||typeof data.wordMemory!=='object'||Array.isArray(data.wordMemory))data.wordMemory={};
 const old=data.wordMemory[id],prior=Number.isInteger(old?.streak)?Math.max(0,Math.min(5,old.streak)):0;
 const streak=remembered?(old?.lastDate===date?prior:Math.min(5,prior+1)):0;
 const interval=[1,1,3,7,14,30][streak];data.wordMemory[id]={streak,due:addDays(date,interval),lastDate:date};return data.wordMemory[id];
}
