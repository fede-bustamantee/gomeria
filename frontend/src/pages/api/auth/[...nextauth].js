import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:2030/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();

                    if (!res.ok) {
                        throw new Error(user.error || "Credenciales incorrectas");
                    }

                    // el login es exitoso
                    return user;
                } catch (error) {
                    console.error("Error en la autenticación:", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        jwt: true,
    },
};

export default NextAuth(authOptions);