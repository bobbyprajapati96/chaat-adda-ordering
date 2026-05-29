import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.updateMany({
    where: { name: "Veg Pizza" },
    data: { image: "/images/pizza.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Vada Pav" },
    data: { image: "/images/vadapav.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Veg Burger" },
    data: { image: "/images/burger.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Pav Bhaji" },
    data: { image: "/images/pavbhaji.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Chilli Potato" },
    data: { image: "/images/pizza.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Veg Cheese Sandwich" },
    data: { image: "/images/sandwich.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Chocolate Cold Coffee" },
    data: { image: "/images/coldCoffee.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Cold Coffee" },
    data: { image: "/images/coldCoffee.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Blue Lagoon Mojito" },
    data: { image: "/images/mocktail.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Paneer Pizza" },
    data: { image: "/images/pizza.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Virgin Mojito" },
    data: { image: "/images/mocktail.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Red Sauce Pasta" },
    data: { image: "/images/pasta.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "White Sauce Pasta" },
    data: { image: "/images/pasta.jpg" },
  });

  await prisma.menuItem.updateMany({
    where: { name: "Grilled Sandwich" },
    data: { image: "/images/sandwich.jpg" },
  });

  console.log("Image paths updated");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
