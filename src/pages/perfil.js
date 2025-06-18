import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const obtenerUsuario = async () => {
      try {
        const res = await fetch("/api/usuarios/me", {
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
        setUsuario(data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        router.push("/login");
      }
    };

    obtenerUsuario();
  }, []);

  if (!usuario) return null;

return (
  <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 Perfil del Usuario</h1>
      <div className="space-y-3 text-left">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
        className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  </main>
);

}
