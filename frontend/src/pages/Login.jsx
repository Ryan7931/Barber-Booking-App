import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = await loginUser({ email, password });

        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Ingelogd!");
        } else {
            alert("Login mislukt");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}