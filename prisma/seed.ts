// const {PrismaClient} = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.category.deleteMany({});
  try {
    await db.category.createMany({
      data: [
        {name: "famous"},
        {name: "movies"},
        {name: "musicians"},
        {name: "games"},
        {name: "animals"},
        {name: "philosophy"},
        {name: "scientist"},
      ],
    });
  } catch (error) {
    console.error("Error seeding default data", error);
  } finally {
    await db.$disconnect();
  }
}

main();
