"use client";
import PostPage from "../post/page";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/api";
import { LuLoader, LuLoader2 } from "react-icons/lu";

export default function FeedPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <h1>
        <LuLoader2 className="animate-spin text-4xl absolute top-1/2 left-1/2 right-1/2" />
      </h1>
    );
  }

  if (isError) {
    return <h1>Error loading posts.</h1>;
  }

  const posts = data?.data || [];

  return (
    <div className="header h-auto w-full flex items-center justify-center">
      <div className="flex items-center flex-col justify-between w-[80%] mt-6">
        <PostPage />

        {posts.map((post: any, index: number) => (
          <div className="w-[55%]  mt-4">
            <div
              key={index}
              className="rounded-md border-gray-600 border-[1px]"
            >
              <p className="p-4">{post.content}</p>
              <img src={post?.image} alt="post" className="w-full h-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
