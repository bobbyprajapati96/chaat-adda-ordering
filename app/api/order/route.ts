import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { cart, tableNo } = body;

    const order = await prisma.order.create({
      data: {
        tableNo,
        items: {
          create: cart.map((item: any) => ({
            quantity: item.quantity,
            menuItemId: item.id,
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}