# [TW-MARATHON-WEBSITE](https://marathontw-web.bibiota.com/)

![nuxt](https://img.shields.io/badge/nuxt-4.3.1-blue)
![tailwindcss](https://img.shields.io/badge/tailwindcss-v4-blue)
![nuxt-ui](https://img.shields.io/badge/nuxt--ui-v4.4-blue)
![pinia](https://img.shields.io/badge/pinia-3-blue)

台灣路跑賽事查詢網站，每日自動更新賽事資料。

- [API 文件](https://marathontw.bibiota.com/api)
- [後端 API 服務 Repository](https://github.com/BIBIOTA/tw-marathon-api/)

## Features

- **關鍵字搜尋** - 依賽事名稱、地點等搜尋
- **距離篩選** - 全馬 / 半馬 / 10 公里
- **日期區間篩選** - 指定日期範圍查詢
- **僅顯示開放報名** - 篩選報名中的賽事
- **URL 查詢參數** - 搜尋條件可透過 URL 分享
- **響應式設計** - 支援手機、平板、桌面裝置
- **賽事詳情彈窗** - 檢視完整賽事資訊與報名連結

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) + Vue 3 (Composition API)
- **UI**: [Nuxt UI v4](https://ui.nuxt.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Pinia 3](https://pinia.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Calendar**: [v-calendar](https://vcalendar.io/)

## Project Structure

```
├── apis/                    # API 呼叫層
│   └── events.ts
├── assets/css/              # 樣式檔
│   └── main.css
├── components/
│   ├── header.vue           # 頁首
│   ├── footer.vue           # 頁尾
│   └── search/              # 搜尋相關元件
│       ├── searchbar.vue    # 主搜尋區塊
│       ├── table.vue        # 賽事列表
│       ├── modal.vue        # 賽事詳情彈窗
│       ├── date-picker.vue  # 日期範圍選擇
│       ├── button.vue       # 搜尋按鈕
│       ├── checkbox.vue     # 勾選框群組
│       └── input.vue        # 關鍵字輸入
├── dtos/                    # 資料傳輸物件
├── enum/                    # 列舉定義
├── libs/                    # 工具函式
│   ├── event-helper.ts      # 賽事資料轉換
│   └── url.ts               # URL 查詢參數處理
├── store/
│   └── main.ts              # Pinia 狀態管理
├── app.vue                  # 應用程式進入點 (SPA)
└── nuxt.config.ts           # Nuxt 設定
```

## Getting Started

### Requirements

- Node.js (LTS)
- pnpm

### Installation

```bash
npm install -g pnpm
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Contributing

如有功能上的建議或 bug，可在 [Issue](https://github.com/BIBIOTA/tw-marathon-website/issues) 提供資訊。

## Code Owner

[yukiotataitien@gmail.com](mailto:yukiotataitien@gmail.com)

## License

[MIT licensed](LICENSE).
