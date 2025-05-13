"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Utiliza la función signIn de NextAuth para enviar
        const result = await signIn("credentials", {
            redirect: false, // No redirige automáticamente al login exitoso
            email,
            password,
        });

        if (result.error) {
            setError(result.error); // Mostrar el error en caso de que falle el login
        } else {
            window.location.href = "/"; // Redirige si el login es exitoso
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    <div className="container-input">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
