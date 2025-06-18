import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const decoded = verificarToken(req); 

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol.nombre,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
