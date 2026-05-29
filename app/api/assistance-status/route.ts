import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { requestId, status } = body;

    const updatedRequest =
      await prisma.assistanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status,
        },
      });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}