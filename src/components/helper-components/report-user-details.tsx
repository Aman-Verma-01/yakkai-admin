"use client"
import React from "react";

interface User {
  id?: number;
  username?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DataItem {
  id: number;
  email: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoneNumber: string;
  user: User | null;
}

// Destructure the `data` prop inside the component function
const ReportUserDetails: React.FC<{ data: DataItem }> = ({ data }) => {
  return (
    <>
      <div className="text-center font-bold text-xl mb-4">Report Details</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Field</th>
              <th className="py-2 px-4 border-b">Value</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td className="py-2 px-4 border-b">Email</td>
              <td className="py-2 px-4 border-b">{data.email}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Name</td>
              <td className="py-2 px-4 border-b">{data.name}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Message</td>
              <td className="py-2 px-4 border-b">{data.message}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Phone Number</td>
              <td className="py-2 px-4 border-b">{data.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportUserDetails;
