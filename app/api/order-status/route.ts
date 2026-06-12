import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}