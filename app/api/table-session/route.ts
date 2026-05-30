import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tableNo } = await req.json();

    const session = await prisma.tableSession.create({
      data: {
        tableNo,
        status: "Active",
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create table session" },
      { status: 500 }
    );
  }
}