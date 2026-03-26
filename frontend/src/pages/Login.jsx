import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.msg || "Login mislukt");
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
        <p className="page-eyebrow">Welkom terug</p>
        <h1 className="page-title">Inloggen</h1>
        <div className="page-divider" />
      </div>

      <div className="card">
        <div className="form">
          {error && <div className="alert alert-error">{error}</div>}

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
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleLogin} disabled={loading}>
            {loading ? "Bezig..." : "Inloggen"}
          </button>
        </div>
      </div>

      <p className="auth-footer">
        Nog geen account? <Link to="/register">Registreer hier</Link>
      </p>
    </div>
  );
}