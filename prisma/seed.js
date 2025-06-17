const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.rol.createMany({
    data: [
      { nombre: "ADMINISTRADOR" },
      { nombre: "TRABAJADOR" },
      { nombre: "CLIENTE" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Roles insertados correctamente ✅");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Error al insertar roles ❌", e);
    return prisma.$disconnect();
  });
