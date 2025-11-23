# 🔗 TinyLink - Full Stack URL Shortener

A modern, full-stack URL shortening application built with React, Node.js, and PostgreSQL. It allows users to create short links, track click statistics, and manage their URLs via a clean dashboard.

**Live Demo:** [https://tinylink-frontend-mf29id30u-nandni-dixits-projects.vercel.app/](https://tinylink-frontend-mf29id30u-nandni-dixits-projects.vercel.app/)  

**Backend API:** [https://tinylink-backend-gkip.onrender.com/healthz](https://tinylink-backend-gkip.onrender.com/healthz)

---

##  Features

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

```
TinyLink-Project/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Tables, Forms)
│   │   ├── pages/       # Page layouts (Dashboard, Stats, Health)
│   └── ...
└── server/          # Node.js Backend
    ├── prisma/      # Database Schema and Migrations
    ├── index.js     # API Routes and Server Logic
    └── ...
```

---

## Getting Started Locally

Follow these steps to run the project on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Nandni-Dixit/TinyLink.git
cd TinyLink
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder and add your Database URL:
```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
PORT=5000
```

Initialize Prisma and Start Server:
```bash
npx prisma generate
npx prisma migrate dev
node index.js
```
*Server will run on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal, navigate to the client folder:
```bash
cd ../client
npm install
```

Start React App:
```bash
npm run dev
```
*Frontend will run on http://localhost:5173*

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/links` | Create a new short link |
| `GET` | `/api/links` | Get all links (Dashboard) |
| `GET` | `/api/links/:code` | Get stats for a specific link |
| `DELETE` | `/api/links/:code` | Delete a short link |
| `GET` | `/:code` | Redirect to original URL |
| `GET` | `/healthz` | Check system uptime |

---

