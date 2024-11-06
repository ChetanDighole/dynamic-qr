import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

type SessionType = {
  user: {
    id: string;
    name?: string;
    email?: string;
  };
};

const prisma = new PrismaClient();

export default async function DashboardRedirect() {
  const session = (await getServerSession(authOption)) as SessionType;

  const userData = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (userData) {
    redirect(`/dashboard/${userData?.id}`);
  } else {
    redirect("/signin");
  }

  return null;
}
