"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { data: session } = useSession(); // Get the session data directly
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    } else {
      router.push("/signin");
    }
  }, [session, router]);

  return null;
}
