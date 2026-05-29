import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { orderId } = await req.json();

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "Pending") {
    return NextResponse.json(
      { error: "Order can no longer be cancelled" },
      { status: 400 }
    );
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "Cancelled",
    },
  });

  return NextResponse.json(updatedOrder);
}
