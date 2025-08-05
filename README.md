# 🏋️‍♂️ Strength-Projector-API

This is the backend API for the **WORKOUT PROGRESS PROJECTOR**. It allows users to submit, retrieve, and manage exercise data including weight, reps, and calculated one-rep max (1RM). The API also supports retrieving historical data for graphical visualization of strength progress.

---

## 🌐 Base URL

https://strength-projector-api.vercel.app

---

## 🧠 Key Features

- 🌟 RESTful API to handle exercise data
- 📏 Automatically keeps running log of user's Personal Record and the current Record
- 🔐 User authentication for private data tracking

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Postgresql
- **Validation:** express-validator
- **Auth:** JsonWebToken
- **ORM:** Prisma

---

## 📘 API Endpoints

### 📥 `CRUD OPERATIONS`

**Request Body:**

```json
{
  "exercise": "Bench Press",
  "strength": [{day: "02/01/25" strength: 225}],
  "reps": 5
}

**Response:**
with historical data
{
  "id": "abc123",
  "exercise": "Bench Press",
  "strength": [
    {day: "01/15/25" strength: 265}
    {day: "02/01/25" strength: 255}
    ],
  "personalRecord": {day: "01/15/25" strength: 265},
  "currentRecord": {day: "02/01/25" strength: 255},

}

---

## Setup & Run Locally

git clone https://github.com/A-Galicia/Strength-Projector-API.git
cd orm-tracker-api
npm install
node app
```
