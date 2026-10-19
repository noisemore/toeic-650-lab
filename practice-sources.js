export const officialSources=[
 {name:'ETS 官方聽讀樣題｜Sample Test',url:'https://www.ets.org/content/dam/ets-org/pdfs/toeic/toeic-listening-reading-sample-test.pdf',description:'官方公開樣題 PDF，涵蓋 Part 1–7、答案及聽力逐字稿。用於對照正式題型；在來源網站開啟。'},
 {name:'台灣官方 Part 5｜句子填空',url:'https://www.toeic.com.tw/sample-test/toeic-listening-reading/sample05.html',description:'台灣多益網站公開的 Part 5 題型範例。'},
 {name:'台灣官方 Part 6｜段落填空',url:'https://www.toeic.com.tw/sample-test/toeic-listening-reading/sample06.html',description:'台灣多益網站公開的 Part 6 題型範例。'},
 {name:'IIBC 官方 Part 7｜多篇閱讀',url:'https://www.iibc-global.org/toeic/test/lr/about/format/sample07_02.html',description:'日本多益官方網站公開的多篇閱讀樣題。'}
];
export const levelFor=q=>q.practiceLevel||(q.id.includes('-XR')?'applied':'unrated');
export const levelLabels={unrated:'原有練習 · 未分級',applied:'閱讀情境 · 編輯分級',advanced:'進階補強 · 編輯分級'};
