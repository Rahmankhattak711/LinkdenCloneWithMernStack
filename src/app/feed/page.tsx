"use client";
import PostPage from "../post/page";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/api";
import Loader from "../components/Loader";
import Image from "next/image";
import ThreeDots from "../components/ThreeDots";

export default function FeedPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <h1>
        <Loader />
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
          <div key={index} className="w-[55%] mt-4">
            <div className="rounded-md bg-[#1B1F23] px-6 py-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/images/user.png"
                    alt="user"
                    height={50}
                    width={50}
                    className="rounded-full border-[1px] p-1 h-[60px] w-[60px]"
                  />

                  <span>
                    <h1>Rahman Ullah</h1>
                    <p>Full Stack Developer</p>
                  </span>
                </div>

                <div>
                  <ThreeDots postId={post._id} />
                </div>
              </div>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-28 object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
