import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const usuario = verificarToken(req);

    if (usuario.rol !== "ADMINISTRADOR") {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const pendientes = await prisma.usuario.findMany({
      where: { estado: "PENDIENTE" },
      include: { rol: true },
    });

    return res.status(200).json(pendientes);
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
