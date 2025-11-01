# Movie App Monorepo

Monorepo chứa **backend (NestJS)** và **frontend (React + Shadcn UI)** để quản lý phim, CRUD và stream video.

---

## 📂 Cấu trúc thư mục

movie-app/
├── backend/ # NestJS backend
│ ├── src/ # Source code backend
│ ├── uploads/ # Video upload (không commit)
│ ├── dist/ # Build output (ignore)
│ ├── package.json
│ └── ...
├── frontend/ # React frontend với Tailwind + Shadcn UI
│ ├── src/ # Source code frontend
│ ├── dist/ # Build output (ignore)
│ ├── package.json
│ └── ...
└── README.md


---

## ⚡ Yêu cầu

- Node.js >= 18
- npm hoặc yarn
- MongoDB (local hoặc cloud)
- ffmpeg (nếu cần xử lý video)

---

## 🛠️ Backend (NestJS)

1. Cài dependencies:

```bash
cd backend
npm install
```

2. Tạo file .env:

MONGO_URI=uri
PORT=3000

3. Chạy backend

```bash
npm run start:dev
```

## 🛠️ Frontend (React + Shadcn UI)

1. Cài dependencies:
```bash
cd ../frontend
npm install
```

2. Chạy frontend:
```bash
npm run dev
```

