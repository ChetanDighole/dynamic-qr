import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
      ","
    )[0];

    const loc = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await loc.json();
    // const data = dataJson.data;

    const userData = await prisma.userData.create({
      data: {
        ip,
        city: data.city,
        region: data.region,
        country: data.country,
        userId: Number(id),
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    const redirectUrl = user?.url;

    return NextResponse.redirect(redirectUrl!);
  } catch (error) {
    return NextResponse.json(
      { message: "catch at qrcode route", succuss: false },
      { status: 401 }
    );
  }
}
