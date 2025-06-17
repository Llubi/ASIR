import { useEffect, useState } from "react";
import axios from "axios";

export default function UsuariosPendientes() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargar = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/usuarios-pendientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      setMensaje("❌ No tienes acceso o hubo un error");
    }
  };

  const manejarAccion = async (id, accion) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/admin/validar-usuario", { id, accion }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje("✅ Acción realizada");
      cargar();
    } catch (err) {
      setMensaje("❌ Error al realizar la acción");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛂 Usuarios pendientes de validación</h1>
      {mensaje && <p className="mb-4">{mensaje}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">DNI/VAT</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.nombre}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.rol.nombre}</td>
              <td className="p-2">{u.dni || u.vat || "-"}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => manejarAccion(u.id, "ACTIVAR")}
                >
                  Activar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => manejarAccion(u.id, "ELIMINAR")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
