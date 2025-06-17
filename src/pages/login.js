import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-3xl font-bold">Iniciar sesión</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Entrar
        </button>
      </form>
      {mensaje && <p className="mt-4 text-sm">{mensaje}</p>}
 
      {token && (// QUITAR ESTO PARA QUE NO SE MUESTRE EL TOKEN EN PANTALLA    
        <div className="mt-4 text-xs break-all max-w-sm">
          <strong>Token:</strong>
          <div>{token}</div>
        </div>
      )}
    </main>
  );
}
