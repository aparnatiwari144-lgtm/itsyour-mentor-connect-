# It's Your App — Mentorship Platform

> **"Made by mentors, built for you"**  
> *Honest, institutional guidance from verified seniors at IITs, NITs, and IISERs across Arts, Commerce, Science (PCM), and Science (PCB).*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://itsyour-mentor-connect.vercel.app)
[![React 18](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌐 Live Platform & Links

- 🚀 **Live Production Application:** [https://itsyour-mentor-connect.vercel.app](https://itsyour-mentor-connect.vercel.app)
- 📦 **GitHub Repository:** [https://github.com/aparnatiwari144-lgtm/itsyour-mentor-connect-](https://github.com/aparnatiwari144-lgtm/itsyour-mentor-connect-)
- 📖 **Full Technical Documentation:** [DOCUMENTATION.md](./DOCUMENTATION.md)

---

## 🎨 Visual Design System: Soft 3D Claymorphism

- **Color Palette:** Soft Blush-Pink canvas (`#FBE9EA`, `#FFF6F7`), deep Rose (`#B3263E`) and Maroon (`#7A1530`) accents, with soft Lavender (`#E6DDF7`) tints.
- **Clay Cards:** Chunky rounded cards (`radius: 28px - 36px`) featuring puffy clay highlights, inner borders, and soft drop shadows without harsh outlines.
- **Pastel Stat Tiles:** 4 distinct pastel tints (Pink, Yellow, Blue, Lavender) with glossy badges for metrics.
- **Original Brand Line-Art Logo:** Custom inline SVG depicting a senior on higher ground pulling a student up the slope with a soft rose-gold gradient stroke.
- **No Star Ratings Policy:** Stars and numerical ratings have been replaced across the platform with authentic written mentee feedback and total hours mentored.

---

## 🚀 Key Features

### 1. Single-Page Entry (`/`)
- Unified entry point with zero nested login redirects.
- Top bar with line-art logo, verification badge, and prototype security pill.
- Two big 3D clay cards: **"Login as Student"** and **"Login as Mentor"**.
- Interactive clay modal with **Log In** and **Sign Up** tabs:
  - Password show/hide toggle.
  - "Stay signed in" toggle.
  - "Forgot password?" modal flow.
  - **"Try Demo Account (Aparna Tiwari)"** button for instant evaluation of rich showcase data.
  - Quick-fill selector for the **5 real institutional mentors**.
- 4 key value badges: **13 Verified Mentors**, **Free Trial (First session on us)**, **1:1 Interactive Video Calls**, **Verified Only (College domain emails)**.

### 2. Dual-Mode Authentication & Security
- **Cloud Mode:** Firebase Authentication & Firestore (configurable via `.env` variables).
- **Local Prototype Mode Fallback:** Automatically activates when `.env` keys are omitted.
  - Never stores plain-text passwords: computes salted SHA-256 hashes using browser-native **Web Crypto API** (`crypto.subtle.digest`).
  - Isolated user storage: every user account has individual records (`iyapp_sessions_${uid}`, `iyapp_streak_${uid}`, etc.).
  - Visible indicator: *"Prototype mode • Data stays in this browser"*.

### 3. Four Academic Guidance Streams
- **Science (PCM)** — Engineering, JEE Main/Advanced, B.Tech branch choices, NDA.
- **Science (PCB)** — NEET, Medical, IISER Natural Sciences research, IAT exam.
- **Commerce & Management** — CA, CUET B.Com (Hons), IPMAT, Finance, Economics.
- **Arts & Humanities** — CUET Arts, Civil Services/UPSC foundation, Law (CLAT), Psychology.

### 4. Student Workspace (`/student/*`)
- **Dashboard:** Time-based personal greeting (`Good Morning, <Name>!`), active stream badge, 4 pastel clay stat tiles, weekly study overview bar chart, topic focus donut chart, and upcoming session cards.
- **Find Mentors:** Multi-facet filtering by stream, branch, and college domain.
- **Booking Engine:** 7-day slot calendar, topic/doubt input, automatic 1st Free Trial discount (₹0).
- **Interactive Video Call Room:** Simulated video room with animated audio waves, live timer, screen sharing, hand raising, and collaborative notes.
- **Daily Quizzes:** Stream-based multiple-choice subject practice tests with instant scoring.
- **Marks & Mock Tracker:** Log mock exams, percentiles, and subject breakdowns.
- **Study Roadmap Planner:** Milestones, deliverables, and progress tracking.
- **Recorded Sessions Archive:** Video playback simulation of past mentorship calls.
- **Study Notes:** Stream-organized personal notes workspace.
- **Streak Tracker:** Daily habit logging with unlockable milestone badges.

### 5. Senior Mentor Workspace (`/mentor/*`)
- **Institutional Domain Verification:** Enforces official college emails (`@nitk.edu.in`, `@iiserkol.ac.in`, `@iitb.ac.in`).
- **Dashboard:** Session request queue (Accept / Decline), today's scheduled calls, total hours mentored, and verified senior badge.
- **Availability Manager:** Add and manage weekly recurring availability slots.
- **Mentee Roster:** Student list with session count and private mentor notes.
- **Written Feedback:** Real mentee notes (zero star ratings).
- **Verification Audit Trail:** 3-tier milestone audit verifying college domain and student status.

---

## 👥 Verified Senior Mentors Directory (13 Total)

### Real Institutional Seniors:
- **Bhanu Kumar Pandey** — IISER Kolkata (`bkp26ms173@iiserkol.ac.in`) • BS-MS Natural Sciences • Science (PCB)
- **Akash Patel** — NITK Surathkal (`akashpatel.261ec105@nitk.edu.in`) • B.Tech ECE • Science (PCM)
- **Soham Purohit** — NITK Surathkal (`sohampurohit.261cv146@nitk.edu.in`) • B.Tech Civil • Science (PCM)
- **K N Vineeth Rao** — NITK Surathkal (`knvineethrao.261cv119@nitk.edu.in`) • B.Tech Civil • Science (PCM)
- **Mausmi** — NITK Surathkal (`mausmi.261ec135@nitk.edu.in`) • B.Tech ECE • Science (PCM)

### Curated Demo Profiles:
- **Arts (4 Mentors):** Radhika Sundaram (St. Stephen's), Aarav Saxena (Hindu College), Devika Menon (Miranda House), Kabir Sen (Ashoka Univ).
- **Commerce (4 Mentors):** Shreya Agrawal (SRCC), Rohan Malhotra (SSCBS), Tanya Bansal (LSR), Ankit Singhal (IIM Rohtak IPM).

---

## ⚡ Quick Start (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/aparnatiwari144-lgtm/itsyour-mentor-connect-.git
cd itsyour-mentor-connect-

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

To generate an optimized production build:
```bash
npm run build
```

---

## 📖 Complete Documentation

For detailed architectural diagrams, security analysis, domain allow-lists, and technical specifications, please see [DOCUMENTATION.md](./DOCUMENTATION.md).

---

© 2026 It's Your App Mentorship Platform. All rights reserved.
