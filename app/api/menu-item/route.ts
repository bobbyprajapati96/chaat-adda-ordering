import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, price, category, image } = body;

    const item = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        category,
        image,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.menuItem.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, name, price, category, image } = body;

    const updatedItem = await prisma.menuItem.update({
      where: {
        id,
      },
      data: {
        name,
        price: Number(price),
        category,
        image,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, available } = await req.json();

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: { available },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
