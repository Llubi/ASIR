import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditarCamion() {
  const [form, setForm] = useState({
    matricula: "",
    modelo: "",
    capacidad: "",
    estado: "Disponible",
    tipo: "", // ✅ Asegúrate de incluirlo
  });

  const [mensaje, setMensaje] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!id) return;

    const cargarCamion = async () => {
      try {
        const res = await fetch(`/api/camiones/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setForm(data);
        } else {
          setMensaje(`❌ ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        setMensaje("❌ Error al cargar camión");
      }
    };

    cargarCamion();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/camiones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(`❌ ${data.error || "Error al actualizar"}`);
        return;
      }

      setMensaje("✅ Camión actualizado correctamente");
      router.push("/camiones");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error inesperado");
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Editar Camión</h1>
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
          type="number"
          min="1"
          max="25"
          step="0.1"
          placeholder="Capacidad (toneladas)"
          required
          value={form.capacidad}
          onChange={handleChange}
          className="p-2 border rounded"
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
        >
          <option value="">-- Seleccionar tipo --</option>
          <option value="FRIGO">FRIGO</option>
          <option value="LONA">LONA</option>
          <option value="MEGA">MEGA</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
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
