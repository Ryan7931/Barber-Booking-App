import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const data = await getAppointments(token);
        setAppointments(data);
      } catch (err) {
        setError("Kon afspraken niet laden.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id, token);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "Geannuleerd" } : a))
      );
    } catch (err) {
      setError("Annuleren mislukt.");
    }
  };

  if (!token) return <p style={{ color: "var(--text-muted)" }}>Je moet eerst inloggen</p>;

  return (
    <div>
      <div className="page-header">
        <p className="page-eyebrow">Jouw planning</p>
        <h1 className="page-title">Mijn <em>Afspraken</em></h1>
        <div className="page-divider" />
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: 24 }}>{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
          <span>Laden...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">✦</div>
          <p>Geen afspraken gevonden. Boek je eerste afspraak.</p>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map((a) => (
            <div
              key={a._id}
              className={`appointment-card ${a.status === "Geannuleerd" ? "cancelled" : ""}`}
            >
              <div className="appointment-info">
                <div className="appointment-service">{a.service}</div>
                <div className="appointment-meta">
                  {new Date(a.datum).toLocaleDateString("nl-NL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} &nbsp;·&nbsp; {a.tijd}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className={`appointment-status ${a.status === "Geannuleerd" ? "status-geannuleerd" : "status-gepland"}`}>
                  {a.status}
                </span>

                {a.status !== "Geannuleerd" && (
                  <button className="btn-danger" onClick={() => handleDelete(a._id)}>
                    Annuleer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}