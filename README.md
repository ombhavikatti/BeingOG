<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=48&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=BeingOG" alt="BeingOG" />

### ⚡ Level up. Stay OG.

**The all-in-one productivity, accountability, and AI-coaching platform for students who refuse to be average.**

<br />

![Status](https://img.shields.io/badge/status-in%20development-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<br />

[**🌐 Live Demo**](#) &nbsp;·&nbsp; [**📖 Documentation**](#) &nbsp;·&nbsp; [**🐛 Report Bug**](#) &nbsp;·&nbsp; [**✨ Request Feature**](#)

</div>

<br />

---

## 🌟 What is BeingOG?

**BeingOG** is a premium productivity ecosystem — built for engineering students, competitive-exam aspirants, and placement-focused learners who want more than a to-do app.

It combines habit tracking, study analytics, real-time social accountability, AI coaching, and placement readiness into a single, beautiful, gamified platform.

> ### The Problem
> Students struggle to build consistency. They lack accountability, lose motivation, waste hours, and have no way to measure whether they're actually placement-ready. Existing apps solve *one* of these problems. None solve all of them.

> ### The Solution
> **BeingOG** brings productivity, social accountability, and AI-driven coaching into one polished, gamified experience — so students stop drifting and start compounding.

<br />

---

## ✨ Core Features

<table>
  <tr>
    <td width="50%" valign="top">

### 🎯 Productivity & Habits
- Habit & goal tracking (daily / weekly / monthly / yearly)
- Pomodoro timer with focus mode
- Custom trackers (study, code, workout, meditation)
- Streaks, XP, levels, and achievements
- Beautiful analytics, heatmaps, and reports

    </td>
    <td width="50%" valign="top">

### 👥 Social & Accountability
- Friends, followers, and study partners
- Live "study together" rooms
- Group challenges & leaderboards
- Real-time chat with voice & video calls
- Activity feed and progress comparisons

    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">

### 🧠 AI Coaching
- Personal AI mentor for guidance
- Weekly AI-generated performance reports
- Placement readiness score & roadmap
- Weakness detection and recommendations
- Auto-generated study plans

    </td>
    <td width="50%" valign="top">

### 🎓 Placement Dashboard
- DSA tracker (LeetCode-style progress)
- Resume tracker with AI feedback
- Mock-interview logs
- Company-specific preparation
- Project & skill portfolio

    </td>
  </tr>
</table>

<br />

---

## 🎨 Design Philosophy

BeingOG is designed to feel like a **funded startup product**, not a college assignment. Every screen is built around four principles:

| Principle | What it means |
| :--- | :--- |
| **Premium** | Elegant typography, generous spacing, thoughtful gradients |
| **Fast** | Skeleton loaders, optimistic UI, edge-cached data |
| **Delightful** | Micro-animations, gamified feedback, satisfying transitions |
| **Accessible** | Full keyboard navigation, ARIA-compliant, dark/light themes |

<br />

---

## 🛠️ Tech Stack

<div align="center">

**Modern. Scalable. Production-grade.**

</div>

<br />

### 🖥️ Frontend
`Next.js 15` &nbsp;·&nbsp; `React 19` &nbsp;·&nbsp; `TypeScript 5` &nbsp;·&nbsp; `Tailwind CSS` &nbsp;·&nbsp; `shadcn/ui` &nbsp;·&nbsp; `Framer Motion` &nbsp;·&nbsp; `TanStack Query` &nbsp;·&nbsp; `Zustand` &nbsp;·&nbsp; `React Hook Form` &nbsp;·&nbsp; `Zod` &nbsp;·&nbsp; `Recharts`

### ⚙️ Backend
`Node.js` &nbsp;·&nbsp; `NestJS 11` &nbsp;·&nbsp; `REST APIs` &nbsp;·&nbsp; `WebSockets (Socket.IO)` &nbsp;·&nbsp; `WebRTC` &nbsp;·&nbsp; `JWT + Refresh Tokens` &nbsp;·&nbsp; `OAuth (Google, GitHub)`

### 🗄️ Data Layer
`PostgreSQL 17 (Neon)` &nbsp;·&nbsp; `Prisma ORM` &nbsp;·&nbsp; `Redis (Upstash)` &nbsp;·&nbsp; `Cloudinary` &nbsp;·&nbsp; `S3-ready architecture`

### 🤖 AI Service
`Python 3.12` &nbsp;·&nbsp; `FastAPI` &nbsp;·&nbsp; `LLM integration` &nbsp;·&nbsp; `Vector embeddings` &nbsp;·&nbsp; `LangChain`

### 🚀 DevOps
`Docker` &nbsp;·&nbsp; `GitHub Actions (CI/CD)` &nbsp;·&nbsp; `Vercel (frontend)` &nbsp;·&nbsp; `Railway (backend + AI)` &nbsp;·&nbsp; `pnpm workspaces` &nbsp;·&nbsp; `Turborepo`

<br />

---
## 🏗️ Architecture

BeingOG follows a **polyglot microservices architecture** — three independently deployable services communicating over HTTP and WebSockets.

```mermaid
flowchart TD
    U([👤 Users])

    subgraph Frontend["🖥️ Frontend Layer"]
        WEB[Next.js 15 App<br/>Deployed on Vercel]
    end

    subgraph Backend["⚙️ Backend Services"]
        API[NestJS API<br/>REST + WebSockets]
        AI[FastAPI AI Service<br/>LLM + Analytics]
    end

    subgraph Data["🗄️ Data Layer"]
        PG[(PostgreSQL<br/>Neon)]
        RD[(Redis<br/>Upstash)]
        CL[Cloudinary<br/>Media Storage]
    end

    subgraph External["🌐 External"]
        LLM[LLM APIs<br/>OpenAI / Claude]
    end

    U --> WEB
    WEB -->|REST + WS| API
    WEB -->|REST| AI
    API --> PG
    API --> RD
    API --> CL
    AI --> LLM
    AI --> PG

    classDef frontend fill:#000000,stroke:#6366F1,stroke-width:2px,color:#fff
    classDef backend fill:#E0234E,stroke:#fff,stroke-width:2px,color:#fff
    classDef data fill:#4169E1,stroke:#fff,stroke-width:2px,color:#fff
    classDef external fill:#10B981,stroke:#fff,stroke-width:2px,color:#fff
    class WEB frontend
    class API,AI backend
    class PG,RD,CL data
    class LLM external


<br />

---

## 📂 Project Structure
<pre>
<b>BeingOG/</b>
│
├── <b>apps/</b>                     <i># All runnable applications</i>
│   ├── web/                  <i># Next.js frontend  → Vercel</i>
│   ├── api/                  <i># NestJS backend    → Railway</i>
│   └── ai/                   <i># FastAPI AI service → Railway</i>
│
├── <b>packages/</b>                 <i># Shared code between apps</i>
│   ├── ui/                   <i># Reusable React components</i>
│   ├── types/                <i># Shared TypeScript types</i>
│   ├── config/               <i># Shared ESLint / TS / Tailwind configs</i>
│   └── utils/                <i># Shared utility functions</i>
│
├── <b>docs/</b>                     <i># Architecture &amp; feature docs</i>
├── <b>.github/</b>
│   └── workflows/            <i># CI/CD pipelines</i>
│
├── .gitignore
├── pnpm-workspace.yaml       <i># Monorepo definition</i>
├── turbo.json                <i># Turborepo config</i>
└── README.md
</pre>

<br />

---

## 🗺️ Roadmap

- [x] **Phase 0** — Development environment setup
- [x] **Phase 1** — Monorepo + Git foundation
- [ ] **Phase 2** — Design system + landing page
- [ ] **Phase 3** — Backend + database schema
- [ ] **Phase 4** — Authentication (Email, Google, GitHub)
- [ ] **Phase 5** — Core productivity modules
- [ ] **Phase 6** — Social layer + real-time chat
- [ ] **Phase 7** — Voice / video calls + notifications
- [ ] **Phase 8** — AI coaching service
- [ ] **Phase 9** — Analytics + placement dashboard
- [ ] **Phase 10** — Admin panel + security hardening
- [ ] **Phase 11** — Docker + CI/CD + deployment
- [ ] **Phase 12** — Public launch 🚀

<br />

---

## 🚀 Getting Started

> **Note:** BeingOG is currently in active development. Full setup instructions will be published as each phase is completed.

### Prerequisites

- Node.js `≥ 20`
- pnpm `≥ 9`
- Python `≥ 3.12`
- A [Neon](https://neon.tech) account (PostgreSQL)
- An [Upstash](https://upstash.com) account (Redis)

### Local Setup (coming soon)

```bash
git clone https://github.com/ombhavikatti/BeingOG.git
cd BeingOG
pnpm install
pnpm dev

<br />

🤝 Contributing
BeingOG is currently a solo build, but contributions, ideas, and feedback are welcome once we reach v1.0.

<br />
📜 License
Distributed under the MIT License. See LICENSE for details.

<br />
<div align="center">
Built with obsession by Om Bhavikatti
"You don't rise to the level of your goals. You fall to the level of your systems."

<br />
⭐ If this project inspires you, star the repo — it fuels the grind.

</div> 