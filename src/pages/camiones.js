import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Camiones() {
  const [camiones, setCamiones] = useState([]);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const camionesPorPagina = 6;

  const router = useRouter();

  const cargarCamiones = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/camiones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setTodos(data);
      setPagina(1); // reinicia a página 1
    } catch (err) {
      setError("Error al cargar los camiones");
      console.error(err);
    }
  };

  const eliminarCamion = async (id) => {
    const confirmar = confirm("¿Estás seguro de que quieres eliminar este camión?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/camiones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) cargarCamiones();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    cargarCamiones();
  }, []);

  useEffect(() => {
    const texto = busqueda.toLowerCase();

    const filtrados = todos.filter((c) => {
      const matricula = c.matricula?.toLowerCase() || "";
      const modelo = c.modelo?.toLowerCase() || "";
      const estado = c.estado?.toLowerCase() || "";

      const coincideTexto =
        matricula.includes(texto) ||
        modelo.includes(texto) ||
        estado.includes(texto);

      const coincideEstadoSelect =
        estadoFiltro === "Todos" || c.estado === estadoFiltro;

      return coincideTexto && coincideEstadoSelect;
    });

    const inicio = (pagina - 1) * camionesPorPagina;
    const fin = inicio + camionesPorPagina;
    setCamiones(filtrados.slice(inicio, fin));
  }, [busqueda, estadoFiltro, pagina, todos]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">🚛 Camiones</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por matrícula, modelo o estado..."
            className="p-2 border rounded"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option>Todos</option>
            <option>Disponible</option>
            <option>En ruta</option>
            <option>En mantenimiento</option>
          </select>
        </div>
        <a
          href="/camiones/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Nuevo camión
        </a>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {camiones.length === 0 ? (
        <p className="text-gray-500">No hay camiones que coincidan.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {camiones.map((camion) => (
            <div
  key={camion.id}
  className="border rounded-lg p-4 shadow hover:shadow-md transition"
>
  <h2 className="text-xl font-semibold">{camion.modelo}</h2>
  <p><strong>Matrícula:</strong> {camion.matricula}</p>
  <p><strong>Capacidad:</strong> {camion.capacidad} toneladas</p>
  <p><strong>Estado:</strong> {camion.estado}</p>
  <p><strong>Tipo:</strong> {camion.tipo}</p>

  <div className="flex gap-2 mt-4">
    <button
      onClick={() => router.push(`/camiones/editar/${camion.id}`)}
      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Editar
    </button>
    <button
      onClick={() => eliminarCamion(camion.id)}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
    >
      Eliminar
    </button>
  </div>
</div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {todos.filter((c) =>
        c.matricula?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.modelo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.estado?.toLowerCase().includes(busqueda.toLowerCase())
      ).length > camionesPorPagina && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPagina((prev) => Math.max(1, prev - 1))}
            disabled={pagina === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            ← Anterior
          </button>

          <button
            onClick={() => {
              const totalFiltrados = todos.filter((c) =>
                c.matricula?.toLowerCase().includes(busqueda.toLowerCase()) ||
                c.modelo?.toLowerCase().includes(busqueda.toLowerCase()) ||
                c.estado?.toLowerCase().includes(busqueda.toLowerCase())
              ).length;
              const totalPaginas = Math.ceil(totalFiltrados / camionesPorPagina);
              setPagina((prev) => Math.min(totalPaginas, prev + 1));
            }}
            disabled={
              pagina >= Math.ceil(
                todos.filter((c) =>
                  c.matricula?.toLowerCase().includes(busqueda.toLowerCase()) ||
                  c.modelo?.toLowerCase().includes(busqueda.toLowerCase()) ||
                  c.estado?.toLowerCase().includes(busqueda.toLowerCase())
                ).length / camionesPorPagina
              )
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </main>
  );
}
