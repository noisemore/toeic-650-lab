# 詞庫來源與選詞說明（v3.0.0，2026-10-19）

## 範圍與限制

多益詞庫共 3,000 個不重複詞條：400 個職場重點詞＋2,600 個基礎延伸詞。工程英文共 400 個不重複術語，分為 16 類，每類 25 個。兩個詞庫有部分重疊，不能把兩者相加宣稱為 3,400 個互不重複的英文單字。

ETS 的分數文件描述能力與分項表現，並不提供「背固定幾個字即可得到 650 分」的門檻。本專案將 3,000 詞設定為廣度目標，不是官方指定清單或分數保證，也不將一般語料詞頻冒稱為多益試題出現頻率。

## 一般與職場英文

- ETS，Score Use：https://www.ets.org/toeic/resources/scores/score-use.html
- ETS，CEFR 分數對照：https://www.ets.org/pdfs/toeic/toeic-mapping-cefr-reference.pdf
- ECDICT：https://github.com/skywind3000/ECDICT
- ECDICT 授權：https://github.com/skywind3000/ECDICT/blob/master/LICENSE

400 個職場詞由本專案依辦公、人資、財務、採購、行銷、物流、旅行、餐旅、客服、生產、建築、資訊、溝通、訓練、常用動詞與時間邏輯情境整理，繁中詞義與雙語搭配均為原創。原版 20 個詞條的雙語例句及 ID 均保留。

2,600 個基礎延伸詞由 ECDICT 的一般語料詞頻資料篩選，排除明顯的專名、缺少中文詞義的詞條與標示為屈折變形的詞條；一般不重複收錄單純過去式及複數以增加計數。繁中轉換使用 OpenCC s2twp，並對常見職場詞義作台灣用語修訂。詞典資料含多義詞，仍須按上下文理解；這一層並未逐詞補上原創例句，不會以空泛套句填充例句欄。

ECDICT 資料版本：ecdict.csv，檔案提交 82c9872576b23118d7c42e920c11beb77f510ae2；查閱時儲存庫 HEAD bc015ed2e24a7abef49fc6dbbb7fe32c1dadaf8b。MIT 授權全文見 ECDICT-LICENSE.txt。

## 工程英文主題參考

詞義與雙語例句由本專案重新撰寫，以下是主題概念核對與延伸閱讀來源，並非逐條引用或任何機構的認可。

| 主題 | 一手參考 |
| --- | --- |
| 真空、氣體負載、流導、幫浦、密封 | Pfeiffer Vacuum Technology Book：https://www.pfeiffervacuum.com/global/en/knowledge/vacuum-technology/knowledge-book/table_of_content/ |
| 壓升、示蹤氣體、實漏／虛漏、放氣 | Leybold Leak Detection：https://www.leybold.com/en/knowledge/vacuum-fundamentals/leak-detection/basics-of-leak-detection |
| 質量流量感測與控制 | MKS Mass Flow Technology：https://s1.mks.com/mass-flow-technology-technote |
| 沉積、蝕刻、光阻、晶圓、電漿 | Lam Research Technical Glossary：https://www.lamresearch.com/technical-glossary/ |
| 微影、曝光、光罩、光學與晶圓定位 | ASML Lithography Principles：https://www.asml.com/en/technology/lithography-principles |
| 電壓、電流、電阻、導通與電錶術語 | Fluke Digital Multimeter Glossary：https://www.fluke.com/en/learn/blog/electrical/multimeter-common-terminology |
| 校正、量測追溯性、不確定度 | NIST Traceability：https://www.nist.gov/calibrations/traceability |
| 危險能量、上鎖掛牌與維修安全 | OSHA Lockout/Tagout：https://www.osha.gov/control-hazardous-energy/program |

一般機械、圖面、維修紀錄與客服用語亦以實際設備支援情境撰寫原創例句。不同公司可能採用不同縮寫或定義；throughput、availability、validation 等詞須配合文件語境。工程詞彙是英文教材，不能取代原廠手冊、正式訓練或現場核准作業程序。

## 自檢與紀錄相容

- 對一般與工程詞庫各自去重，驗證中文、雙語搭配／例句欄位及 ID。
- 確認原版 W-1～W-20、E-1～E-20 的詞義對應與 ID 保留，原有複習紀錄不需遷移。
- 搜尋可組合英文、繁中及縮寫；依主題、層級與複習狀態交集篩選。
- 每頁最多 30 個詞條，避免在手機一次建立 3,000 個詞條的畫面。
- 詞庫模組納入離線快取；外部參考網站及裝置語音引擎另受連線／裝置支援限制。

## v4.1.0 每日精選例句

400 個職場重點詞現皆含本專案整理的完整中英例句，原有 20 句保留。每日精選只從這 400 個有完整例句的職場詞中隨機取樣；2,600 個基礎延伸詞義的 ECDICT 來源與授權不變，未宣稱每個基礎詞都有例句。每日題目從完整原創練習題庫抽樣，當日順序及進度保存在使用者裝置。

## v4.2.0 多國口音與寫實情境圖

230 個聽力音檔改由 Piper VCTK medium 神經語音模型產生，依官方 speaker-info 分配美國、英格蘭、加拿大及澳洲口音；對話角色採固定不同聲音。口音與 speaker ID 記錄於 audio-metadata.json。這些是合成語音，不是真人錄音，不能完整代表各地口音。

30 幅 Part 1 圖片由 OpenAI 圖像生成工具製作，逐張核對題幹與正確選項。無標示答案的替代文字；不是官方考試照片。圖片與全部音檔納入離線預載。首次請連網等待快取完成。

語音模型：https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_GB/vctk/medium

VCTK 作者 Christophe Veaux、Junichi Yamagishi、Kirsten MacDonald，University of Edinburgh；資料集 CC BY 4.0。來源與變更說明見 AUDIO-LICENSE.txt。

## v4.3.0 閱讀擴充

reading-bank.js 新增 100 題原創閱讀：20 題 Part 5、5 組 Part 6 共 20 題、12 組 Part 7 共 60 題（單／雙／三篇各 4 組）。題目、選項、文章、中文大意及解析均為本專案編寫；未複製官方或商業題庫。人名、組織與交易情境為虛構。主題涵蓋一般職場與設備服務，情境不構成實際操作指引。

舊 1,024 題的完整 JSON 雜湊保留驗證；新增題具不同語境，答案位置輪替；所有新增題均納入畫面渲染、去重、答案索引及題組一致性測試。跨文件時間、數量、費用及退款條件另列獨立核對。新增閱讀分類、專用首頁入口、新題篩選與今日任務更新相容測試。
