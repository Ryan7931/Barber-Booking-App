import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const token = localStorage.getItem("token");

  if (!token) {
    return <p>Je moet eerst inloggen</p>;
  }

  const fetchData = async () => {
    const data = await getAppointments(token);
    setAppointments(data);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id, token);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!token) {
    return <p>Je moet eerst inloggen</p>;
  }

  return (
    <div>
      <h2>Mijn afspraken</h2>

      {appointments.map((a) => (
        <div key={a._id}>
          <p>
            {a.service} - {new Date(a.datum).toLocaleDateString()} - {a.tijd} ({a.status})
          </p>

          {a.status !== "Geannuleerd" && (
            <button onClick={() => handleDelete(a._id)}>
              Annuleer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}