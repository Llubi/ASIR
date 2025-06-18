import jwt from "jsonwebtoken";

export function requireAuth(req, roles = []) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token no proporcionado");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (roles.length > 0 && !roles.includes(payload.rol)) {
      throw new Error("Acceso denegado");
    }

    return payload;
  } catch (err) {
    throw new Error("Token inválido o expirado");
  }
}
