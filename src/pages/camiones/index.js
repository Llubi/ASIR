import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ListaCamiones() {
  const [camiones, setCamiones] = useState([]);
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

        // Decodificar el token para obtener el rol
        const partes = token.split(".");
        if (partes.length === 3) {
          const payload = JSON.parse(atob(partes[1]));
          setRol(payload.rol);
        }

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

  if (loading) return <p className="text-center mt-10">Cargando camiones...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">❌ {error}</p>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚚 Lista de Camiones</h1>

      {rol === "ADMINISTRADOR" && (
        <button
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push("/camiones/nuevo")}
        >
          ➕ Nuevo Camión
        </button>
      )}

      {camiones.length === 0 ? (
        <p>No hay camiones disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {camiones.map((camion) => (
            <li key={camion.id} className="border p-4 rounded">
              <p><strong>Matrícula:</strong> {camion.matricula}</p>
              <p><strong>Modelo:</strong> {camion.modelo}</p>
              <p><strong>Capacidad:</strong> {camion.capacidad} TN</p>
              <p><strong>Estado:</strong> {camion.estado}</p>
              <p><strong>Tipo:</strong> {camion.tipo}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
