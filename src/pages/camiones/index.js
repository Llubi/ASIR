import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/camiones", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Error al obtener camiones");
        }

        const data = await res.json();

        const payload = JSON.parse(atob(token.split(".")[1]));
        setRol(payload.rol);

        setCamiones(data);
      } catch (err) {
        console.error("Error al cargar camiones:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamiones();
  }, [router]);

  const eliminarCamion = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este camión?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/camiones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setCamiones((prev) => prev.filter((c) => c.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || "Error al eliminar");
      }
    } catch (err) {
      alert("Error de red al eliminar");
    }
  };

  const camionesFiltrados = camiones.filter((c) => {
  const coincideMatricula = c.matricula.toLowerCase().includes(filtroMatricula.toLowerCase());
  const coincideTipo = filtroTipo === "TODOS" || c.tipo === filtroTipo;
  const coincideEstado = filtroEstado === "TODOS" || c.estado === filtroEstado;

  return coincideMatricula && (
    rol === "CLIENTE"
      ? coincideTipo
      : coincideTipo && coincideEstado
  );
});


  if (loading) return <p className="text-center mt-10">Cargando camiones...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">❌ {error}</p>;

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚚 Lista de Camiones</h1>

      {/* 🔍 Filtros visibles según el rol */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          value={filtroMatricula}
          onChange={(e) => setFiltroMatricula(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />

        {rol !== "CLIENTE" && (
          <>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/4"
            >
              <option value="TODOS">Todos los tipos</option>
              <option value="FRIGO">FRIGO</option>
              <option value="LONA">LONA</option>
              <option value="MEGA">MEGA</option>
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/4"
            >
              <option value="TODOS">Todos los estados</option>
              <option value="Disponible">Disponible</option>
              <option value="En ruta">En ruta</option>
              <option value="En mantenimiento">En mantenimiento</option>
            </select>
          </>
        )}
      </div>

      {rol === "ADMINISTRADOR" && (
        <button
          className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push("/camiones/nuevo")}
        >
          ➕ Nuevo Camión
        </button>
      )}

      {camionesFiltrados.length === 0 ? (
        <p>No hay camiones que coincidan con los filtros.</p>
      ) : (
        <ul className="space-y-4">
          {camionesFiltrados.map((camion) => (
            <li key={camion.id} className="border p-4 rounded shadow">
              <p><strong>Matrícula:</strong> {camion.matricula}</p>
              <p><strong>Modelo:</strong> {camion.modelo}</p>
              <p><strong>Capacidad:</strong> {camion.capacidad} TN</p>
              <p><strong>Estado:</strong> {camion.estado}</p>
              <p><strong>Tipo:</strong> {camion.tipo}</p>
<button
  onClick={() => {
    localStorage.removeItem("token");
    router.push("/login");
  }}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 absolute top-4 right-4"
>
  🔒 Cerrar sesión
</button>

              {rol === "ADMINISTRADOR" && (
                <div className="mt-3 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => router.push(`/camiones/editar/${camion.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => eliminarCamion(camion.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
