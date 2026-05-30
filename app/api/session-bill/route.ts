import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sessionId = Number(searchParams.get("sessionId"));

  if (Number.isNaN(sessionId)) {
    return NextResponse.json(
      { error: "Invalid session id" },
      { status: 400 }
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      sessionId,
      status: {
        in: ["Pending", "Preparing", "Ready To Serve", "Completed"],
      },
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const billItems: Record<
    string,
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  > = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const key = item.menuItem.name;

      if (!billItems[key]) {
        billItems[key] = {
          name: item.menuItem.name,
          quantity: 0,
          price: item.menuItem.price,
          total: 0,
        };
      }

      billItems[key].quantity += item.quantity;
      billItems[key].total += item.quantity * item.menuItem.price;
    });
  });

  const items = Object.values(billItems);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return NextResponse.json({
    sessionId,
    ordersCount: orders.length,
    items,
    totalAmount,
  });
}