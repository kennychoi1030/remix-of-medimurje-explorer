Markdown
# 🚀 EcoExplorer: Advanced Outdoor E-commerce & Trail Management System

[![FYP Project](https://img.shields.io/badge/Project-ITP524110-blue.svg)](https://github.com/kennychoi1030/remix-of-medimurje-explorer)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Laravel%20%7C%20MySQL-orange.svg)]()

## 📝 專案簡介 (Project Overview)
EcoExplorer 是一個全方位的戶外活動平台，結合了**遠足步道探索 (Trail Discovery)** 與**專業戶外裝備電商 (E-commerce)**。本系統旨在解決戶外愛好者在尋找路線與購買對應裝備時的資訊碎片化問題。

本專案採用**前後端分離 (Decoupled Architecture)** 架構，前端由 React (Lovable) 驅動，提供極致的流暢體驗；後端則基於 Laravel 11 (Vuexy Admin) 打造強大的數據管理中樞。

---

## ✨ 核心技術亮點 (Technical Highlights)

### 🌍 1. 全方位多語言支援 (Full I18n Integration)
* **嵌套 JSON 結構**：資料庫欄位（如 `name`, `description`）採用 `{ "en": "...", "zh": "..." }` 格式，實現無縫切換語言且不影響系統效能。
* **持久化存儲**：使用 `i18next` 結合 `localStorage`，確保用戶選取的語言偏好在刷新頁面後依然保留。

### 👟 2. 動態產品規格引擎 (Dynamic Product Engine)
* **混合式數據設計**：利用 **MySQL JSON 欄位** 儲存非固定規格（如鞋子的尺碼陣列、背包的容量公升、衣服的材質）。
* **智能渲染**：前端 UI 會根據產品類別 (Category) 自動切換互動組件（例如：鞋子顯示尺碼選取按鈕，背包顯示規格清單）。

### 📸 3. 圖像優化與處理 (Advanced Image Handling)
* **前端預處理**：利用 **HTML Canvas API** 在上傳前進行圖片縮圖與壓縮，減少伺服器負擔。
* **多格式兼容**：全面支援 **WebP, JPG, PNG**，優化網頁載入速度（Lighthouse Score 提升）。

---

## 🛠 技術棧 (Tech Stack)

| 層級 | 技術選型 | 說明 |
| :--- | :--- | :--- |
| **Frontend** | React 18, Tailwind CSS, Shadcn UI | 現代化響應式介面與組件庫 |
| **Backend** | Laravel 11 (Vuexy Template) | 企業級 PHP 框架，提供 RESTful API |
| **Database** | MySQL 8.0+ | 使用 **JSON Data Type** 處理半結構化數據 |
| **Auth** | Laravel Sanctum | 安全的 API 令牌驗證機制 |
| **I18n** | i18next | 國際化多語言切換方案 |

---

## 📊 資料庫設計思維 (Database Architecture)

我們在 MySQL 中採用了「關係型 + 文檔型」的混合設計，以應對電商產品的多變屬性：

```sql
-- 產品表核心結構範例
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    price DECIMAL(10, 2),
    name JSON,          -- 儲存 {"en": "Hiking Boots", "zh": "登山靴"}
    specs JSON,         -- 儲存 {"sizes": [40, 41, 42], "material": "Gore-Tex"}
    images JSON,        -- 儲存 ["img1.webp", "img2.webp"]
    created_at TIMESTAMP
);
🚀 快速啟動 (Getting Started)
前端環境 (Frontend - Lovable/React)
進入前端目錄：cd frontend

安裝依賴：npm install

啟動開發伺服器：npm run dev

後端環境 (Backend - Vuexy/Laravel)
進入後端目錄：cd backend

安裝 Composer 依賴：composer install

設定 .env 檔案並建立資料庫。

執行遷移：php artisan migrate --seed

啟動伺服器：php artisan serve

📸 介面預覽 (Screenshots)
(建議在此處加入你的產品詳情頁、管理後台 Dashboard 的截圖，這對評分非常有幫助)

👨‍💻 開發者 (Author)
Kenny Choi - Initial Work & Architecture Design - GitHub Profile


---

### 🧐 為什麼要這樣修改 README？

1.  **專門針對評審**：評審老師通常會看 `README.md` 來判斷學生的技術含量。強調 **MySQL JSON** 和 **Canvas API** 會讓他們覺得你已經具備業界初級工程師的水準。
2.  **架構清晰**：分層列出技術棧（Frontend/Backend/Database）顯示你有清晰的系統思維。
3.  **解決量詞問題的記錄**：你在 README 裡記錄了「動態規格引擎」，這證明了你對產品邏輯有深入思考，而不只是搬運代碼。
