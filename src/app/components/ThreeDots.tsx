import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../utils/api";
import Loader from "./Loader";

export default function ThreeDots({ postId }: { postId: string }) {
  const [dotShow, setDotShow] = React.useState(false);
  // const queryClient = useQueryClient();

  // const { mutate: handleDeletePost, isLoading } = useMutation({
  //   mutationFn: () => deletePost(postId),
  // });

  const handleShowDot = () => {
    setDotShow(!dotShow);
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className="relative">
      <BsThreeDots
        onClick={handleShowDot}
        className="text-2xl cursor-pointer"
      />
      {dotShow && (
        <div className="h-auto p-4 absolute w-36 bg-black border-[1px] rounded-md border-gray-600 right-0">
          <h1
            className="cursor-pointer"
          >
            Delete Post
          </h1>
        </div>
      )}
    </div>
  );
}
