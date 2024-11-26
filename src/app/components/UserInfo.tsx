import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { getUser } from "../utils/api";

interface UserInfoProps {
  name: string;
  userImage: string;
  jobTitle: string;
  _id: string;
}
export default function UserInfo() {
  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    refetchInterval: 1000,
  });

  const user: UserInfoProps[] = userData?.data || [];
  return (
    <div>
      {user.map((user: UserInfoProps) => (
        <div key={user._id} className="flex gap-4 items-center">
          <Image
            src={user.userImage}
            alt="user"
            height={50}
            width={50}
            className="rounded-full border-[1px] h-[50px] w-[50px]"
          />
          <span>
            <h1>{user.name}</h1>
            <p>{user.jobTitle}</p>
          </span>
        </div>
      ))}
    </div>
  );
}
