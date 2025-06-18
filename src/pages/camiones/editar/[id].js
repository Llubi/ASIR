import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/CamionesForm.module.css";

export default function EditarCamion() {
  const [form, setForm] = useState({
    matricula: "",
    modelo: "",
    capacidad: "",
    estado: "Disponible",
    tipo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [rol, setRol] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setRol(payload.rol);

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
    if (rol !== "ADMINISTRADOR") return;

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
    <main className={styles.container}>
      <h1 className={styles.title}>✏️ Editar Camión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="matricula"
          placeholder="Matrícula"
          value={form.matricula}
          onChange={handleChange}
          className={styles.input}
          disabled={rol !== "ADMINISTRADOR"}
          required
        />
        <input
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
          className={styles.input}
          disabled={rol !== "ADMINISTRADOR"}
          required
        />
        <input
          name="capacidad"
          type="number"
          placeholder="Capacidad (toneladas)"
          value={form.capacidad}
          onChange={handleChange}
          className={styles.input}
          disabled={rol !== "ADMINISTRADOR"}
          required
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className={styles.select}
          disabled={rol !== "ADMINISTRADOR"}
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
          disabled={rol !== "ADMINISTRADOR"}
          required
        >
          <option value="">-- Selecciona tipo --</option>
          <option value="FRIGO">FRIGO</option>
          <option value="LONA">LONA</option>
          <option value="MEGA">MEGA</option>
        </select>

        {rol === "ADMINISTRADOR" && (
          <button type="submit" className={styles.button}>
            Guardar cambios
          </button>
        )}

        {rol !== "ADMINISTRADOR" && (
          <p className={styles.readonly}>Solo los administradores pueden guardar cambios.</p>
        )}

        {mensaje && (
          <p
            className={`${styles.message} ${
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
