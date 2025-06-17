const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🔁 Insertando roles en la base de datos...");

  const roles = ["ADMINISTRADOR", "TRABAJADOR", "CLIENTE"];

  for (const nombre of roles) {
    const existe = await prisma.rol.findUnique({ where: { nombre } });

    if (!existe) {
      await prisma.rol.create({ data: { nombre } });
      console.log(`✅ Rol creado: ${nombre}`);
    } else {
      console.log(`ℹ️ Rol ya existente: ${nombre}`);
    }
  }

  console.log("🎉 Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error al ejecutar seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
