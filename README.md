## ProjectLoop (Institutional Intelligence Platform)
> *"From Student Projects to an Evolving Institutional Intelligence"*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary

Every semester across university engineering departments, students embark on ambitious capstone and hackathon projects. They encounter hard-learned roadblocks: hardware communication timeouts, database concurrency deadlocks, flawed schema designs, and incompatible library versions. 

When the semester ends, **that hard-won knowledge is lost**. Future cohorts repeatedly reinvent the wheel, run into the exact same dead ends, and waste hundreds of hours of trial-and-error.

**ProjectLoop** breaks this cycle of institutional amnesia. It is an evolving institutional intelligence engine that captures the complete student engineering journey—converting code repositories, design documents, and failure postmortems into structured **"Project DNA"**. When future students begin new initiatives, ProjectLoop uses this historical memory to recommend proven stacks, warn against documented dead ends, and guide seamless project evolution.

---

## 🔁 The Institutional Loop

```
  ┌──────────────┐       ┌──────────────┐
  │   1. BUILD   │ ────> │   2. FAIL    │
  │ New Projects │       │ Roadblocks   │
  └──────────────┘       └──────────────┘
         ▲                      │
         │                      ▼
  ┌──────────────┐       ┌──────────────┐
  │  4. EVOLVE   │ <──── │   3. LEARN   │
  │ Fork & Mutate│       │  DNA Memory  │
  └──────────────┘       └──────────────┘
```

1. **BUILD**: Student teams register projects, defining domain boundaries, problem statements, and initial architecture layers.
2. **FAIL**: Teams document blockers, numbered attempts, and root causes without fear of grade penalties.
3. **LEARN**: ProjectLoop synthesizes trial logs into verified solutions, updating institutional failure patterns.
4. **EVOLVE**: Subsequent cohorts inherit verified modules, build on proven DNA, and branch new generational versions.

---

## ✨ Core Feature Highlights

### 🧬 1. Project DNA Explorer
Analyzes projects across multiple genetic dimensions:
- **Technology DNA**: Languages, frameworks, protocols, and hardware pinouts.
- **Architecture DNA**: Multi-tier layer topology, data flow diagrams, and latency critical paths.
- **Component DNA**: Isolated reusable hardware drivers, microservices, and client libraries.
- **Decision DNA**: Recorded engineering trade-offs (e.g. why MQTT was selected over HTTP, or DynamoDB over SQLite).
- **Risk DNA**: Quantified risk levels and failure susceptibility metrics.

### 🛑 2. Failure Memory System
A persistent knowledge base documenting real roadblocks:
- Chronological attempt history with evidence links and postmortem takeaways.
- Verified solutions validated by peer cohorts or faculty reviewers.
- Global cross-domain risk pattern alerts (e.g., ESP32 camera buffer overflow, LoRa duty-cycle collisions).

### 🧪 3. What-If Architecture Simulator
An interactive sandbox allowing students to test architectural modifications before writing code:
- Preview ripple effects of swapping core technologies (e.g., swapping PostgreSQL for DynamoDB).
- Assess compatibility risks against historical failure records across past cohorts.
- View automated mitigation checklists and verified alternative solutions.

### 🌳 4. Project Evolution Tree
Visualizes inter-generational lineage:
- Maps parent-to-child relationships across academic years.
- Tracks generational mutations, added features, and deprecation logs.
- Enables one-click evolutionary forking for new student teams.

### 🤖 5. Grounded Institutional AI Co-Pilot
Context-aware conversational assistant grounded in institutional project records:
- Provides verified answers backed by clickable citations to historical projects and failure cases.
- Recommends optimal hardware sensors, isolated power rails, and backend queues.
- Highlights known student pitfalls before code implementation begins.

### 📊 6. Institutional Intelligence Analytics & ROI
Executive visibility for academic departments and faculty:
- **Student-Hours Saved**: Quantifies engineering hours saved by avoiding documented failures.
- **Modularity & Reusability Index**: Tracks the growth of shareable software and hardware modules.
- **Technology Lifecycle**: Monitors emerging, stable, and deprecated libraries across courses.

---

## 🏗️ Architecture & Project Structure

