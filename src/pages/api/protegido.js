import { verificarToken } from "@/lib/auth";

export default function handler(req, res) {
  try {
    const usuario = verificarToken(req); // Validamos y obtenemos datos del token
    return res.status(200).json({
      mensaje: "✅ Acceso permitido a contenido protegido",
      usuario,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
