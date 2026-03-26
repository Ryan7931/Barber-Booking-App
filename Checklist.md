✦ Maison Cut — Barber Booking App
Een fullstack barber booking applicatie gebouwd met React, Node.js, Express en MongoDB.

📸 Screenshot

(Homepage.png)

🛠️ Installatie
Vereisten
Zorg dat het volgende geïnstalleerd is:

Node.js (v18 of hoger)
MongoDB (lokaal of via MongoDB Atlas)


1. Repository klonen
bashgit clone https://github.com/jouw-gebruikersnaam/barber-booking-app.git
cd barber-booking-app

2. Backend instellen
bashcd backend
npm install
Maak een .env bestand aan in de backend/ map:
envMONGO_URI=mongodb://localhost:27017/barber-app
JWT_SECRET=jouw_geheime_sleutel

Gebruik bij MongoDB Atlas de connection string die je daar vindt.


3. Frontend instellen
bashcd ../frontend
npm install

🚀 App starten
Open twee terminals tegelijkertijd.
Terminal 1 — Backend
bashcd backend
npm run dev
De backend draait op: http://localhost:5000
Terminal 2 — Frontend
bashcd frontend
npm run dev
De frontend draait op: http://localhost:5173
Open http://localhost:5173 in je browser.

📁 Projectstructuur
barber-booking-app/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Appointment.js
│   │   └── User.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env                  ← zelf aanmaken
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Appointments.jsx
    │   │   ├── Book.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Services.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.css
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

✅ Functionaliteiten

Registreren en inloggen met JWT-authenticatie
Afspraken boeken (datum, tijd, service)
Eigen afspraken bekijken
Afspraken annuleren
Navigatie past zich aan op inlogstatus


🔧 Gebruikte technologieën
LaagTechnologieFrontendReact, React Router, ViteBackendNode.js, ExpressDatabaseMongoDB, MongooseAuthJWT, bcrypt