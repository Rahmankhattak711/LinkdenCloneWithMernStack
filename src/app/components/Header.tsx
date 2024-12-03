"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoPeopleSharp, IoNotifications, IoBagRemove } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import Link from "next/link";
import Profile from "../profile/page";
import GetUserImage from "./GetUserImage";
import Notifications from "../notification/page";

export function Header() {
  const [hideProfile, setHideProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideProfileHandler = () => {
    setHideProfile(!hideProfile);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header bg-[#1B1F23] h-16 w-full shadow-sm shadow-gray-600 flex items-center justify-between px-4 sm:px-6 lg:px-10">
      <div className="flex items-center w-full max-w-[1200px] justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="logo" height={50} width={50} />
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden sm:flex gap-8 text-sm">
          <Link className="flex flex-col justify-center items-center" href="/">
            <FaHome className="text-lg" />
            <h5 className="text-xs sm:text-sm">Home</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center" href="/myNetwork">
            <IoPeopleSharp className="text-lg" />
            <h5 className="text-xs sm:text-sm">My Network</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center" href="/job">
            <IoBagRemove className="text-lg" />
            <h5 className="text-xs sm:text-sm">Job</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center" href="/messages">
            <RiMessage2Fill className="text-lg" />
            <h5 className="text-xs sm:text-sm">Messages</h5>
          </Link>
          <Link className="flex flex-col justify-center items-center" href="/">
            <IoNotifications className="text-lg" />
            <Notifications />
          </Link>

          {/* Profile Section */}
          <div onClick={hideProfileHandler} className="flex flex-col justify-center items-center cursor-pointer">
            <GetUserImage />
            <h5 className="text-xs sm:text-sm">Profile</h5>
            {hideProfile && <Profile />}
          </div>
        </div>

        {/* Mobile Menu Button (For smaller screens) */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white flex items-center"
        >
          <span className="text-xl">&#9776;</span> {/* Hamburger Icon */}
        </button>
      </div>

      {/* Mobile Menu (visible when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute w-full self-start flex flex-col gap-2 py-4 px-4 top-16 right-0 z-50 bg-black">
          <Link href="/">
            <h5 className="text-xs sm:text-sm">Home</h5>
          </Link>
          <Link href="/myNetwork">
            <h5 className="text-xs sm:text-sm">My Network</h5>
          </Link>
          <Link href="/job">
            <h5 className="text-xs sm:text-sm">Job</h5>
          </Link>
          <Link href="/messages">
            <h5 className="text-xs sm:text-sm">Messages</h5>
          </Link>
          <Link href="/">
            <Notifications />
          </Link>

          {/* Profile Section */}
          <div
            onClick={hideProfileHandler}
          >
            <GetUserImage />
            <h5 className="text-xs sm:text-sm">Profile</h5>
            {hideProfile && <Profile />}
          </div>
        </div>
      )}
    </header>
  );
}
