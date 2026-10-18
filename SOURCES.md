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
