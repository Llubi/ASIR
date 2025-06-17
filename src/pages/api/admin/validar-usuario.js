import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const admin = verificarToken(req);

    if (admin.rol !== "ADMINISTRADOR") {
      return res.status(403).json({ error: "Solo administradores pueden validar usuarios" });
    }

    const { id, accion } = req.body;

    if (!id || !["ACTIVAR", "ELIMINAR"].includes(accion)) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    if (accion === "ACTIVAR") {
      await prisma.usuario.update({
        where: { id },
        data: { estado: "ACTIVO" },
      });
    } else if (accion === "ELIMINAR") {
      await prisma.usuario.delete({
        where: { id },
      });
    }

    return res.status(200).json({ mensaje: "Acción realizada correctamente" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}
