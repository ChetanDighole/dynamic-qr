"use client";
import DashboardTable from "@/components/DashboardTable";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  //states
  const [qrurl, setQrurl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState({
    id: null,
    email: "",
    name: "",
    password: "",
    url: "",
  });

  const [newUrl, setnewUrl] = useState("");

  //useEffect
  useEffect(() => {
    getQRUrl();
  }, []);

  useEffect(() => {
    getUserData();
  }, [newUrl]);

  //functions
  const downloadQr = () => {
    if (!qrRef.current) {
      console.error("QR code reference is null.");
      return;
    }

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) {
      console.error("Canvas element not found within qrRef.");
      return;
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  async function getQRUrl() {
    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    const baseUrl = fullUrl ? new URL(fullUrl).origin : "";
    const scanUrl = `${baseUrl}/qrcode/${id}`;
    setQrurl(scanUrl);
  }

  async function getUserData() {
    const res = await fetch(`/api/user/${id}`);
    const data = await res.json();
    setUser(data.user);
  }

  async function updateUrl() {
    const data = { id, newUrl };
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data),
    });

    if (res) {
      setnewUrl("");
    }
  }

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

  if (id !== session?.user.id) {
    router.push(`/dashboard/${session?.user.id}`);
    return;
  }

  return (
    <div className="h-auto lg:h-screen w-full">
      <div className="flex justify-between items-center border-b-2 p-4">
        <div>Welcome {session?.user.name}</div>
        <button
          className="p-2 border border-black"
          onClick={() => handleSignout()}
        >
          sign out
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="py-8 px-4">
          <div className="flex flex-col justify-center gap-6 items-center">
            <div ref={qrRef}>
              <QRCodeCanvas value={`${qrurl}`} bgColor="#00000000" />
            </div>
            <div>{user?.url}</div>

            <div className="flex flex-col gap-2">
              <input
                className="p-2 border-2"
                placeholder="Enter new url"
                onChange={(e) => setnewUrl(e.target.value)}
                value={newUrl}
              />
              <button
                onClick={() => updateUrl()}
                className={`w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none
                  ${
                    !newUrl
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
                  }`}
                disabled={newUrl ? false : true}
              >
                Update
              </button>

              <button
                onClick={() => downloadQr()}
                type="button"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* table starts */}
        <div className="w-full overflow-auto">
          <DashboardTable id={Number(id)} />
        </div>
        {/* table ends */}
      </div>
    </div>
  );
}
