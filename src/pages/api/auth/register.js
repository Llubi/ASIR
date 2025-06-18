import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, email, password, rol, dni, vat } = req.body;


  const dniRegex = /^[0-9]{8}[A-Za-z]$/;
  const vatRegex = /^[A-Za-z]{1}[0-9]{8,}$/;

  if (rol === "TRABAJADOR" && (!dni || !dniRegex.test(dni))) {
    return res.status(400).json({
      error: "El DNI debe tener 8 números y una letra. Ej: 12345678Z",
    });
  }

  if (rol === "CLIENTE" && (!vat || !vatRegex.test(vat))) {
    return res.status(400).json({
      error: "El VAT debe comenzar con una letra seguida de al menos 8 números. Ej: B12345678",
    });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await prisma.usuario.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Ya existe un usuario con ese email",
      });
    }

    // Buscar rol en BD
    const rolBuscado = await prisma.rol.findFirst({
      where: { nombre: rol.toUpperCase() },
    });

    if (!rolBuscado) {
      return res.status(400).json({ error: "Rol no válido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuario.create({
      data: {
        nombre,
        email: cleanEmail,
        password: hashedPassword,
        rolId: rolBuscado.id,
        estado: "PENDIENTE", // Se debe activar manualmente por un admin
        dni: dni || null,
        vat: vat || null,
      },
    });

    return res.status(200).json({
      mensaje: "Usuario creado correctamente. En espera de validación por un administrador.",
    });

  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
