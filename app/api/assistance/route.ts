import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { tableNo, request } = body;

    const assistance =
      await prisma.assistanceRequest.create({
        data: {
          tableNo,
          request,
        },
      });

    return NextResponse.json(assistance);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}