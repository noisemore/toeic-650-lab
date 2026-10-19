// Local-day plans are sampled once and persisted with the existing learning backup.
export const dailyDate=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const dailyGoal=(value,fallback=10,max=100)=>Number.isInteger(value)&&value>=1&&value<=max?value:fallback;
export function shuffleDaily(items,random=Math.random){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
export function dailyQuestionOrder(questions,random=Math.random){
 const groups=new Map();for(const q of questions){const key=q.group||q.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q.id)}
 return shuffleDaily([...groups.values()],random).flat();
}
const validOrder=(order,ids)=>Array.isArray(order)&&order.length===ids.size&&new Set(order).size===ids.size&&order.every(id=>ids.has(id));
export function ensureDailyPlan(data,questions,words,date=dailyDate(),random=Math.random){
 const eligible=words.filter(w=>w.example&&w.exampleZh),questionIds=new Set(questions.map(q=>q.id)),wordIds=new Set(eligible.map(w=>w.id));
 let plan=data.daily,changed=false;
 if(!plan||plan.date!==date||!validOrder(plan.questionOrder,questionIds)||!validOrder(plan.wordOrder,wordIds)){
  plan={date,questionOrder:dailyQuestionOrder(questions,random),wordOrder:shuffleDaily(eligible.map(w=>w.id),random),learnedWordIds:[]};
  data.daily=plan;changed=true;
 }
 const learned=Array.isArray(plan.learnedWordIds)?[...new Set(plan.learnedWordIds.filter(id=>wordIds.has(id)))]:[];
 if(JSON.stringify(learned)!==JSON.stringify(plan.learnedWordIds)){plan.learnedWordIds=learned;changed=true}
 return {plan,changed};
}
export function dailyProgress(data,plan){
 const goal=dailyGoal(data.settings?.dailyGoal),wordGoal=dailyGoal(data.settings?.dailyWordGoal,5,20);
 const questionIds=plan.questionOrder.slice(0,goal),wordIds=plan.wordOrder.slice(0,wordGoal);
 const answered=new Set((data.history||[]).filter(h=>h.date===plan.date).map(h=>h.id));
 const remaining=questionIds.filter(id=>!answered.has(id));
 return {goal,wordGoal,questionIds,wordIds,remaining,completed:questionIds.length-remaining.length,wordsCompleted:wordIds.filter(id=>plan.learnedWordIds.includes(id)).length};
}
