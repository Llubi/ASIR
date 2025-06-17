import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "",
    dni: "",
    vat: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Registrando...");

    try {
      await axios.post("/api/auth/register", formData);
      setMensaje(
        <>
          ✅ Usuario registrado con éxito.
          <div className="mt-4 flex gap-4 justify-center">
            <a
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Iniciar sesión
            </a>
            <a
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Volver al inicio
            </a>
          </div>
        </>
      );
    } catch (err) {
      setMensaje("❌ " + (err.response?.data?.error || "Error desconocido"));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-3xl font-bold">Registro de Usuario</h1>

      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
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

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="TRABAJADOR">Trabajador</option>
          <option value="CLIENTE">Cliente</option>
        </select>

        {formData.rol === "TRABAJADOR" && (
          <input
            name="dni"
            type="text"
            placeholder="DNI (ej: 12345678Z)"
            value={formData.dni}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
        )}

        {formData.rol === "CLIENTE" && (
          <input
            name="vat"
            type="text"
            placeholder="VAT (ej: B12345678)"
            value={formData.vat}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      {mensaje && <p className="mt-4 text-sm text-center">{mensaje}</p>}

      {/* 🔹 Enlace para invitados visible SIEMPRE */}
      <a
        href="/invitado"
        className="text-blue-600 underline text-sm text-center block mt-6"
      >
        ¿Eres cliente y aún no estás registrado? Entra como invitado
      </a>
    </main>
  );
}
