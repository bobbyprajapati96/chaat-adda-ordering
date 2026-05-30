import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const tableNo = Number(searchParams.get("tableNo"));
  const sessionId = Number(searchParams.get("sessionId"));

  if (Number.isNaN(tableNo)) {
    return NextResponse.json(
      { error: "Invalid table number" },
      { status: 400 }
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      tableNo,
      ...(sessionId
        ? {
            sessionId,
          }
        : {}),
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return NextResponse.json(orders);
}
