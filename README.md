# 🛒 BazarDor (বাজার দর)

> A modern, responsive, and full-stack web application designed to help consumers track daily commodity market prices, explore category-wise price rates, monitor real-time market updates, and securely manage user accounts.

---

## 🚀 Live Demo
🌐 **Live Application:** [https://bazar-dor-eta.vercel.app](https://bazar-dor-eta.vercel.app)

---

## 📋 Table of Contents
- [About The Project](#-about-the-project)
- [Technologies Used](#️-technologies-used)
- [Key Features](#-key-features)
- [Project Architecture & Structure](#-project-architecture--structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## 📌 About The Project
**BazarDor** was created to simplify daily grocery shopping in Bangladesh by bringing transparency to essential commodity prices. It empowers users with up-to-date market rates, category-based filtering, price fluctuations, and a seamless user experience. Built with a modern full-stack architecture, it includes complete user authentication and personal account management.

---

## 🛠️ Technologies Used
This project is engineered using a robust and modern tech stack:
* **Framework:** Next.js (App Router, Server & Client Components)
* **Language:** TypeScript, React
* **Styling & UI:** Tailwind CSS, DaisyUI
* **Authentication:** BetterAuth (Email/Password, Google & GitHub OAuth)
* **Database & ORM:** MongoDB & Mongoose
* **Deployment & Hosting:** Vercel

---

## ✨ Key Features
1. **Dynamic Market Prices & Category Filtering:** Effortlessly browse and filter current market rates for various essential categories such as Rice, Lentils, Oil, Vegetables, Fish, Meat, and more.
2. **Secure Authentication System:** Complete authentication workflow using BetterAuth, featuring email/password sign-in alongside seamless Google and GitHub OAuth integrations.
3. **Real-time Price Ticker:** An interactive price ticker on the homepage showcasing real-time market trends, fluctuations, and percentage changes for daily commodities.
4. **User Profile Management:** Dedicated user profile page with navigation to a separate update route (`/profile/update`), allowing users to update their profile information using `authClient.updateUser`.
5. **Responsive & Modern UI/UX:** Fully responsive layout tailored for smartphones, tablets, and desktop displays with smooth interactions.

---

## 📂 Project Structure
```text
bazar-dor/
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── profile/          # User Profile & Update routes
│   │   └── update/       # Profile Update form route
│   ├── api/              # Backend API endpoints (Auth & Market Data)
│   └── layout.tsx        # Root layout with context providers
├── components/           # Reusable UI components (Navbar, Ticker, Cards)
├── lib/                  # Utility functions & BetterAuth client configuration
├── models/               # Database schemas & models
├── public/               # Static assets & graphics
└── package.json          # Project metadata & dependencies
```

---

## ⚙️ Getting Started & Local Setup

To run this application locally on your system, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the necessary environment variables:
```env
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📄 License
This project is created for educational and assignment evaluation purposes.
