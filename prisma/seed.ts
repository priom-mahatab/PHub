import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!, // e.g. file:./prisma/dev.db
});

const prisma = new PrismaClient({ adapter });

async function main() {
  let apartments = await prisma.category.findFirst({
    where: { name: "Apartments" },
  });

  if (!apartments) {
    apartments = await prisma.category.create({
      data: {
        name: "Apartments",
        fields: {
          create: [
            { name: "Property name", type: "text", required: true, order: 1 },
            { name: "Location", type: "text", required: false, order: 2 },
            { name: "Rent", type: "number", required: false, order: 3 },
            { name: "Google Maps URL", type: "url", required: false, order: 4 },
            { name: "Email", type: "email", required: false, order: 5 },
            { name: "Phone", type: "phone", required: false, order: 6 },
            { name: "Property Website", type: "url", required: false, order: 7 },
          ],
        },
      },
    });
  }

  const titleField = await prisma.fieldDefinition.findFirst({
    where: { categoryId: apartments.id, name: "Property name" },
  });

  if (titleField) {
    await prisma.category.update({
      where: { id: apartments.id },
      data: { titleFieldId: titleField.id },
    });
  }

  console.log("Seeded Apartments category + fields");
}

main().finally(async () => prisma.$disconnect());
