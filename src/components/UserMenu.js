import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UserMenu() {
  const [usuario, setUsuario] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        }
      } catch (err) {
        console.error("Error al obtener usuario", err);
      }
    };

    fetchUser();
  }, []);

  if (!usuario) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setAbierto(!abierto)}
        className="flex items-center gap-2 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
      >
        {usuario.nombre}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {abierto && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              router.push("/perfil");
              setAbierto(false);
            }}
          >
            Ver perfil
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
