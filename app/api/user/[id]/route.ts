import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const prisma = new PrismaClient();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "id not found at get user route" },
        { status: 401 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userData) {
      return NextResponse.json({ message: "no user found" }, { status: 401 });
    }

    const { password, ...user } = userData;

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { message: "catch at user id route" },
      { status: 401 }
    );
  }
}
