import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    verificarToken(req);

    const { matricula, modelo, capacidad, estado, tipo } = req.body;

    // Validación de campos obligatorios
    if (!matricula || !modelo || !capacidad || !estado || !tipo) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const capacidadNumerica = parseFloat(capacidad);

    if (isNaN(capacidadNumerica) || capacidadNumerica <= 0 || capacidadNumerica > 25) {
      return res.status(400).json({ error: "La capacidad debe estar entre 1 y 25 toneladas" });
    }

    const tiposValidos = ["FRIGO", "LONA", "MEGA"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ error: "Tipo de camión inválido" });
    }

    const nuevo = await prisma.camion.create({
      data: {
        matricula,
        modelo,
        capacidad: capacidadNumerica,
        estado,
        tipo,
      },
    });

    return res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear camión:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Ya existe un camión con esa matrícula" });
    }

    return res.status(500).json({ error: "Error al crear camión" });
  }
}
