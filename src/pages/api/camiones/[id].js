import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  const { id } = req.query;
  const camionId = parseInt(id);
  if (isNaN(camionId)) return res.status(400).json({ error: "ID inválido" });

  try {
    const usuario = verificarToken(req);

    if (req.method === "GET") {
      const camion = await prisma.camion.findUnique({ where: { id: camionId } });
      if (!camion) return res.status(404).json({ error: "Camión no encontrado" });
      return res.status(200).json(camion);
    }

    if (["PUT", "DELETE"].includes(req.method)) {
      if (usuario.rol !== "ADMINISTRADOR") {
        return res.status(403).json({ error: "No autorizado" });
      }
    }

    if (req.method === "PUT") {
      const { matricula, modelo, capacidad, estado, tipo } = req.body;
      if (!matricula || !modelo || !capacidad || !estado || !tipo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }
      const capacidadNumerica = parseFloat(capacidad);
      if (isNaN(capacidadNumerica) || capacidadNumerica <= 0 || capacidadNumerica > 25) {
        return res.status(400).json({ error: "Capacidad inválida" });
      }
      const actualizado = await prisma.camion.update({
        where: { id: camionId },
        data: { matricula, modelo, capacidad: capacidadNumerica, estado, tipo },
      });
      return res.status(200).json(actualizado);
    }

    if (req.method === "DELETE") {
      const eliminado = await prisma.camion.delete({ where: { id: camionId } });
      return res.status(200).json({ mensaje: "Camión eliminado", eliminado });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en camiones/[id]:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}