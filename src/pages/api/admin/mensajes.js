import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MensajesInvitados() {
  const [mensajes, setMensajes] = useState([]);
  const [rol, setRol] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const payload = JSON.parse(atob(token.split(".")[1]));
    setRol(payload.rol);
    if (payload.rol !== "ADMINISTRADOR") return router.push("/");

    const fetchMensajes = async () => {
      try {
        const res = await fetch("/api/admin/mensajes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al obtener los mensajes");

        const data = await res.json();
        setMensajes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMensajes();
  }, [router]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📬 Mensajes de Invitados</h1>

      {error && <p className="text-red-600">❌ {error}</p>}

      {mensajes.length === 0 ? (
        <p>No hay mensajes registrados.</p>
      ) : (
        <ul className="space-y-4">
          {mensajes.map((msg) => (
            <li key={msg.id} className="p-4 border rounded shadow">
              <p><strong>Nombre:</strong> {msg.nombre}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              {msg.empresa && <p><strong>Empresa:</strong> {msg.empresa}</p>}
              {msg.interes && <p><strong>Interés:</strong> {msg.interes}</p>}
              <p><strong>Mensaje:</strong> {msg.mensaje}</p>
              <p className="text-sm text-gray-500">📅 {new Date(msg.creadoEn).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
