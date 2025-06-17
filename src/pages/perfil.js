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
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 text-center">
      <h1 className="text-3xl font-bold">👤 Perfil del Usuario</h1>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
