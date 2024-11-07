import { getServerSession } from "next-auth/next";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
// import authHandler from "@/app/api/auth/[...nextauth]/route";

type SessionType = {
  user: {
    id: string;
    name?: string;
    email?: string;
  };
};

const prisma = new PrismaClient();

async function getRedirectUrl(session: SessionType | null) {
  if (!session?.user?.email) {
    console.error("User email not found in session.");
    return "/signin";
  }

  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (userData) {
      return `/dashboard/${userData.id}`;
    } else {
      console.error("User not found in database.");
      return "/signin";
    }
  } catch {
    return "/signin";
  }
}

export default async function DashboardRedirect() {
  const session = (await getServerSession(authOption)) as SessionType;

  const redirectUrl = await getRedirectUrl(session);
  return redirect(redirectUrl);
}
