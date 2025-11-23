# 🔗 TinyLink - Full Stack URL Shortener

A modern, full-stack URL shortening application built with React, Node.js, and PostgreSQL. It allows users to create short links, track click statistics, and manage their URLs via a clean dashboard.

**Live Demo:** [https://tinylink-frontend-mf29id30u-nandni-dixits-projects.vercel.app/](https://tinylink-frontend-mf29id30u-nandni-dixits-projects.vercel.app/)

**Backend API:** [https://tinylink-backend-gkip.onrender.com/healthz](https://tinylink-backend-gkip.onrender.com/healthz)

---

## Features

- **Create Short Links:** Convert long URLs into short, manageable links.
- **Custom Aliases:** Option to provide a custom short code (e.g., `/mytrip`).
- **Smart Redirection:** Fast 302 redirects that track click counts and timestamps.
- **Dashboard:** View all created links with search/filter functionality.
- **Analytics:** Track total clicks and last active time.
- **Stats Page:** Dedicated page for individual link statistics (`/code/:code`).
- **System Health:** Real-time system uptime monitoring page (`/healthz`).
- **Responsive UI:** Fully responsive design using Tailwind CSS.

---

## Tech Stack

### Frontend

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (hosted on Neon Tech)
- **ORM:** Prisma
- **Deployment:** Render

---

## 📂 Project Structure

The project follows a modular architecture separating Client and Server:
