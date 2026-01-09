# Local Guide Frontend

A modern, responsive frontend for the Local Guide platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

| Role          | Capabilities                                                   |
| ------------- | -------------------------------------------------------------- |
| **Tourists**  | Search tours, view guides, manage bookings, personal dashboard |
| **Guides**    | Manage tours, track bookings, update profiles                  |
| **Admin**     | User statistics, guide verification, analytics                 |
| **All Users** | Responsive UI, dark mode, advanced search & filtering          |

---

## 🛠 Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State Management:** React Hooks
- **HTTP:** Fetch API / Axios
- **Validation:** Zod
- **Icons:** Lucide-react
- **Version Control:** Git & GitHub

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/local-guide-frontend.git
cd local-guide-frontend
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
local-guide-frontend/
├── app/              # Next.js pages & layouts
├── components/       # Reusable UI components
├── services/         # API functions
├── interfaces/       # TypeScript types
├── public/           # Assets
└── styles/           # Global styles
```

---

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint check
npm run format   # Code formatting
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/name`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/name`
5. Open a Pull Request

---

## 📄 License

MIT License — Developed with ❤️
