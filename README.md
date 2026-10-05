# It's Your App — Mentorship Platform Prototype
> **"Conceive | Create | Impact"**

*Verified seniors from IITs, NITs, and IISERs guiding students on exams, branches, colleges, and careers.*

---

## 🎨 Pitch Deck Design System

- **Background:** Soft Blush Pink (`#FBE9EA`, `#FFF6F7`)
- **Accents:** Rose (`#B3263E`) and Deep Maroon (`#7A1530`)
- **Cards:** White rounded cards (`border-radius: 16px - 24px`, Tailwind `rounded-2xl` & `rounded-3xl`)
- **Shadows:** Subtle rose-tinted shadows (`shadow-card`, `shadow-soft`)
- **Typography:** Poppins & Inter
- **Icons:** Friendly rounded icons from `lucide-react`
- **Verification Guarantee:** Institutional domain verification (`@iiserkol.ac.in`, `@nitk.edu.in`) with zero phone numbers shown.

---

## 🚀 Quick Start

Run the application with standard Vite commands:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

---

## 🧭 Application Architecture & Flow

### 1. Landing Page (`/`)
- **Hero:** App branding, tagline, and mission statement.
- **Problem Statement (Pitch Deck Stat):**
  - **Only 23%** of students decide on genuine self-assessment.
  - **68%** are heavily influenced by parental and societal pressure.
- **How It Works (6 Steps):**
  1. `Register` $\rightarrow$ 2. `Verify` $\rightarrow$ 3. `Discover mentor` $\rightarrow$ 4. `Book` $\rightarrow$ 5. `Live session` $\rightarrow$ 6. `Feedback`
- **Featured Mentors:** Live cards with ratings, verified emails, and branch details.
- **CTAs:** Single prominent *"Login"* and *"Explore Mentors"* buttons.

---

### 2. Login Page (`/login`)
- Email & password form with sample pre-fill.
- Role chooser right after clicking Login:
  - **Login as Student** (Aparna Tiwari)
  - **Login as Mentor** (Bhanu Kumar Pandey or any of the 5 seniors)
- Institutional notice: *"Verified mentors only — mentors sign in with college-domain emails (@nitk.edu.in, @iiserkol.ac.in)"*.
- 1-click instant demo shortcuts.

---

### 3. Student Track (`/student/*`)
- **`/student/dashboard`:** Greeting *"Hi, Aparna!"*, stats counters (upcoming, completed, mentors connected), upcoming live call banner with direct join button, search bar, popular domain chips (*Web Dev, Data Science, Competitive Programming, Career Guidance, Placements, Product Management, Exams/JEE*), and study planner preview.
- **`/student/mentors`:** Multi-facet mentor search & filter (college, branch, domain, rating, availability) with verified institutional email badges.
- **`/student/mentors/:id`:** Full senior profile: bio, college, branch, year, expertise tags, entrance scores table (IAT AIR 342, JEE Main 99.4%ile, etc.), availability slots, reviews, and booking button.
- **`/student/book/:id`:** Interactive booking flow with 7-day calendar picker, time slots, 1:1 vs group format toggle, doubt notes, and celebratory confetti confirmation.
- **`/student/sessions`:** Tabs for `Upcoming`, `Completed`, and `Cancelled`; join call, reschedule, cancel, and 1–5 star rating & feedback modal.
- **`/student/call/:sessionId`:** Mock Video Call room:
  - Large mentor video tile with animated talking waves.
  - Picture-in-picture floating self-view with camera toggle.
  - Ticking live duration timer.
  - Controls: Mic, Camera, Screen-share (shows slide presentation), Hand raise, File share (mock), End Call.
  - Side panel with 3 tabs: **In-Call Chat** (with auto-replies), **Shared Notes**, and **Resources**.
- **`/student/messages`:** Direct messaging with mentors and auto-reply simulation.
- **`/student/resources`:** Downloadable PDF guides, roadmaps, and JoSAA flowcharts with preview modal.
- **`/student/planner`:** Roadmap & checklist planner with interactive tasks, categories, and live progress bar.
- **`/student/profile`:** Student profile for Aparna Tiwari (B.Tech CSE, ABES EC Ghaziabad, 2025–2029) with goals and edit modal.
- **`/student/progress`:** Recharts clarity growth chart (progressing toward 92% self-assessment clarity) and monthly session bar chart.
- **`/student/notifications`:** Activity notifications with filter chips and mark-all-read.

---

### 4. Mentor Track (`/mentor/*`)
- **`/mentor/dashboard`:** Stats (Total sessions, upcoming today, average rating, impact in hours mentored), today's schedule, session requests (Accept / Decline), and recent feedback.
- **Demo Mentor Switcher:** Switch demo mentor anytime from the top bar or profile menu between all 5 verified mentors:
  1. **Bhanu Kumar Pandey** — IISER Kolkata (`bkp26ms173@iiserkol.ac.in`)
  2. **Akash Patel** — NITK Surathkal (`akashpatel.261ec105@nitk.edu.in`)
  3. **Soham Purohit** — NITK Surathkal (`sohampurohit.261cv146@nitk.edu.in`)
  4. **K N Vineeth Rao** — NITK Surathkal (`knvineethrao.261cv119@nitk.edu.in`)
  5. **Mausmi** — NITK Surathkal (`mausmi.261ec135@nitk.edu.in`)
- **`/mentor/availability`:** Weekly slot calendar grid to add/remove slots, plus a live *"Available Now"* toggle beacon.
- **`/mentor/requests`:** Pending student bookings with topic, doubt notes, Accept, Decline, and Propose New Time options.
- **`/mentor/sessions`:** Schedule with *"Start Call"* button.
- **`/mentor/students`:** Mentee roster with session count, last call date, and editable confidential private notes.
- **`/mentor/messages`:** Messaging interface with student mentees.
- **`/mentor/resources`:** Upload modal to share guides and roadmaps.
- **`/mentor/reviews`:** Rating breakdown chart (`recharts`) and verified reviews.
- **`/mentor/verification`:** 3-stage institutional verification timeline with green ticks and verified mentor seal.
- **`/mentor/profile`:** Profile editor with bio, expertise tags, free mentorship model toggle, and research links.
- **`/mentor/notifications`:** Notifications page.

---

## 💾 Local State & Persistence

- All mock data (sessions, tasks, ratings, messages, private notes, availability slots) is managed via React Context (`src/context/AppContext.jsx`) and synchronized with `localStorage`.
- Use the **"Reset Prototype Data"** option in the profile menu at any point to restore the prototype to its default state.
