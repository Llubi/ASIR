// src/pages/login.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Verificando...");

    try {
      const res = await axios.post("/api/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const token = res.data.token;
      setMensaje("✅ Login exitoso");
      localStorage.setItem("token", token);
      router.push("/camiones");
    } catch (err) {
      setMensaje("❌ " + (err.response?.data?.error || "Error desconocido"));
    }
  };

  return (
   <main
  className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8 gap-6"
  style={{ backgroundImage: "url('/camion-bg.jpg')" }}
>
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          🔐 Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
        />
        <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
        />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Entrar
          </button>
        </form>

        {mensaje && (
          <p
            className={`mt-4 text-sm text-center ${
              mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-blue-600 hover:underline font-medium">
            Crear cuenta
          </a>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          <a href="/invitado" className="text-blue-500 hover:underline font-medium">
            Entrar como invitado
          </a>
        </div>
      </div>
    </main>
  );
}
