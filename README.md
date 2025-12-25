# 📊 Analytics Dashboard

A modern, interactive **analytics dashboard** built with **FastAPI** for the backend and **React + TypeScript + Vite** for the frontend.
Visualize data with dynamic charts, input panels, and real-time updates.

---

## 🚀 Features

* Backend with **FastAPI**
* Frontend with **React**, **TypeScript**, and **Vite**
* Dynamic charts using **Recharts**
* Input panels for live data updates
* Fully containerized and easy to run locally

---

## 📁 Project Structure

```
analytics-dashboard/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── test_db_connection.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── api.js
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   ├── DonutChart.js
│   │   │   ├── DonutChart.tsx
│   │   │   ├── InputCard.js
│   │   │   ├── InputCard.tsx
│   │   │   ├── WaveChart.js
│   │   │   └── WaveChart.tsx
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.jsx
│   │   ├── index.css
│   │   ├── main.js
│   │   ├── main.tsx
│   │   ├── supabaseClient.js
│   │   ├── supabaseClient.ts
│   │   ├── types.js
│   │   └── types.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── .gitignore
└── README.md
```

---

## ⚙️ Backend Setup (FastAPI)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

**Windows (PowerShell):**

```bash
.\venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

4. Install dependencies:

```bash
pip install fastapi uvicorn python-dotenv sqlalchemy
```

> Or if you have `requirements.txt`:

```bash
pip install -r requirements.txt
```

5. Configure environment variables in `.env`:

```
DATABASE_URL=your_database_url
OTHER_ENV_VAR=value
```

6. Start the FastAPI server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

7. Open API documentation in your browser:

```
http://127.0.0.1:8000/docs
```

8. Optional: Test database connection:

```bash
python test_db_connection.py
```

---

## 🎨 Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## 🔗 Backend ↔ Frontend Integration

* Ensure the **backend server** is running before starting the frontend.
* API requests in React call FastAPI endpoints.
* Update API base URLs in `src/api/api.js` or `src/api/api.ts` if deploying to another environment.

---

## 📝 Notes

* Always activate the virtual environment before running backend commands.
* `.env` stores sensitive environment variables like database URLs.
* Frontend uses TypeScript for type safety and Vite for fast builds.
* Project is structured for scalability, maintainability, and real-time analytics.

---

## 💻 Commands Summary

| Task                              | Command (Windows / macOS-Linux)                        |
| --------------------------------- | ------------------------------------------------------ |
| Create backend venv               | `python -m venv venv`                                  |
| Activate backend venv             | `.\venv\Scripts\activate` / `source venv/bin/activate` |
| Install backend deps              | `pip install fastapi uvicorn python-dotenv sqlalchemy` |
| Install backend from requirements | `pip install -r requirements.txt`                      |
| Start backend server              | `uvicorn main:app --host 0.0.0.0 --port 8000 --reload` |
| Test DB connection                | `python test_db_connection.py`                         |
| Install frontend deps             | `npm install`                                          |
| Start frontend dev server         | `npm run dev`                                          |
| Open frontend app                 | `http://localhost:5173`                                |
---
# new-Data-Analysis
