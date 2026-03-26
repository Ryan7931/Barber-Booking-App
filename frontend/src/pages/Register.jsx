import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await registerUser({ naam, email, password });

      if (res.msg === "User created") {
        setSuccess("Account aangemaakt! Je wordt doorgestuurd...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.msg || "Registratie mislukt");
      }
    } catch (err) {
      setError("Er is iets misgegaan. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="page-header">
        <p className="page-eyebrow">Maak een account</p>
        <h1 className="page-title">Registreren</h1>
        <div className="page-divider" />
      </div>

      <div className="card">
        <div className="form">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="form-group">
            <label className="form-label">Naam</label>
            <input
              className="form-input"
              placeholder="Jouw naam"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mailadres</label>
            <input
              className="form-input"
              placeholder="jouw@email.nl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Wachtwoord</label>
            <input
              className="form-input"
              placeholder="Min. 8 tekens, 1 hoofdletter, 1 speciaal teken"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleRegister} disabled={loading}>
            {loading ? "Bezig..." : "Account aanmaken"}
          </button>
        </div>
      </div>

      <p className="auth-footer">
        Al een account? <Link to="/login">Log hier in</Link>
      </p>
    </div>
  );
}