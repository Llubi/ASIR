import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/CamionesForm.module.css";

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
        setMensaje(`❌ ${data.error || "Error al guardar"}`);
        return;
      }

      router.push("/camiones");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error inesperado");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>➕ Nuevo Camión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="matricula"
          placeholder="Matrícula"
          value={form.matricula}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="capacidad"
          type="number"
          placeholder="Capacidad (toneladas)"
          value={form.capacidad}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className={styles.select}
        >
          <option>Disponible</option>
          <option>En ruta</option>
          <option>En mantenimiento</option>
        </select>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">-- Selecciona tipo --</option>
          <option value="FRIGO">FRIGO</option>
          <option value="LONA">LONA</option>
          <option value="MEGA">MEGA</option>
        </select>

        <button type="submit" className={styles.button}>
          Guardar Camión
        </button>

        {mensaje && (
          <p
            className={`text-sm mt-2 ${
              mensaje.startsWith("❌") ? styles.error : styles.success
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </main>
  );
}
