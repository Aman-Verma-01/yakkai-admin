"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import React from "react";

interface UserAttributes {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

interface UserData {
  id: number;
  attributes: UserAttributes;
}

interface User {
  data: UserData | null;
}

interface ReportAttributes {
  email: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoneNumber: string;
  user: User;
}

interface ReportData {
  id: number;
  attributes: ReportAttributes;
}

interface ReportResponse {
  data: ReportData;
  meta: Record<string, unknown>;
}

const data: ReportResponse = {
  data: {
    id: 14,
    attributes: {
      email: "ran@gmail.com",
      name: "Ranveer",
      message: "Reposrting Pihu",
      createdAt: "2024-10-07T16:27:32.619Z",
      updatedAt: "2024-10-07T16:27:32.619Z",
      publishedAt: "2024-10-07T16:27:32.615Z",
      phoneNumber: "9015663658",
      user: {
        data: {
          id: 9,
          attributes: {
            username: "Pihu",
            email: "pihu@gmail.com",
            provider: "local",
            confirmed: true,
            blocked: false,
            createdAt: "2024-10-07T15:41:01.369Z",
            updatedAt: "2024-10-07T15:41:01.369Z",
            fullName: "Pihu Sharma",
          },
        },
      },
    },
  },
  meta: {},
};

const ReportUserDetails = () => {
  const params = useParams();
  console.log(params); // Ensure this returns the right params if needed

  return (
    <>
      <div className="text-center font-bold text-2xl mb-4">Report Details</div>
      <div className="m-10 mx-20">
        <div className="font-bold text-xl mb-4">Reported by</div>
        <table className="min-w-full bg-white">
          <tbody>
            <tr>
              <td className="py-2 px-4">Email</td>
              <td className="py-2 px-4">{data?.data?.attributes?.email}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Name</td>
              <td className="py-2 px-4">{data?.data?.attributes?.name}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Message</td>
              <td className="py-2 px-4">{data?.data?.attributes?.message}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Phone Number</td>
              <td className="py-2 px-4">
                {data?.data?.attributes?.phoneNumber}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="m-10 mx-20">
        <div className="font-bold text-xl mb-4">Reported On</div>
        <table className="min-w-full bg-white">
          <tbody>
            <tr>
              <td className="py-2 px-4">Email</td>
              <td className="py-2 px-4">
                {data?.data?.attributes?.user?.data?.attributes?.email}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">Full Name</td>
              <td className="py-2 px-4">
                {data?.data?.attributes?.user?.data?.attributes?.fullName}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">User Name</td>
              <td className="py-2 px-4">
                {data?.data?.attributes?.user?.data?.attributes?.username}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-[500px] flex flex-col justify-center items-center mx-auto">
        <div className="font-bold text-xl mb-4">Send Reply</div>
        <Textarea placeholder="Type your message here." />
        <Button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send Email
        </Button>
      </div>
    </>
  );
};

export default ReportUserDetails;
