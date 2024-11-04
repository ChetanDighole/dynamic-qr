"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

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
      <div className="flex justify-between items-center">
        <div>Welcome {session?.user.name}</div>
        <button
          className="p-2 border border-black"
          onClick={() => handleSignout()}
        >
          sign out
        </button>
      </div>
    </div>
  );
}
