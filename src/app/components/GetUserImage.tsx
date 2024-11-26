import Image from "next/image";
import React from "react";
import { getUser } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

interface User {
  userImage: string;
  _id: string; 
}

export default function GetUserImage({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    refetchInterval: 1000,
  });

  const users: User[] = data?.data || [];

  return (
    <div>
      {users.map((user) => (
        <Image
          key={user._id}
          alt="User Image"
          height={50}
          width={50}
          src={user.userImage}
          className={`rounded-full cursor-pointer w-4 ${className}`}
        />
      ))}
    </div>
  );
}
