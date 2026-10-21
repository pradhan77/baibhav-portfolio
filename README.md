# Baibhav Pradhan — Full-Stack Cybersecurity Portfolio

A modern, minimal, dark editorial personal portfolio and full-stack web application for **Baibhav Pradhan**, a 3rd-year **BSc (Hons) Ethical Hacking & Cybersecurity** undergraduate at **Softwarica College of IT & E-Commerce** (affiliated with **Coventry University, UK**).

This application is built as a complete **full-stack architecture**:
- **Frontend**: Single-Page Application (SPA) powered by **React 18**, **Vite 5**, **Tailwind CSS**, and **Lucide React**. Features an understated obsidian editorial aesthetic, custom SVG technical architecture diagrams, a physics-based 3D tilt/layered parallax visual, and responsive navigation.
- **REST API & Backend**: **Node.js** and **Express.js** providing secure, structured RESTful API endpoints for projects, certifications, academic coursework, skills, and visitor contact messages.
- **Database**: **MongoDB** with **Mongoose** Object Data Modeling (ODM) for schema validation, automated timestamps, and persistent message storage.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, JavaScript (ES Modules), Tailwind CSS 3, Lucide React Icons |
| **Backend** | Node.js (v20+), Express.js 4, REST API Architecture |
| **Database** | MongoDB, Mongoose 8 (ODM) |
| **Security** | Helmet (Secure HTTP Headers), CORS Origin Whitelisting, Input Validation & Sanitization, Admin Key Authentication |
| **Build & Tooling** | Vite Bundler, PostCSS, Autoprefixer, Concurrently / Native Node Watch Mode |

---

## 🏛️ Application Architecture

```
React 18 + Vite (Port 3000)
       │
       ▼ (REST API / JSON over HTTP)
Vite Reverse Proxy (`/api` -> `http://localhost:5000`)
       │
       ▼
Express.js Backend Server (Port 5000)
 ├── Security Middleware (Helmet, CORS, Payload Limits)
 ├── Input Validation & Sanitization Layer
 ├── Admin Authentication Middleware (`x-admin-key`)
 └── Route Handlers (/api/projects, /api/certifications, etc.)
       │
       ▼ (Mongoose ODM)
