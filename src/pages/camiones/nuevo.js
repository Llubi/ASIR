import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NuevoCamion() {
  const [form, setForm] = useState({
    matricula: "",
    modelo: "",
    capacidad: "",
    estado: "Disponible",
    tipo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkPermiso = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.rol !== "ADMINISTRADOR") {
        alert("Acceso no autorizado");
        router.push("/camiones");
      }
    };

    checkPermiso();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/camiones/nuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(`❌ ${data.error || "Error al crear camión"}`);
        return;
      }

      setMensaje("✅ Camión creado correctamente");
      router.push("/camiones");
    } catch (err) {
      setMensaje("❌ " + err.message);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🆕 Alta de Camión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="matricula"
          placeholder="Matrícula"
          required
          value={form.matricula}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="modelo"
          placeholder="Modelo"
          required
          value={form.modelo}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="capacidad"
          placeholder="Capacidad (TN)"
          type="number"
          required
          value={form.capacidad}
          onChange={handleChange}
          className="p-2 border rounded"
          max="25"
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option>Disponible</option>
          <option>En ruta</option>
          <option>En mantenimiento</option>
        </select>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Selecciona tipo</option>
          <option value="FRIGO">FRIGO</option>
          <option value="LONA">LONA</option>
          <option value="MEGA">MEGA</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Camión
        </button>
        {mensaje && (
          <p
            className={`text-sm text-center mt-2 ${
              mensaje.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </main>
  );
}
