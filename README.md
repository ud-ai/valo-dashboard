# ValoDashboard - Frontend Intern Assessment

A modern, high-performance Valorant player dashboard built with Next.js, Tailwind CSS, and Framer Motion. This dashboard visualizes player statistics, match history, and performance metrics with a premium, game-inspired aesthetic.

## 🚀 Setup Instructions

1.  **Prerequisites:** Ensure you have Node.js (v18+) installed.
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
4.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✨ Features Implemented

*   **Responsive Player Profile:** Dynamic header displaying rank, level, and key player stats, optimized for all devices.
*   **Match History:**
    *   Filterable list (All/Won/Lost).
    *   Search functionality by Map or Agent.
    *   Smooth animations for list transitions.
*   **Detailed Match Stats (Modal):**
    *   Comprehensive breakdown of each match (K/D/A, HS%, ADR).
    *   **Body Hit Visualization:** Custom SVG component showing hit accuracy (Head/Body/Legs) with a tactical scanline animation and hover effects.
    *   **Dynamic Backgrounds:** Fetches and displays correct map loading screens via the Valorant API.
*   **Data Visualization:**
    *   Interactive charts for performance trends (K/D over time).
    *   Map-specific win rate analysis.
*   **Premium UI/UX:**
    *   Glassmorphism design language.
    *   Micro-interactions and hover effects using Framer Motion.
    *   Fully responsive layout (Mobile, Tablet, Desktop).

## 🛠 Challenges & Solutions

1.  **Map Data Consistency:**
    *   *Challenge:* The provided/initial map list was missing newer maps like "Corrode" and had incorrect UUIDs for others, causing background images to fail.
    *   *Solution:* Integrated the official `valorant-api.com` endpoints to fetch the correct, up-to-date Map UUIDs, ensuring 100% asset coverage.

2.  **Image Performance:**
    *   *Challenge:* High-quality map backgrounds caused layout shifts and slow LCP (Largest Contentful Paint).
    *   *Solution:* Implemented `next/image` with the `priority` flag and optimized domain configuration to serve responsive, cached images.

3.  **Complex Hit Visualization:**
    *   *Challenge:* Representing hit accuracy visually instead of just text format required a custom graphical solution.
    *   *Solution:* Created a bespoke SVG component (`BodyHitChart`) with vector paths for a tactical dummy, overlaying dynamic gradients based on hit percentage.

## ⏱ Time Spent

**Total Time:** Approximately 16 hours.

*   *Initial Setup & Data Parsing:* 2 hours
*   *Core UI Implementation (Profile, Stats, History):* 6 hours
*   *Advanced Features (Match Details, Charts, Body Viz):* 5 hours
*   *Refinement (Responsiveness, Animations, Polish):* 3 hours
