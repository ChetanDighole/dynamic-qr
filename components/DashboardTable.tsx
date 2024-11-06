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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch(`/api/userdata/${id}`);
    const dataRes = await res.json();
    console.log(dataRes.userData);
    setData(dataRes.userData);
  }

  return (
    <div className="w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg">
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
  );
}
