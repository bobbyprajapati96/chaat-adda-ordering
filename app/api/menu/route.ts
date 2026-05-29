import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();

  return NextResponse.json(menuItems);
}