The project is built on Next.js 16 with Turbopack, React 19, TypeScript, and Tailwind CSS v4.

```text
projectloop/
├── public/                     # Static vector assets, logos, and favicon
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/              # Authenticated application shell
│   │   │   ├── analytics/      # Institutional velocity & ROI analytics
│   │   │   ├── assistant/      # Grounded institutional AI assistant
│   │   │   ├── dashboard/      # Executive KPI overview & risk feeds
│   │   │   ├── evolution/      # Generational project ancestry tree
│   │   │   ├── failures/       # Failure memory repository & attempts
│   │   │   ├── project-dna/    # Interactive DNA inspector
│   │   │   ├── projects/       # Project catalog, new form, and detail view
│   │   │   │   ├── [id]/       # Deep project detail (Overview, DNA, Failures)
│   │   │   │   └── new/        # Project submission & tag builder
│   │   │   ├── search/         # Semantic project & failure search
│   │   │   ├── settings/       # DNA sensitivity & privacy controls
│   │   │   ├── users/          # Member directory, roles & karma
│   │   │   └── what-if/        # What-If architectural simulator
│   │   ├── api/                # RESTful backend API routes
│   │   │   ├── analytics/      # GET institutional metrics & ROI stats
│   │   │   ├── dna/            # GET / POST DNA extraction endpoints
│   │   │   ├── failures/       # GET / POST failure memory & attempts
│   │   │   ├── projects/       # GET / POST project lifecycle endpoints
│   │   │   └── simulator/      # POST What-If architecture impact tests
│   │   ├── login/              # Authentication & demo role access
│   │   ├── globals.css         # Design tokens, variables & animations
│   │   ├── layout.tsx          # Root HTML layout with font imports
│   │   └── page.tsx            # High-impact landing page
│   ├── components/             # Reusable UI components
│   │   └── Sidebar.tsx         # Responsive collapsible sidebar navigation
│   ├── services/               # Backend business logic services
│   │   ├── dna.service.ts      # Automated DNA synthesis & extraction
│   │   ├── failures.service.ts # Failure memory & resolution tracking
│   │   ├── projects.service.ts # Project filtering, CRUD & similarity engine
│   │   └── simulator.service.ts# Architectural ripple-effect evaluation
│   └── lib/                    # Shared utilities & state
│       ├── auth-context.tsx    # Client auth context with role switcher
│       ├── demo-data.ts        # Seed institutional knowledge base
│       ├── types.ts            # Core TypeScript schemas & models
│       └── utils.ts            # Formatting, styling & badge helpers
├── next.config.ts              # Next.js compilation config
├── package.json                # Project dependencies & scripts
├── postcss.config.mjs          # PostCSS with Tailwind v4
├── tsconfig.json               # TypeScript path aliases & strict rules
└── README.md                   # Project documentation
```

---

## 🔌 Backend REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Query all projects (supports `?domain=` filter) |
| `POST` | `/api/projects` | Submit and register a new student project |
| `GET` | `/api/dna` | Retrieve institutional DNA records (supports `?projectId=`) |
| `POST` | `/api/dna` | Trigger automated DNA extraction for a project |
| `GET` | `/api/failures` | Retrieve documented failure cases and resolution evidence |
| `POST` | `/api/failures` | Log a new trial attempt or register a working solution |
| `POST` | `/api/simulator` | Simulate component swap and calculate ripple effects |
| `GET` | `/api/analytics` | Retrieve institutional velocity, hours saved, and resolution rates |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NandaKumar876/project-loop.git
cd project-loop

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

### Production Build

```bash
# Build production bundle with type checking
npm run build

# Start production server
npm start
```

---

## 👥 Demo Roles & Quick Access

For demonstration and testing purposes, quick login presets are available on the `/login` screen:

| Role | Name | Permissions |
|---|---|---|
| **Student** | Arjun Mehta | Create projects, log failures, run simulations, query AI assistant |
| **Faculty** | Dr. Raghav Iyer | Verify failure solutions, review DNA graphs, view institutional analytics |
| **Admin** | Admin User | Manage member roles, configure extraction sensitivity, GitHub webhooks |

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
