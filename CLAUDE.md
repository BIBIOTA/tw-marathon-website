# CLAUDE.md

## Project Overview

台灣路跑賽事查詢網站 (Taiwan Marathon Event Search)。Single-page application，所有內容在 `app.vue`，無 `pages/` 目錄。

## Tech Stack

- Nuxt 4.3.1 + Vue 3 (Composition API)
- Nuxt UI v4.4
- Tailwind CSS v4
- Pinia 3
- Axios
- dayjs, v-calendar

## Architecture

### Single Page App

- 進入點: `app.vue` → 包含 Header、SearchSearchbar、Footer
- 無路由，所有邏輯在 `components/search/searchbar.vue`

### Component Naming (Auto-Import)

Nuxt 4 根據目錄路徑 + 檔名自動生成元件名稱：
- `components/search/searchbar.vue` → `<SearchSearchbar>`
- `components/search/table.vue` → `<SearchTable>`
- `components/header.vue` → `<Header>`

### State Management

- Store 在 `store/main.ts`，透過 `imports: { dirs: ['store'] }` 自動匯入
- 使用 `useMainStore()` 存取
- Store 管理：搜尋條件、賽事資料、載入狀態、彈窗狀態

### API

- 單一端點: `https://marathontw.bibiota.com/events`
- API 層在 `apis/events.ts`
- 參數: keywords, distances, dateRange, onlyRegistering

### Data Flow

1. 頁面載入 → 讀取 URL query → 設定 store → 呼叫 API
2. 使用者搜尋 → 更新 store → 更新 URL query → 呼叫 API → 更新賽事列表
3. 點擊賽事 → 開啟 modal 顯示詳情

## CSS Setup (Critical)

`assets/css/main.css` 必須包含：
```css
@import "tailwindcss";
@import "@nuxt/ui";
```
並在 `nuxt.config.ts` 設定 `css: ['~/assets/css/main.css']`。缺少這步 Tailwind 不會生效。

## Commands

```bash
pnpm dev       # 開發伺服器
pnpm build     # 建置
pnpm preview   # 預覽建置結果
pnpm generate  # 靜態生成
```

## Key Files

| 檔案 | 用途 |
|------|------|
| `store/main.ts` | 全域狀態 (搜尋條件、賽事、UI 狀態) |
| `apis/events.ts` | API 呼叫 |
| `libs/event-helper.ts` | 賽事資料轉換、距離顏色對應 |
| `libs/url.ts` | URL query 參數讀寫 |
| `dtos/` | TypeScript 型別定義 |
| `enum/` | 列舉 (賽事狀態、認證、訊息類型) |

## Distance Color Mapping

- < 21K → green (success)
- 21K-41K → orange (warning)
- 42K-44K → purple (secondary)
- ≥ 45K → magenta (error)
- 複合距離 → gold (warning)
