"use client";
import Image from "next/image";
import React from "react";
import { FaHome } from "react-icons/fa";
import { IoPeopleSharp, IoNotifications, IoBagRemove } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Profile from "../profile/page";

export function Header() {
  const [hideProfile, setHideProfile] = React.useState(false); 

  const hideProfileHandler = () => {
    setHideProfile(!hideProfile);
  };
  return (
    <header className="header h-14 w-full shadow-sm shadow-gray-600 flex items-center justify-center">
      <div className="flex items-center justify-between w-[80%]">
        <div>
          <Image src={"/images/logo.png"} alt="logo" height={50} width={50} />
        </div>
        <div className="flex gap-8 text-sm">
          <Link className="flex flex-col justify-center items-center " href="/feed">
            <FaHome className="text-lg" />
            <h5>Home</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center " href="/">
            <IoPeopleSharp className="text-lg" />
            <h5>My Network</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center " href="/">
            <IoBagRemove className="text-lg" />
            <h5>Job</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center " href="/">
            <RiMessage2Fill className="text-lg" />
            <h5>Messages</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center " href="/">
            <IoNotifications className="text-lg" />
            <h5>Notifications</h5>
          </Link>
          <div
            onClick={hideProfileHandler}
            className="flex flex-col justify-center items-center"
          >
            <CgProfile className="text-lg cursor-pointer" />
            <h5 className="cursor-pointer">Profile</h5>
            {hideProfile && <Profile />}
          </div>
        </div>
      </div>
    </header>
  );
}