MongoDB Database (mongodb://127.0.0.1:27017/portfolio)
 ├── Projects Collection
 ├── Certifications Collection
 ├── Education Collection
 ├── Skills Collection
 └── ContactMessages Collection
```

---

## 📂 Project Directory Structure

```
portfolio/
├── index.html                   # HTML entry point (Inter font & metadata)
├── package.json                 # Frontend dependencies & root convenience scripts
├── vite.config.js               # Vite config with dev reverse proxy (/api -> :5000)
├── tailwind.config.js           # Tailwind tokens & dark theme
├── postcss.config.js            # PostCSS configuration
├── .env                         # Frontend environment variables
├── .env.example                 # Frontend environment variables template
│
├── src/                         # React Frontend SPA
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main page assembler & scroll spy
│   ├── index.css                # Global styles, noise filter, animations
│   ├── services/
│   │   └── api.js               # Centralized REST API service layer with fallback
│   ├── data/
│   │   └── portfolioData.js     # Single source of truth & offline fallback data
│   ├── hooks/
│   │   └── useInView.js         # Scroll-triggered reveal observer
│   └── components/
│       ├── Navbar.jsx           # Clean sticky header with single contact CTA
│       ├── Hero.jsx             # Editorial typography & 3D parallax geometric visual
│       ├── About.jsx            # Bio, academic status, methodology & career goals
│       ├── Skills.jsx           # API-driven categorized technical competencies
│       ├── Projects.jsx         # API-driven project cards & filter pills
│       ├── ProjectVisualPreview.jsx # Custom SVG technical architecture previews
│       ├── Education.jsx        # API-driven degree details & academic modules
│       ├── Certifications.jsx   # API-driven verified certifications & THM streak
│       ├── Contact.jsx          # Live REST API submission form & email copy box
│       ├── Footer.jsx           # Minimal closing credits & copyright
│       └── Toast.jsx            # Micro feedback notification
│
└── backend/                     # Node.js & Express REST API Server
    ├── server.js                # Express app entry point & route registration
    ├── package.json             # Backend dependencies (express, mongoose, helmet, etc.)
    ├── .env                     # Backend private environment configuration
    ├── .env.example             # Backend environment template
    ├── config/
    │   └── db.js                # Mongoose connection manager with resilient offline fallback
    ├── data/
    │   └── initialData.js       # Curated seed dataset (Wazuh Lab, SSH Sentinel, etc.)
    ├── models/
    │   ├── Project.js           # Project Mongoose schema & indexes
    │   ├── Certification.js     # Certification Mongoose schema
    │   ├── Education.js         # Education & academic modules schema
    │   ├── Skill.js             # Categorized skill group schema
    │   └── ContactMessage.js    # Visitor contact submissions schema
    ├── middleware/
    │   ├── auth.js              # Administrative key protection (`x-admin-key`)
    │   └── validate.js          # Contact form input validation & sanitization
    ├── controllers/
    │   ├── projectController.js # CRUD controller for security projects
    │   ├── certificationController.js # CRUD controller for credentials
    │   ├── educationController.js # CRUD controller for degree coursework
    │   ├── skillController.js   # CRUD controller for skill competencies
    │   └── contactController.js # Form submission & inbox retrieval controller
    ├── routes/
    │   ├── projectRoutes.js     # /api/projects routes
    │   ├── certificationRoutes.js # /api/certifications routes
    │   ├── educationRoutes.js   # /api/education routes
    │   ├── skillRoutes.js       # /api/skills routes
    │   └── contactRoutes.js     # /api/contact routes
    └── scripts/
        └── seed.js              # Database initialization & seeding script
```

---

## 🔌 REST API Endpoints

### Public Endpoints (Accessible to Visitors)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server health, uptime, and environment |
| `GET` | `/api/projects` | Retrieves list of all curated security projects |
| `GET` | `/api/projects/:id` | Retrieves a single project by ID or key |
| `GET` | `/api/certifications` | Retrieves verified industry certifications |
| `GET` | `/api/education` | Retrieves academic degree information & coursework |
| `GET` | `/api/skills` | Retrieves categorized cybersecurity skills |
| `POST` | `/api/contact` | Submits a new contact message to the database |

#### Example Contact Submission:
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Smriti Shrestha",
  "email": "shrestha@organization.com",
  "message": "Hello Baibhav, we would like to interview you for a Junior SOC Analyst role."
}
```

Response (`201 Created`):
```json
{
  "success": true,
  "message": "Message received successfully."
}
```

### Administrative Endpoints (Protected by `x-admin-key`)

Public visitors cannot modify portfolio records. Write, update, and delete endpoints require a secret admin key passed in the `x-admin-key` or `Authorization: Bearer <key>` header:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/projects` | Creates a new security project |
| `PUT` | `/api/projects/:id` | Updates an existing project |
| `DELETE` | `/api/projects/:id` | Deletes a project |
| `POST` | `/api/certifications` | Adds a new certification |
| `PUT` | `/api/certifications/:id` | Updates a certification |
| `DELETE` | `/api/certifications/:id` | Deletes a certification |
| `POST` | `/api/education` | Adds an education record |
| `PUT` | `/api/education/:id` | Updates an education record |
| `DELETE` | `/api/education/:id` | Deletes an education record |
| `POST` | `/api/skills` | Adds a skill category |
| `PUT` | `/api/skills/:id` | Updates a skill category |
| `DELETE` | `/api/skills/:id` | Deletes a skill category |
| `GET` | `/api/contact` | Retrieves all visitor contact submissions |

---

## ⚙️ Environment Variables

### 1. Frontend Configuration (`.env`)
```bash
# Base URL for the Express REST API backend
# In local development with Vite proxy, '/api' or 'http://localhost:5000/api' can be used
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend Configuration (`backend/.env`)
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
CLIENT_URL=http://localhost:3000
ADMIN_API_KEY=your_secure_admin_api_key_here

# Contact Form Email Dispatch (Gmail SMTP via Nodemailer)
GMAIL_USER=pradhanbaibhav28@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

#### Generating a Gmail App Password:
1. Go to your **Google Account** security settings ([myaccount.google.com/security](https://myaccount.google.com/security)).
2. Ensure **2-Step Verification** is enabled on your Google account.
3. Search for or navigate to **App passwords** ([myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Enter a name (e.g., `Portfolio Form`) and click **Create**.
5. Copy the generated 16-character password (without spaces) into `GMAIL_APP_PASSWORD` in `backend/.env`.

> [!NOTE]
> If `GMAIL_USER` or `GMAIL_APP_PASSWORD` are unset or invalid, contact messages will still be safely saved to the database (or in-memory fallback) and visitors will receive a successful submission notice, while the server logs the email notification status.

---

## 🚀 Running the Full-Stack Application Locally

### Prerequisites
- **Node.js** (v18.x or v20+)
- **npm** (v9+ or v10+)
- **MongoDB** (Local `mongod` community server or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI)

---

### Step 1: Install Dependencies

From the root directory:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

### Step 2: Configure Environment Variables

```bash
# Copy example files
cp .env.example .env
cp backend/.env.example backend/.env
```
Ensure your `backend/.env` has the correct `MONGODB_URI` and your custom `ADMIN_API_KEY`.

---

### Step 3: (Optional) Seed the Database

To populate MongoDB with Baibhav's verified projects, certifications, academic modules, and skills:
```bash
npm run seed
```
*(Or from within `backend/`: `npm run seed`)*

---

### Step 4: Run the Backend Server

```bash
# From the root directory:
npm run server:dev

# Or navigate to the backend directory:
cd backend
npm run dev
```
The Express API will be running at [http://localhost:5000](http://localhost:5000).

---

### Step 5: Run the Frontend Development Server

In a second terminal window from the root directory:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

### Step 6: Production Build

To verify and generate a production build:
```bash
npm run build
```
This generates an optimized, minified bundle in `dist/`.

---

## 🚀 Deploy

### 1. Frontend Deployment (Vercel)
* **Platform**: [Vercel](https://vercel.com)
* **Production Domain**: `https://baibhavpradhan.com.np`
* **Root Directory**: `./` (project root)
* **Framework Preset**: Vite
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Install Command**: `npm install`

#### Environment Variables (Vercel):
| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Yes | Base URL of your deployed Express backend on Render (without trailing slash) | `https://your-backend.onrender.com` |

---

### 2. Backend Deployment (Render)
* **Platform**: [Render](https://render.com) (Web Service)
* **Runtime**: Node.js
* **Root Directory**: `backend`
* **Build Command**: `npm install`
* **Start Command**: `npm start`
* **Health Check Path**: `/api/health`

#### Environment Variables (Render):
| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Managed | Render sets this automatically (local default: `5000`) | `10000` |
| `CLIENT_URL` | Yes | Comma-separated list of allowed frontend origins for CORS | `https://baibhavpradhan.com.np,https://www.baibhavpradhan.com.np` |
| `MONGODB_URI` | Optional | MongoDB Atlas connection string (falls back gracefully to in-memory store if unset) | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` |
| `GMAIL_USER` | Optional | Gmail address used for contact form email dispatch | `pradhanbaibhav28@gmail.com` |
| `GMAIL_APP_PASSWORD` | Optional | 16-character Google App Password (no spaces) | `your_16_character_app_password` |
| `ADMIN_API_KEY` | Optional | Secret administrative key for write/delete endpoints | `your_secure_admin_api_key_here` |

---

## 🛡️ Security Features

1. **Helmet HTTP Headers**: Mitigates Cross-Site Scripting (XSS), clickjacking, and MIME sniffing attacks.
2. **CORS Whitelisting**: Restricts API calls to approved origins (`http://localhost:3000`).
3. **Payload Clamping**: JSON and URL-encoded request bodies are capped at `50kb` to prevent buffer exhaustion and DoS attacks.
4. **Input Sanitization & Validation**: Contact form entries are validated for format and length; strings are trimmed before database persistence.
5. **Admin Route Segregation**: Public visitors can only submit contact messages and read portfolio data. All administrative modifications require the secret API key.
6. **Graceful Fault Tolerance**: If the MongoDB server is temporarily unreachable, the frontend continues to serve cached academic credentials with zero UI disruption.

---

## 👤 Author & Academic Details

* **Student**: Baibhav Pradhan
* **Institution**: Softwarica College of IT & E-Commerce, Kathmandu, Nepal
* **Affiliation**: Coventry University, United Kingdom
* **Degree**: BSc (Hons) Ethical Hacking & Cybersecurity (3rd Year)
* **Email**: [pradhanbaibhav28@gmail.com](mailto:pradhanbaibhav28@gmail.com)
* **LinkedIn**: [baibhav-pradhan-1835b6399](https://www.linkedin.com/in/baibhav-pradhan-1835b6399/)
* **GitHub**: [pradhan77](https://github.com/pradhan77?tab=repositories)
* **TryHackMe**: [PrAdHaN](https://tryhackme.com/p/PrAdHaN)
