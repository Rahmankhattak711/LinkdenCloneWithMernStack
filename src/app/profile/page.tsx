"use client";
import Image from "next/image";
import { Button } from "../components/buttons/Button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/api";

interface User {
  name: string;
  userImage: string;
  _id: string;
}

export default function Profile() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    refetchInterval: 1000,
  });

  const users: User[] = data?.data || [];

  return (
    <div className="w-64 bg-black z-50 h-40 shadow-sm shadow-gray-600 top-16 absolute right-28">
      <div className="p-4 flex flex-col gap-4">
        {users.map((user: User) => (
          <div key={user._id} className="userimageandname flex items-center gap-4">
            <Image
              src={user.userImage}
              alt="User Image"
              height={50}
              width={50}
              className="rounded-full border-[1px] h-[60px] w-[60px]"
            />

            <h4 className="font-medium">{user.name}</h4>
          </div>
        ))}

        <Link href="/view-profile">
          <Button size="xs" as="a" variant="outline">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
