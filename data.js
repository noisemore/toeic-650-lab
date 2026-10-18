import {expandedWords,expandedEngineering} from './vocabulary.js';
export const words=expandedWords;
export const engineering=expandedEngineering;
import {extraQuestions} from './parts.js';
// 原創 Part 5 題庫；其餘六個 Part 由 parts.js 提供。
const raw=[
['The technician _____ the equipment before starting the maintenance procedure yesterday.','inspect','inspected','inspecting','inspection','B','yesterday 表示過去時間，主動詞須使用過去式 inspected。','過去式','設備'],
['All employees must _____ their identification badges while on site.','wear','wears','wearing','worn','A','must 為情態助動詞，後接原形動詞 wear。','情態助動詞','職場'],
['The manager will review the report _____ Friday.','in','on','at','for','B','星期幾前使用介系詞 on：on Friday。','介系詞','辦公室'],
['The new software is more efficient _____ the previous version.','as','than','from','to','B','比較級 more efficient 要搭配 than。','比較級','科技'],
['The package was delivered _____ the customer this morning.','to','by','with','at','A','deliver something to someone：將物品送交某人。','介系詞','物流'],
['Please contact the service department if the machine _____ unexpectedly.','stop','stopping','stops','stopped','C','真實條件句中，if 子句描述將來可能發生的事時，用現在簡單式；單數主詞 machine 搭配 stops。','條件句','設備'],
['The meeting has been _____ until next Monday.','postpone','postponed','postponing','postponement','B','has been 後搭配過去分詞 postponed，構成現在完成式被動語態。','被動語態','辦公室'],
['Our team completed the inspection _____ than expected.','early','earlier','earliest','earliness','B','than expected 是比較結構，需要比較級 earlier。','比較級','設備'],
['Ms. Chen is responsible _____ scheduling the training sessions.','for','of','with','by','A','be responsible for + 名詞或 V-ing，表示負責某事。','固定搭配','人資'],
['The instructions are _____ on the company website.','available','availability','availably','avail','A','be 動詞 are 後需要形容詞 available，表示可取得。','詞性','網站'],
['The engineer explained the procedure _____ to the new staff.','clear','clearly','clarity','cleared','B','修飾動詞 explained 須使用副詞 clearly。','副詞','設備'],
['We have worked with this supplier _____ 2022.','for','since','during','until','B','現在完成式搭配起始時間點使用 since。','完成式','採購'],
['The shipment cannot be released _____ the quality check is complete.','until','although','because of','despite','A','not ... until 表示「直到……才」，符合出貨需完成檢驗的語意。','連接詞','物流'],
['The training materials _____ to all participants yesterday.','send','were sent','was sending','have send','B','materials 為複數，且 yesterday 表示過去；被動式用 were sent。','被動語態','培訓'],
['The customer requested a _____ explanation of the repair costs.','detail','detailed','detailing','details','B','修飾名詞 explanation 需要形容詞 detailed。','詞性','客戶'],
['Either the supervisor or the technicians _____ responsible for the final check.','is','are','was','be','B','either...or 主詞一致依較近的複數名詞 technicians 決定，使用 are。','主詞一致','品質'],
['The parts should be stored in a _____ environment.','dry','dryly','dryness','driedly','A','environment 是名詞，前方用形容詞 dry。','詞性','倉儲'],
['The conference room is located _____ the third floor.','in','on','at','over','B','樓層搭配 on：on the third floor。','介系詞','辦公室'],
['The warranty will expire _____ December 31.','in','on','at','since','B','特定日期搭配 on。','介系詞','客服'],
['The operator turned off the system _____ performing maintenance.','before','unless','despite','because','A','before + V-ing，表示「進行維護之前」。','連接詞','安全'],
['The director asked everyone to submit _____ reports by noon.','they','them','their','theirs','C','reports 前需要所有格形容詞 their。','代名詞','辦公室'],
['Production increased _____ after the equipment upgrade.','significant','significantly','significance','signify','B','修飾 increased 使用副詞 significantly。','副詞','製造'],
['If you need additional assistance, please _____ our support team.','contact','contacts','contacting','contacted','A','祈使句以原形動詞 contact 開頭。','動詞形式','客服'],
['The laboratory is _____ equipped to perform pressure tests.','full','fully','fulfill','fullness','B','修飾 equipped 使用副詞 fully。','副詞','設備'],
['The new employee has not completed the safety course _____.','yet','already','ever','still','A','否定現在完成式常用 yet 表示「尚未」。','完成式','安全'],
['The maintenance log needs to be updated on a _____ basis.','regular','regularly','regulate','regulation','A','修飾名詞 basis 使用形容詞 regular。','詞性','維修'],
['Each of the applicants _____ required to provide a résumé.','are','is','be','have','B','each of + 複數名詞仍視為單數主詞，使用 is。','主詞一致','人資'],
['The supplier apologized _____ the delay in delivery.','with','for','from','about to','B','apologize for + 事情，表示為某事道歉。','固定搭配','採購'],
['Customers will receive a confirmation email _____ their orders are processed.','once','during','despite','unless of','A','once 引導時間子句，表示「一旦訂單處理完成」。','連接詞','電商'],
['The results of the inspection were _____ than anticipated.','good','better','best','well','B','than 表示比較，需要 good 的比較級 better。','比較級','品質'],
['The documents must be _____ before the audit begins.','organize','organized','organizing','organization','B','must be 後接過去分詞，構成被動語態 organized。','被動語態','稽核'],
['To reduce errors, the team introduced a new _____ procedure.','verify','verified','verification','verifyingly','C','名詞 verification 修飾 procedure，表示驗證程序。','詞性','品質'],
['The engineer will call you as soon as the inspection _____.','finish','finishes','finished','will finish','B','as soon as 時間子句中用現在簡單式表示未來；inspection 為單數主詞。','時間子句','維修'],
['The equipment was shut down _____ safety reasons.','of','for','with','at','B','for safety reasons 是固定搭配，表示基於安全因素。','固定搭配','安全'],
['Please read the manual _____ before operating the machine.','careful','carefully','care','carefulness','B','read 是動詞，使用副詞 carefully 修飾。','副詞','設備'],
['The client asked whether the replacement part was _____ stock.','in','on','by','to','A','in stock 表示有庫存。','固定搭配','採購'],
];
const p5Questions=raw.map((r,i)=>({id:`P5-${String(i+1).padStart(3,'0')}`,part:5,question:r[0],options:r.slice(1,5),answer:'ABCD'.indexOf(r[5]),explanation:r[6],grammar:r[7],topic:r[8]}));
export const questions=[...extraQuestions.filter(q=>q.part<5),...p5Questions,...extraQuestions.filter(q=>q.part>5)];
