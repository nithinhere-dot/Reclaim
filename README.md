# ♻️ Reclaim

> **Turn Waste Into Opportunity**

Reclaim is a full-stack waste-management platform that connects people who need to dispose of waste with waste collectors who can collect and process it.

The platform provides two types of users:

* **Job Posters** — create waste collection requests with the waste type, location, and description.
* **Waste Collectors** — browse available collection jobs, accept jobs, and mark them as completed.

The goal is to make waste collection more accessible, organized, and efficient.

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* Two user roles:

  * `poster`
  * `collector`
* Password hashing with bcrypt
* JWT-based authentication
* Protected routes
* Role-based access control
* Persistent login using browser local storage

The backend generates JWT tokens with a 7-day expiration and uses middleware to authenticate protected requests.

### 🗑️ Post Waste Collection Jobs

Job posters can create a collection request containing:

* Waste type
* Location / address
* Description

Supported waste types include:

* Plastic
* Paper
* Metal
* Glass
* Organic
* E-Waste
* Other

### 🔍 Browse Available Jobs

Collectors can browse currently open waste-collection jobs and view:

* Waste type
* Location
* Description

Collectors can accept an available job directly from the jobs page.

### 📦 Job Lifecycle

Jobs move through different states:

```text
Open
  ↓
Accepted
  ↓
Completed
```

A collector can only complete a job after accepting it, and only the collector who accepted the job can mark it as completed.

### 📋 Manage Your Jobs

Posters can view jobs they have created.

Collectors can view jobs they have accepted and mark accepted jobs as completed.

### ❌ Cancel / Delete Jobs

Posters can cancel open jobs or delete their own jobs according to the job's current status.

The backend prevents unauthorized users from modifying another user's jobs.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       React          │
                    │      Frontend        │
                    │     Vite + React     │
                    └──────────┬───────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌──────────────────────┐
                    │       Express        │
                    │       Backend        │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
          ┌─────────────┐             ┌─────────────┐
          │ JWT Auth    │             │   MongoDB   │
          │ + RBAC      │             │  Mongoose   │
          └─────────────┘             └─────────────┘
```

The backend exposes authentication and job APIs through Express routes, while MongoDB is accessed through Mongoose.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router
* Axios
* JavaScript
* CSS

The frontend uses React Router for navigation and protected routes for role-specific pages.

### Backend

* Node.js
* Express 5
* MongoDB
* Mongoose
* JWT
* bcrypt
* CORS
* dotenv

---

## 📁 Project Structure

```text
Reclaim/
│
├── Backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── role.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── Frontend/
    │
    ├── src/
    │   ├── components/
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── Jobs.jsx
    │   │   ├── JobRequest.jsx
    │   │   ├── MyJobs.jsx
    │   │   ├── MyAcceptedJobs.jsx
    │   │   └── Profile.jsx
    │   │
    │   └── App.jsx
    │
    └── package.json
```

---

## 🔐 Authentication & Authorization

Reclaim uses JWT authentication.

### Authentication flow

```text
User
 │
 ├── Sign Up
 │      ↓
 │   Account created
 │
 └── Login
        ↓
     JWT Token
        ↓
   Store token locally
        ↓
   Access protected routes
```

Passwords are hashed with bcrypt before being stored. During login, the backend verifies the password and creates a JWT containing the user's ID and role.

### Role-based access

The application uses two roles:

| Role        | Capabilities                                 |
| ----------- | -------------------------------------------- |
| `poster`    | Create and manage waste collection jobs      |
| `collector` | Browse, accept, and complete collection jobs |

The backend enforces these roles using authorization middleware rather than relying only on frontend restrictions.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           | Description           | Auth |
| ------ | ------------------ | --------------------- | ---- |
| `POST` | `/api/auth/signup` | Create a user account | No   |
| `POST` | `/api/auth/login`  | Login and receive JWT | No   |
| `GET`  | `/api/auth/me`     | Get current user      | Yes  |

### Jobs

| Method   | Endpoint                 | Description            | Role          |
| -------- | ------------------------ | ---------------------- | ------------- |
| `POST`   | `/api/jobs`              | Create a job           | Poster        |
| `GET`    | `/api/jobs`              | Get open jobs          | Public        |
| `PUT`    | `/api/jobs/:id/accept`   | Accept a job           | Collector     |
| `PUT`    | `/api/jobs/:id/complete` | Complete a job         | Collector     |
| `GET`    | `/api/jobs/my-jobs`      | Get user's posted jobs | Authenticated |
| `GET`    | `/api/jobs/my-accepted`  | Get accepted jobs      | Authenticated |
| `PUT`    | `/api/jobs/:id/cancel`   | Cancel a job           | Poster        |
| `DELETE` | `/api/jobs/:id`          | Delete a job           | Poster        |

---

## 🗄️ Data Models

### User

```text
User
├── name
├── email
├── password
└── role
```

The role can be either `poster` or `collector`.

### Job

```text
Job
├── wasteType
├── description
├── location
├── status
├── postedBy
├── acceptedBy
├── createdAt
└── updatedAt
```

Job status is used to track the collection lifecycle.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

---

### 1. Clone the repository

```bash
git clone https://github.com/nithinhere-dot/Reclaim.git
cd Reclaim
```

### 2. Setup the backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

The server connects to MongoDB using `MONGO_URI` and defaults to port `5000`.

---

### 3. Setup the frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🔄 How Reclaim Works

### For Job Posters

```text
Sign Up
   ↓
Choose "Job Poster"
   ↓
Login
   ↓
Post Waste Collection Job
   ↓
Enter Waste Type + Location + Description
   ↓
Wait for Collector
   ↓
Track Job Status
```

### For Waste Collectors

```text
Sign Up
   ↓
Choose "Waste Collector"
   ↓
Login
   ↓
Browse Available Jobs
   ↓
Accept a Job
   ↓
Collect the Waste
   ↓
Mark Job as Completed
```

---

## 🎯 Project Goal

Reclaim was built to demonstrate how a full-stack application can connect two different types of users through a role-based workflow.

The project combines:

* REST APIs
* Authentication
* Authorization
* CRUD operations
* MongoDB
* React state management
* Protected routes
* Role-based UI
* Frontend/backend communication

---

## 🔮 Future Improvements

Potential improvements for future versions include:

* 📍 Interactive maps and location-based job discovery
* 🔔 Real-time notifications
* 💬 Poster–collector messaging
* ⭐ Collector ratings and reviews
* 💰 Payment/reward system
* 📸 Waste image uploads
* 📊 Collection statistics and dashboards
* 🔎 Advanced job filtering
* 📱 Responsive mobile-first improvements
* ☁️ Production deployment
* 🔐 Refresh-token based authentication
* 🧪 Automated frontend and backend tests

---

## 👨‍💻 Author

**Nithin Kumar**

GitHub: [@nithinhere-dot](https://github.com/nithinhere-dot)

---

## 📄 License

This project currently uses the license specified in the repository configuration.
