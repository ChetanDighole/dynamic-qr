import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }),
});

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await req.json();

    const validateData = signupSchema.safeParse(body);

    if (!validateData.success) {
      return NextResponse.json({
        body: body,
        success: false,
        errors: validateData.error.format(),
      });
    }

    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 401 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        {
          message: "unable to create new user",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      { message: "user created successfully", success: true, user: newUser },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "unable to post data for singup route",
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}
