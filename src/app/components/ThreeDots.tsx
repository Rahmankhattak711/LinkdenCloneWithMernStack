import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface ThreeDotsProps {
  id: string;
}

export default function ThreeDots({ id }: ThreeDotsProps) {
  const [dotShow, setDotShow] = React.useState(false);
  const queryClient = useQueryClient();

  const handleShowDot = () => {
    setDotShow(!dotShow);
  };

  const { mutate: handleDeletePost, isPending } = useMutation({
    mutationFn: async () => await axios.delete(`/api/post/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post deleted successfully!");

      setDotShow(false);
    },
  });

  if(isPending){
    return (
      <h1>
        <Loader/>
      </h1>
    )
  }

  return (
    <div className="relative">
      {/* Three Dots Icon */}
      <BsThreeDots
        onClick={handleShowDot}
        className="text-2xl cursor-pointer"
      />

      {/* Dropdown Menu */}
      {dotShow && (
        <div className="h-auto px-3 py-2 absolute w-56 bg-black border-[1px] rounded-md border-gray-600 right-0">
          <h1
            className="cursor-pointer text-red-500 hover:underline"
            onClick={() => handleDeletePost()}
          >
            Delete Post
          </h1>
        </div>
      )}
    </div>
  );
}
