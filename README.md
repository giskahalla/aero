# Aero — High-Performance Agile Workspace & AI Copilot

Aero is a minimalist, enterprise-grade B2B SaaS platform engineered for modern agile development teams. It unifies data-heavy productivity analytics, a synchronized multi-view sprint workspace (Kanban + Calendar), and a context-aware AI Copilot into a friction-free project management experience.

Built with a focus on high information density, strict type safety, and optimized client-server state coordination.

---

## 🏛️ Architecture & Tech Stack

Aero is architected as a highly modular frontend application leveraging Next.js Route Handlers to orchestrate serverless operations.

*   **Framework:** Next.js 14 (App Router) & TypeScript
*   **Styling & UI:** Tailwind CSS, shadcn/ui, Radix UI Primitives, Lucide Icons
*   **Server State & Caching:** TanStack Query (React Query) v5
*   **Client UI State:** Zustand (Lightweight, centralized store)
*   **Database & Driver:** MongoDB Atlas (NoSQL) & Mongoose
*   **Forms & Validation:** React Hook Form
*   **Data Visualization:** Recharts (SVG-based responsive charts)

---

## ✨ Key Features & Engineering Highlights

### 1. Advanced Productivity Analytics (Dashboard)
*   **Data Aggregation:** Dynamically calculates metrics (Total Tasks, Sprint Velocity, Team Capacity) from MongoDB documents directly on the client side.
*   **Granular Visualizations:** Responsive Area Charts and Doughnut Charts rendered via `Recharts`, complete with custom fluid layout filters (7d vs 30d views) and custom elegant skeleton loading placeholders.
*   **In-Dashboard Team Management:** Integrated pop-over modal workflows allowing managers to seamlessly view member status (online/offline) and invite new members into the platform infrastructure.

### 2. Synchronized Sprint Workspace (Multi-View Kanban & Calendar)
*   **Unified Reactive Store:** Utilizes a unified server state query. Switching views via Zustand triggers zero database overhead, changing only the presentation layer.
*   **Optimistic Updates:** Dragging cards or modifying status via the accessibility dropdown toggles instantly updates the UI cache using TanStack Query, gracefully rolling back to the previous state if the database network payload fails.
*   **Full-Calendar Integration:** Translates task due dates into structural horizontal calendar blocks, supporting seamless task inspection modals across both interfaces.

### 3. Context-Aware AI Copilot
*   **Intelligent Insights Hub:** A dual-panel dashboard featuring an automated structural bottleneck parser (e.g., highlighting stale or blocked issues) alongside a conversational AI terminal.
*   **Streaming UI Components:** Connects to AI models to stream responses word-by-word, complete with interactive typing state animations and isolated markdown text rendering.
