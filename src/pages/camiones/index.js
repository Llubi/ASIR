import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Carrusel from "@/components/Carrusel";
import styles from "@/styles/CamionesIndex.module.css";

export default function ListaCamiones() {
  const [camiones, setCamiones] = useState([]);
  const [filtroMatricula, setFiltroMatricula] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCamiones = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await fetch("/api/camiones", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error((await res.json()).error || "Error al obtener camiones");

        const data = await res.json();
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRol(payload.rol);
        setCamiones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCamiones();
  }, [router]);

  const eliminarCamion = async (id) => {
    if (rol !== "ADMINISTRADOR") return;
    if (!confirm("¿Estás seguro de eliminar este camión?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/camiones/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setCamiones((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  const camionesFiltrados = camiones.filter((c) => {
    const m = c.matricula.toLowerCase().includes(filtroMatricula.toLowerCase());
    const t = filtroTipo === "TODOS" || c.tipo === filtroTipo;
    const e = filtroEstado === "TODOS" || c.estado === filtroEstado;
    return m && (rol === "CLIENTE" ? t : t && e);
  });

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>🚛 Flota de Camiones</h1>

        <Carrusel />

        <div className={styles.filtros}>
          <input
            type="text"
            placeholder="Buscar matrícula..."
            value={filtroMatricula}
            onChange={(e) => setFiltroMatricula(e.target.value)}
            className={styles.input}
          />
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className={styles.select}>
            <option value="TODOS">Todos los tipos</option>
            <option value="FRIGO">FRIGO</option>
            <option value="LONA">LONA</option>
            <option value="MEGA">MEGA</option>
          </select>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className={styles.select}>
            <option value="TODOS">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="En ruta">En ruta</option>
            <option value="En mantenimiento">En mantenimiento</option>
          </select>
        </div>

        {rol === "ADMINISTRADOR" && (
          <button
            className={styles.addButton}
            onClick={() => router.push("/camiones/nuevo")}
          >
            ➕ Añadir Camión
          </button>
        )}

        <div className={styles.grid}>
          {camionesFiltrados.map((camion) => (
            <div key={camion.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{camion.matricula}</h2>
              <p><strong>Modelo:</strong> {camion.modelo}</p>
              <p><strong>Capacidad:</strong> {camion.capacidad} TN</p>
              <p><strong>Estado:</strong> {camion.estado}</p>
              <p><strong>Tipo:</strong> {camion.tipo}</p>
              <p><strong>Ruta:</strong> {camion.ruta || "No asignada"}</p>
              <p><strong>Chofer:</strong> {camion.chofer || "Sin asignar"}</p>

              {rol === "ADMINISTRADOR" && (
                <div className={styles.cardActions}>
                  <button onClick={() => router.push(`/camiones/editar/${camion.id}`)} className={styles.editButton}>Editar</button>
                  <button onClick={() => eliminarCamion(camion.id)} className={styles.deleteButton}>Eliminar</button>
                </div>
              )}
              {rol === "TRABAJADOR" && (
                <div className={styles.readOnly}>Solo lectura</div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
