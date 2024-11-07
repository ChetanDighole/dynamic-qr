"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
}

interface UserData {
  id: number;
  ip: string;
  city: string;
  country: string;
  region: string;
  userId: number;
}

export default function DashboardTable({ id }: User) {
  const [data, setData] = useState<UserData[]>([]);
  const [userCount, setUserCount] = useState({
    allUser: "",
    uniqueUser: "",
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch(`/api/userdata/${id}`);
    const dataRes = await res.json();
    setData(dataRes.userData);

    const uniqueUser = new Set(
      dataRes.userData.map((eachEle: any) => eachEle.ip)
    );

    console.log(uniqueUser.size);
    setUserCount({
      allUser: dataRes.userData.length,
      uniqueUser: `${uniqueUser.size}`,
    });

    console.log(userCount);
  }

  return (
    <div className="h-full flex flex-col">
      {/* User Count Boxes */}
      <div className="sticky top-0 z-10 bg-white py-4 shadow-md">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-md">
            All Users: {userCount.allUser}
          </div>
          <div className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-md">
            Unique Users: {userCount.uniqueUser}
          </div>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="flex-1 overflow-y-auto mt-4">
        <table className="min-w-full h-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-center">Sr. No.</th>
              <th className="px-4 py-2 text-center">IP</th>
              <th className="px-4 py-2 text-center">City</th>
              <th className="px-4 py-2 text-center">Country</th>
              <th className="px-4 py-2 text-center">Region</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((data, index) => (
              <tr key={data.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{data.ip}</td>
                <td className="px-4 py-2 text-center">{data.city}</td>
                <td className="px-4 py-2 text-center">{data.country}</td>
                <td className="px-4 py-2 text-center">{data.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
