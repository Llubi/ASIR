import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const usuario = verificarToken(req);
    if (usuario.rol !== "ADMINISTRADOR") {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const { matricula, modelo, capacidad, estado, tipo } = req.body;
    if (!matricula || !modelo || !capacidad || !estado || !tipo) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const capacidadNumerica = parseFloat(capacidad);
    if (isNaN(capacidadNumerica) || capacidadNumerica <= 0 || capacidadNumerica > 25) {
      return res.status(400).json({ error: "Capacidad inválida" });
    }

    const nuevo = await prisma.camion.create({
      data: { matricula, modelo, capacidad: capacidadNumerica, estado, tipo },
    });

    return res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear camión:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}