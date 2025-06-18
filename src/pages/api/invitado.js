import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, email, empresa, interes, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const nuevoMensaje = await prisma.mensajeInvitado.create({
      data: {
        nombre,
        email,
        empresa: empresa || null,
        interes: interes || null,
        mensaje,
      },
    });

    return res.status(200).json({ mensaje: "Mensaje guardado correctamente", data: nuevoMensaje });
  } catch (error) {
    console.error("Error guardando mensaje:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
