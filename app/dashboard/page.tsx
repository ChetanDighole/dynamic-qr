"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/signin");
    return;
  } else if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center dark:text-white dark:bg-gray-800">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <h1>hello world Dashboard</h1>
    </div>
  );
}
