import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Appointments from "./pages/Appointments";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Services</Link> |{" "}
        <Link to="/book">Boek</Link> |{" "}
        <Link to="/appointments">Mijn afspraken</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}