import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
  });

  return NextResponse.json(order);
}