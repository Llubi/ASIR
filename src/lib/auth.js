import jwt from "jsonwebtoken";

export function verificarToken(req) {
  if (!req || !req.headers) {
    throw new Error("Solicitud inválida");
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token no proporcionado");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, email, rol, etc. }
  } catch (err) {
    throw new Error("Token inválido");
  }
}
