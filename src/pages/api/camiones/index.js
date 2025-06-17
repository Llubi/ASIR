import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const usuario = verificarToken(req); // Le pasamos `req` completo

    // Si es CLIENTE, solo ve camiones disponibles
    if (usuario.rol === "CLIENTE") {
      const disponibles = await prisma.camion.findMany({
        where: { estado: "Disponible" },
      });
      return res.status(200).json(disponibles);
    }

    // Si es ADMINISTRADOR o TRABAJADOR, ve todos los camiones
    if (usuario.rol === "ADMINISTRADOR" || usuario.rol === "TRABAJADOR") {
      const todos = await prisma.camion.findMany();
      return res.status(200).json(todos);
    }

    // Rol desconocido
    return res.status(403).json({ error: "Acceso denegado por rol" });
  } catch (error) {
    console.error("Error al obtener camiones:", error);
    return res.status(401).json({ error: error.message || "No autorizado" });
  }
}
