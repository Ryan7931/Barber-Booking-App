import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await registerUser({ naam, email, password });
    alert(res.msg || "Geregistreerd");
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Naam"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}