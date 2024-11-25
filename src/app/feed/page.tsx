"use client";
// import { CldUploadWidget } from "next-cloudinary";
export default function Home() {
  return (
    <div className="header h-auto w-full flex items-center justify-center">
      <div className="flex items-center justify-between w-[70%]">
        <h1>A Clone of LinkedIn</h1>

        {/* <CldUploadWidget signatureEndpoint={"/api/sign-image"}>
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget> */}
      </div>
    </div>
  );
}

