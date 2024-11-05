import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { message: "no data found in body" },
        { status: 401 }
      );
    }

    const { id, newUrl } = data;

    const idInNumber = Number(id);

    const updateData = await prisma.user.update({
      where: { id: idInNumber },
      data: {
        url: newUrl,
      },
    });

    if (!updateData) {
      return NextResponse.json(
        { message: "unable to post datas" },
        { status: 401 }
      );
    }

    const { password, ...userData } = updateData;

    return NextResponse.json({ userData });
  } catch {
    return NextResponse.json(
      { message: "catch at post route" },
      { status: 401 }
    );
  }
}
