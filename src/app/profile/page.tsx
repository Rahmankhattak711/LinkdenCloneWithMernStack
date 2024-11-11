import Image from "next/image";
import React from "react";
import { Button } from "../components/buttons/Button";

export default function Profile() {
  return (
    <div className="bg-[--headerColor] w-64 h-96 shadow-sm top-16 absolute right-52">
      <div className="p-4 flex flex-col gap-4">
        <div className="userimageandname flex items-center gap-4">
          <Image
            src="/images/user.jpg"
            alt="user"
            height={50}
            width={50}
            className="rounded-full"
          />
          <h4 className="font-medium">Rahman khattak</h4>
        </div>
        <Button size="xs" variant="outline">
          View Profile
        </Button>
        <hr />

        <div className="h-20">
          <h1 className="font-medium">Account</h1>
          <p>Manage your Linkdin Account</p>
          <p>Your personal information</p>
          <p>Your activity</p>
        </div>

        <hr />

        <div className="h-20">
          <h1 className="font-medium">Manage</h1>
          <p>Manage your Linkdin Account</p>
          <p>Your personal information</p>
          <p>Your activity</p>
        </div>
      </div>
    </div>
  );
}
