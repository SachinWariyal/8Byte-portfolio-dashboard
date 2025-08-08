# 📈 Dynamic Portfolio Dashboard

A modern, real-time dashboard to visualize your stock portfolio with live price updates, sector grouping, performance analysis, and earnings metrics. Built with **React + TypeScript + Tailwind CSS** for the frontend and **Node.js + Express** for the backend.

---

## 🚀 Features

- 🔄 Real-time stock price updates (15s interval)
- 📊 Portfolio performance calculation (gain/loss, returns)
- 🏢 Sector-based grouping
- 💰 Live P/E ratio and earnings per share (EPS)
- 🧮 Total investment and total current value
- 💡 Clean, modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer        | Tech                                |
| ------------ | ----------------------------------- |
| Frontend     | React, TypeScript, Tailwind CSS     |
| Backend      | Node.js, Express                    |
| API Provider | Yahoo Finance (via unofficial API)  |

---

## 📁 Folder Structure

```
portfolio-dashboard/
├── backend/               # Express API server
│   ├── index.js
│   └── package.json
├── frontend/              # React + TS + Tailwind app
│   ├── src/
│   │   ├── App.tsx
│   │   ├── types.ts
│   │   └── Components/
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

---

## ⚙️ Backend Setup (Node.js + Express)

> 📍 Location: `./backend`

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Start backend server

```bash
npm run dev
```

> The server will run on `http://localhost:4000`

---

## 🎨 Frontend Setup (React + TypeScript + Tailwind)

> 📍 Location: `./frontend`

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start frontend dev server

```bash
npm run dev
```

> The app will run on `http://localhost:5173`

---

## 🔗 Backend API Reference

### `POST /api/data`

Fetch live price, P/E ratio, and earnings for a list of stocks.

#### Request Body:

```json
{
  "tickers": [
    { "symbol": "TCS.NS", "purchasePrice": 3000, "qty": 20, "sector": "Technology" },
    { "symbol": "RELIANCE.NS", "purchasePrice": 2500, "qty": 50, "sector": "Energy" }
  ]
}
```

#### Response:

```json
[
  {
    "symbol": "TCS.NS",
    "currentPrice": 3800,
    "purchasePrice": 3000,
    "qty": 20,
    "sector": "Technology",
    "peRatio": 27.2,
    "earnings": 140.0
  }
]
```

---

## 📸 Screenshot

---

## 📌 Notes

- You can add more stocks in `App.tsx` inside the `initial` array.
- The live data source is unofficial Yahoo Finance API. For production apps, consider a licensed financial data provider.

---

## 👨‍💻 Author

Made with ❤️ by Sachin Wariyal

---

## 📃 License
