import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const prisma = new PrismaClient();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "id not found at get userData route" },
        { status: 401 }
      );
    }

    const userData = await prisma.userData.findMany({
      where: {
        userId: Number(id),
      },
    });

    if (!userData) {
      return NextResponse.json(
        { message: "no userData found" },
        { status: 401 }
      );
    }

    return NextResponse.json({ userData });
  } catch {
    return NextResponse.json(
      { message: "catch at userData route", success: false },
      {
        status: 401,
      }
    );
  }
}
