import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Appointments from "./pages/Appointments";
import "./App.css";

function Nav() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-brand-icon">✦</span>
        <span className="nav-brand-name">MAISON CUT</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Services</Link>
        {loggedIn && (
          <>
            <Link to="/book" className={location.pathname === "/book" ? "nav-link active" : "nav-link"}>Boek</Link>
            <Link to="/appointments" className={location.pathname === "/appointments" ? "nav-link active" : "nav-link"}>Mijn Afspraken</Link>
          </>
        )}
      </div>
      <div className="nav-auth">
        {loggedIn ? (
          <button className="btn-logout" onClick={handleLogout}>Uitloggen</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-primary-nav">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Services />} />
            <Route path="/book" element={<Book />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}