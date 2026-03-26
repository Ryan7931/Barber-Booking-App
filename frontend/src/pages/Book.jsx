import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../services/api";

export default function Book() {
  const [datum, setDatum] = useState("");
  const [tijd, setTijd] = useState("");
  const [service, setService] = useState("Knip");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = async () => {
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!datum || !tijd) {
      setError("Selecteer een datum en tijd");
      return;
    }

    setLoading(true);

    try {
      const res = await createAppointment({ datum, tijd, service }, token);

      if (res._id) {
        navigate("/appointments");
      } else {
        setError(res.msg || "Afspraak maken mislukt");
      }
    } catch (err) {
      setError("Er is iets misgegaan. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <p className="page-eyebrow">Plan jouw bezoek</p>
        <h1 className="page-title">Afspraak <em>Boeken</em></h1>
        <div className="page-divider" />
      </div>

      <div className="card" style={{ maxWidth: 500 }}>
        <div className="form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Service</label>
            <select
              className="form-select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="Knip">Knip — €25</option>
              <option value="Fade">Fade — €30</option>
              <option value="Baard">Baard — €15</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Datum</label>
            <input
              className="form-input"
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tijd</label>
            <input
              className="form-input"
              type="time"
              value={tijd}
              onChange={(e) => setTijd(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleBook} disabled={loading}>
            {loading ? "Bezig..." : "Bevestig afspraak"}
          </button>
        </div>
      </div>
    </div>
  );
}