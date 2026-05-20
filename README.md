# User Service API

Backend service for user management with authentication, authorization and role-based access control.

---

## 🚀 Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation
- Docker

---

## 🏗 Architecture

```
src/
├── common/        # shared utils, middleware, errors
├── config/        # env config
├── modules/       # feature modules
│   ├── auth/
│   └── users/
├── routes/        # route layer
├── main.ts
```

---

## 🔐 Features

- User registration
- Login with JWT
- Role-based access (ADMIN / USER)
- Self-access protection
- Password hashing (bcrypt)
- Input validation (Zod)
- Centralized error handling

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start database
```bash
docker compose up -d
```

### 3. Run migrations
```bash
npx prisma migrate dev
```

### 4. Start app
```bash
npm run dev
```

---

## 🔑 Environment variables

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/user_service
JWT_SECRET=your_secret_key
```

---

## 📌 API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Users
- GET /users (ADMIN only)
- GET /users/:id (ADMIN or self)
- PATCH /users/:id/block (ADMIN or self)

---

## 🐳 Docker

```bash
docker compose up -d
docker build -t user-service .
docker run -p 3000:3000 user-service
```

