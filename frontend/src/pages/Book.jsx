import { useState } from "react";
import { createAppointment } from "../services/api";

export default function Book() {
  const [datum, setDatum] = useState("");
  const [tijd, setTijd] = useState("");
  const [service, setService] = useState("Knip");

  const handleBook = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Je moet eerst inloggen");
      window.location.href = "/login";
      return;
    }

    const res = await createAppointment(
      { datum, tijd, service },
      token
    );

    console.log(res);

    alert("Afspraak gemaakt");
    window.location.href = "/appointments";
  };

  return (
    <div>
      <h2>Boek afspraak</h2>

      <input
        type="date"
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
      />

      <input
        type="time"
        value={tijd}
        onChange={(e) => setTijd(e.target.value)}
      />

      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option>Knip</option>
        <option>Fade</option>
        <option>Baard</option>
      </select>

      <button onClick={handleBook}>Boek</button>
    </div>
  );
}