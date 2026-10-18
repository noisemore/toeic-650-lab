# TOEIC 650 Lab｜第一版 PWA（v1.0.1）

繁體中文、手機優先、離線可用的多益學習可測試版（MVP）。**非 ETS 或 TOEIC 官方產品。**

## 已實作

- Android 主畫面安裝所需的 PWA Manifest 與 Service Worker
- Part 5 **36 道原創題目**：四選一、即時詳解、收藏、連續練習
- **20 個**商務核心單字，含例句、中文翻譯、複習標記
- **20 個**半導體工程術語，含英中例句與主題分類
- 透過系統 TTS 朗讀單字／句子（實際離線能力依手機語音套件）
- IndexedDB 本機作答紀錄、錯題統計、每日目標
- JSON 備份匯出、匯入；不需要帳號與 API

## 尚未完成

正式 600 題目標題庫、Part 1–4/6–7、錄製聽力與圖片、800 單字、200 題完整模考、AI 家教、雲端同步，皆屬後續階段。**沒有提供 APK**，因為這是 PWA 專案。

## 在 Ubuntu 本機測試

安裝 Python 3 後，進入本資料夾並執行：

```bash
python3 -m http.server 8080
```

Chrome 開啟 http://localhost:8080，即可測試網頁、IndexedDB 與 Service Worker（localhost 為受信任開發來源）。

## 安裝到 Android 手機

1. 將**整個**資料夾部署到支援 HTTPS 的靜態網站服務，例如 GitHub Pages、Cloudflare Pages 或 Netlify。這些服務的發布步驟依最新介面操作。
2. 手機使用 Chrome 開啟該 HTTPS 網址。
3. 瀏覽器選單選擇「安裝應用程式」或「新增至主畫面」（用語依 Chrome 版本）。
4. 完成首次載入並保持網頁開啟一次，離線快取建立後，基本題庫即可離線使用。

> 用電腦區域網路 IP 開啟 `http://192.168.x.x:8080` 通常**不能**當成可安裝 PWA 的正式 HTTPS 安全來源；務必部署至 HTTPS 網站後再從手機安裝。

## 更新和資料安全

修改程式後更新 `sw.js` 的 CACHE 版本字串，確保使用者能重新抓取檔案。清除瀏覽器網站資料或移除網站儲存空間可能刪除學習紀錄；請先到「統計」下載 JSON 備份。

## 檔案結構

- `index.html` 首頁載入
- `styles.css` 響應式畫面
- `data.js` 原創練習題、單字、工程術語
- `app.js` 作答、記錄、導覽與備份
- `sw.js` 離線快取
- `manifest.webmanifest` 安裝資料
- `icons/` 主畫面圖示

## 自檢紀錄（2026-10-18）

- 通過：`node --check app.js`、`node --check data.js`、`node --check sw.js`。
- 通過：`node self-check.mjs`，驗證 36 道題目、答案索引、解析及資料欄位、40 個詞彙、Manifest 與 PWA 資產。
- 通過：本機 HTTP 伺服器對首頁回應 HTTP 200；App 192/512 圖示尺寸正確。
- **未完成實機／瀏覽器端到端測試**：本測試執行環境的 Chromium 網址存取被管理政策封鎖（`ERR_BLOCKED_BY_ADMINISTRATOR`），因此 IndexedDB、實際 PWA 安裝、離線重啟與匯入互動仍需你在手機／電腦 Chrome 驗證。

## 手機測試建議

1. HTTPS 部署後用 Chrome 開啟首頁並新增至主畫面。
2. Part 5 選答案→送出→檢查中文解析→下一題。
3. 到「練習→錯題」與「收藏」驗證分類；重新載入確認紀錄還在。
4. 單字及工程英文朗讀；統計頁測試匯出備份。
5. 使用飛航模式重新打開已載入的 App（TTS 是否離線發音取決於裝置）。
