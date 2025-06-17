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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Registrando...");

    try {
      await axios.post("/api/auth/register", formData);
      setMensaje(
        <div className="text-green-700 font-semibold text-center">
          ✅ Usuario registrado con éxito.
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="/login"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Iniciar sesión
            </a>
            <a
              href="/"
              className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      );
    } catch (err) {
      setMensaje(
        <div className="text-red-600 font-semibold text-center">
          ❌ {err.response?.data?.error || "Error desconocido"}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Crear cuenta
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="TRABAJADOR">Trabajador</option>
            <option value="CLIENTE">Cliente</option>
          </select>

          {formData.rol === "TRABAJADOR" && (
            <input
              type="text"
              name="dni"
              placeholder="DNI (ej: 12345678Z)"
              value={formData.dni}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}

          {formData.rol === "CLIENTE" && (
            <input
              type="text"
              name="vat"
              placeholder="VAT (ej: B12345678)"
              value={formData.vat}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>

        {mensaje && <div className="mt-6 text-sm">{mensaje}</div>}

        <div className="mt-6 text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </a>
        </div>

        <div className="mt-2 text-sm text-center text-gray-600">
          ¿Solo quieres mirar?{" "}
          <a href="/invitado" className="text-blue-600 hover:underline">
            Entra como invitado
          </a>
        </div>
      </div>
    </div>
  );
}
