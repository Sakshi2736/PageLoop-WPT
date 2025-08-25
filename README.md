📖 PageLoop – Online Book Reading & Review System

🚀 Project Overview
PageLoop is a full-stack web application designed for book lovers to register, manage books, read reviews, and share feedback. The platform provides secure authentication, a clean user interface, and a smooth end-to-end experience for managing book data and user interactions.

This project was developed as part of PG-DAC CDAC coursework to demonstrate full-stack development skills including frontend, backend, database, and authentication.

🛠️ Tech Stack
Frontend
-React.js
-Tailwind CSS (styling)
-Axios (API calls)

Backend
-Node.js
-Express.js (REST APIs)
-JWT Authentication (secure login/register)

Database
-MongoDB (Mongoose ODM)

🔑 Features
🔐 User Authentication (Register/Login with JWT)
📚 Book Management (Add new books, view book list)
📝 Feedback Form (Users can submit feedback)
📬 Contact Form (For queries or support)
📊 Dashboard UI for organized book browsing
⚡ REST API with secure endpoints

📂 Project Structure

PageLoop/
│── backend/             # Node.js + Express server
│   ├── models/          # MongoDB models (User, Book, Feedback)
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── server.js        # App entry point
│
│── frontend/            # React.js frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Page views (Login, Register, Books, Feedback, Contact)
│   │   ├── App.js       # Main React app
│   │   ├── api.js       # Axios API config
│
│── README.md            # Project documentation
│── package.json         # Dependencies

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/Sakshi2736/PageLoop-WPT.git
cd PageLoop

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

3. Configure environment variables
Create a .env file in backend/ with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the project

Start Backend
-cd backend
-npm start

Start Frontend
-cd frontend
-npm start

🎯 Future Enhancements
-Book review & rating system ⭐
-Role-based access (Admin/User)
-Cloud deployment (Heroku/AWS)
-Email notification integration
