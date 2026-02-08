# UI Refactor: Ant Design Vue → Nuxt UI

## Overview

將台灣路跑賽事查詢網站從 Ant Design Vue + Nuxt 3 rc.10 重構為 Nuxt UI + Nuxt 3 最新版，同時整理程式碼架構。維持單頁結構不變。

## Step 1: 升級 Nuxt 3 + 安裝 Nuxt UI

- 升級 `nuxt` 到最新穩定版 (3.15+)
- 安裝 `@nuxt/ui`（內含 Tailwind CSS v4，移除舊的 tailwindcss 設定）
- 移除 `ant-design-vue`、`@ant-design/icons-vue`
- 移除 `lodash` / `@types/lodash`（僅用到 `_.first()`，改用 `[0]`）
- 更新 `nuxt.config.ts`：移除 antd css、加入 `@nuxt/ui` module
- 移除 `postcss.config.js`、`tailwind.config.js`（Nuxt UI 內建處理）

### nuxt.config.ts 目標結構

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
})
```

## Step 2: 全部元件改為 `<script setup lang="ts">`

將所有 `defineComponent` + Options API 改為 `<script setup>` 語法，利用 Nuxt auto-import 移除手動 import。

### 範例：header.vue

```vue
<script setup lang="ts">
function toIndex() {
  window.location.href = '/'
}
</script>
```

## Step 3: 元件替換對照

### 3.1 Header (`components/header.vue`)

- 移除 inline style，改用 Nuxt UI 的主題色系
- 用 `UButton` variant="ghost" 做首頁連結

### 3.2 Input (`components/search/input.vue`)

```
a-input → UInput
```

- `v-model:value` → `v-model`
- placeholder 保留

### 3.3 Checkbox (`components/search/checkbox.vue`)

```
a-checkbox-group → UCheckboxGroup
```

- options 格式需調整為 Nuxt UI 格式：`{ label, value }` → `{ label, value }`（相容）

### 3.4 DatePicker (`components/search/date-picker.vue`)

Nuxt UI 無內建 Range DatePicker，方案：

- **選項 A**：使用 `v-calendar` 套件的 DatePicker（推薦，Nuxt UI 官方建議）
- **選項 B**：兩個 UInput type="date" 分別選起迄日

採用選項 A，安裝 `v-calendar@next`。

### 3.5 SearchButton (`components/search/search-button.vue`)

```
a-button + SearchOutlined → UButton icon="i-heroicons-magnifying-glass"
```

- loading 狀態：`<UButton :loading="store.isApiLoading">`
- 移除 `@ant-design/icons-vue`，改用 Nuxt UI 內建 heroicons

### 3.6 Table (`components/search/table.vue`)

```
a-table → UTable
```

- columns 格式調整：`{ title, dataIndex, key }` → `{ key, label }`
- 距離標籤：`a-tag` → `UBadge`
- 「更多」按鈕：`a-button` → `UButton`
- 分頁需自行實作（用 `UPagination` 搭配 computed 分頁資料）
- responsive 欄位隱藏改用 CSS class

### 3.7 Modal (`components/search/modal.vue`)

```
a-modal → UModal
```

- `v-model:visible` → `v-model:open`
- footer 用 UButton
- 距離標籤：`a-tag` → `UBadge`
- 內部表格保留原生 HTML table + Tailwind 樣式

### 3.8 Footer (`components/footer.vue`)

- 純 HTML + Tailwind，不需要改動，僅更新文案

## Step 4: Store 簡化 (`store/main.ts`)

- 移除 `import _ from 'lodash'`，`_.first(state.onlyRegistering)` → `state.onlyRegistering[0]`
- 其餘 Pinia store 邏輯保持不變

## Step 5: app.vue 簡化

```vue
<template>
  <UApp>
    <Header />
    <SearchBar />
    <Footer />
  </UApp>
</template>

<script setup lang="ts">
useHead({
  title: '台灣路跑賽事查詢',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: '簡易查詢近期台灣路跑賽事。' },
    { property: 'og:title', content: '台灣路跑賽事查詢' },
    { property: 'og:description', content: '簡易查詢近期台灣路跑賽事。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh-tw' },
  ],
})
</script>
```

- 用 `UApp` 包裹（Nuxt UI 要求的根元件）
- 移除手動 import，靠 Nuxt auto-import
- 移除 `defineComponent`，改用 `<script setup>`

## 實作順序

1. 升級 Nuxt 3 + 安裝 Nuxt UI + 移除舊依賴
2. 更新 `nuxt.config.ts`
3. 更新 `app.vue`
4. 依序替換元件：header → input → checkbox → search-button → date-picker → table → modal
5. 簡化 store
6. 移除未使用的檔案和樣式
7. 測試全部功能

## 不在範圍內

- 新增頁面路由
- 改變 API 呼叫邏輯
- 改變搜尋功能邏輯
- 新增功能
