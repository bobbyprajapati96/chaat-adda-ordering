import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { cart, tableNo, sessionId } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        tableNo: Number(tableNo),
        sessionId: sessionId ? Number(sessionId) : null,
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
