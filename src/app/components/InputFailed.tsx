import React from 'react'

export default function InputFailed({...props}) {
  return (
    <input
    {...props}
    type="text"
    placeholder="What's on your mind?"
    className="w-full p-3 cursor-pointer bg-black border-gray-600 border-[1px] rounded-full focus:outline-none"
  />
  )
}
