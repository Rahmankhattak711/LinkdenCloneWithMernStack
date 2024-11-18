import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function InputFailed({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={` ${className} w-full p-3 cursor-pointer bg-black border-gray-600 border-[1px] rounded-full focus:outline-none`}
    />
  );
}
