import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session id required" },
        { status: 400 }
      );
    }

    const session = await prisma.tableSession.update({
      where: {
        id: Number(sessionId),
      },
      data: {
        status: "Closed",
        closedAt: new Date(),
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to close session" },
      { status: 500 }
    );
  }
}
