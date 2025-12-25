# 📊 Analytics Dashboard

A modern, full-stack **Analytics Dashboard** built with **FastAPI** (backend) and **React + TypeScript + Vite** (frontend).
The application provides real-time data visualization using interactive charts and a clean, scalable architecture.

---

## 🚀 Tech Stack

### Backend

* **FastAPI**
* **SQLAlchemy**
* **Pydantic**
* **Uvicorn**
* Environment configuration with **python-dotenv**

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **ESLint**
* Charting support (e.g., Recharts or similar)

---

## 📁 Project Structure

```
analytics-dashboard/
│
├── backend/
│   ├── .env                    # Environment variables (DB, secrets)
│   ├── main.py                 # FastAPI app entry point
│   ├── database.py             # Database connection setup
│   ├── models.py               # SQLAlchemy models
│   ├── schemas.py              # Pydantic schemas
│   ├── crud.py                 # Database CRUD operations
│   └── requirements.txt        # Backend dependencies
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/                    # React source code
│   │   ├── main.tsx            # React entry point
│   │   ├── App.tsx             # Root component
│   │   └── api/                # API calls to backend (recommended)
│   ├── index.html              # HTML entry
│   ├── package.json            # Frontend dependencies & scripts
│   ├── tsconfig.json           # TypeScript config
│   └── vite.config.ts          # Vite configuration
│
└── README.md                   # Project documentation

```

---

## ⚙️ Backend Setup (FastAPI)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
```

**Windows**

```bash
venv\Scripts\activate
```

**macOS / Linux**

```bash
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure environment variables:

* Create or edit the `.env` file in the `backend` folder
* Add database and environment settings as needed

5. Run the FastAPI server:

```bash
uvicorn main:app --reload
```

6. Open API documentation:

```
http://127.0.0.1:8000/docs
```

---

## 🧪 Backend Files Overview

* `main.py` – FastAPI app entry point
* `database.py` – Database connection setup
* `models.py` – SQLAlchemy models
* `schemas.py` – Pydantic schemas
* `crud.py` – Database operations (CRUD logic)
* `test_db_connection.py` – Database connection test
* `.env` – Environment variables

---

## 🎨 Frontend Setup (React + Vite)

1. Navigate to the frontend directory:

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

4. Open the app:

```
http://localhost:5173
```

---

## 📌 Frontend Notes

* Built with **TypeScript** for type safety
* Uses **Vite** for fast development and builds
* ESLint configured for clean code
* Fetches live data from the FastAPI backend

---

## 🔗 Backend ↔ Frontend Integration

* Ensure the backend server is running before starting the frontend
* API requests are made from React to FastAPI
* Update API base URLs if needed for deployment

---

## 📝 Notes

* Modify `.env` for database or environment-specific settings
* Project is structured for scalability and clean separation of concerns
* Suitable for dashboards, admin panels, and analytics systems

---

## 📄 License

This project is licensed under the **MIT License**.
