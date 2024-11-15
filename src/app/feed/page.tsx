"use client";
import PostPage from "../post/page";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/api";

export default function FeedPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  if (isLoading) {
    return <h1>Loading posts...</h1>;
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
          <div key={index}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

