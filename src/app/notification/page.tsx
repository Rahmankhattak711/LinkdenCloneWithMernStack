"use client";
import React, { useState } from "react";

export default function Notifications() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleVisibility}
      >
        {isVisible ? <p className="text-xs sm:text-sm">Close</p> : <p className="text-xs sm:text-sm">Notifications</p>}
      </button>
      {isVisible && (
        <div className="absolute shadow-lg bg-gray-800 text-white rounded-md p-4 w-64 h-auto top-12 z-50">
            <p>No notifications available.</p>
        </div>
      )}
    </div>
  );
}
