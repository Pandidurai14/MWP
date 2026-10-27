# React Course Registration System

A complete course registration system built with **React 18 + Vite**. Students can browse the
course catalog, filter and search courses, enroll or drop classes, and track their semester
credits — all persisted locally in the browser.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Course catalog** | Grid of all offered courses with instructor, schedule, venue and credits |
| 2 | **Search** | Real-time search across course code, title and instructor |
| 3 | **Filters** | Filter by department and by availability (open / full) |
| 4 | **Self-registration** | One-click enroll with instant seat count update |
| 5 | **Seat limits** | Registration blocked automatically when a course is full |
| 6 | **Credit limit** | Max **18 credits** per semester, enforced with a clear message |
| 7 | **Drop / withdraw** | Remove a course and release the seat back to the catalog |
| 8 | **My Schedule** | Table view of enrolled courses with total credit counter |
| 9 | **Add new course** | Modal form to create a course with full validation (duplicate codes, credit & seat ranges) |
| 10 | **Dashboard stats** | Live stats: courses offered, seats filled, open courses, my credits |
| 11 | **Persistence** | Everything saved to `localStorage` — refresh and your data stays |
| 12 | **Toast notifications** | Feedback for every action (registered, dropped, errors) |
| 13 | **Responsive UI** | Dark theme, mobile friendly, keyboard accessible |

## Tech stack

- **React 18** — function components, hooks (`useState`, `useMemo`, `useEffect`)
- **Vite 5** — instant dev server and optimized production build
- **Plain CSS** — design tokens, grid/flexbox, no CSS framework dependency
- **localStorage** — zero-backend persistence

## Project structure

```
react-course-registration-system/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                 # state, routing between tabs, business logic
    ├── index.css               # global styles / theme
    ├── components/
    │   ├── Header.jsx          # title + tab navigation
    │   ├── StatsBar.jsx        # dashboard statistics
    │   ├── CourseCatalog.jsx   # search / filters / grid
    │   ├── CourseCard.jsx      # single course + register/drop button
    │   ├── AddCourseModal.jsx  # create course form with validation
    │   ├── MySchedule.jsx      # enrolled courses table
    │   └── Toast.jsx           # transient notifications
    ├── data/
    │   └── seedCourses.js      # default catalog
    ├── hooks/
    │   └── useLocalStorage.js  # persistent state hook
    └── utils/
        └── registrationRules.js# validation + enrollment rules
```

## Getting started

```bash
# 1. install dependencies
npm install

# 2. start dev server
npm run dev        # → http://localhost:5173

# 3. production build
npm run build
npm run preview    # serve the built app
```

## Registration rules

- A course can only be registered while `registered < seats`
- A student may enrol in at most **18 credits** per semester
- Dropping a course decrements the seat count immediately
- New courses must have a unique code, 1–6 credits and 1–500 seats

## License

MIT © Pandidurai
