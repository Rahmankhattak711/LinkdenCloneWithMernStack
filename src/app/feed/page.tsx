"use client";
import PostPage from "../post/page";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/api";
import Loader from "../components/Loader";
import Image from "next/image";
import ThreeDots from "../components/ThreeDots";
import Like from "../components/Like";

interface Post {
  _id: string;
  content: string;
  image?: string;
  video?: string;
}

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

  const posts: Post[] = data?.data || [];


  return (
    <div className="h-auto w-full flex items-center justify-center">
      <div className="flex items-center flex-col justify-between w-[80%] mt-5">
        <PostPage />

        {posts.map((post: Post, index: number) => (
          <div key={index} className="w-[55%] mt-4">
            <div className="rounded-md bg-[#1B1F23] px-6 py-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/images/user.png"
                    alt="user"
                    height={50}
                    width={50}
                    className="rounded-full border-[1px] h-[50px] w-[50px]"
                  />
                  <span>
                    <h1>Rahman Ullah</h1>
                    <p>Full Stack Developer</p>
                  </span>
                </div>
                <div>
                  <ThreeDots id={post._id} />
                </div>
              </div>
              <p>{post.content}</p>
              {post.image && (
                <Image
                  src={post.image}
                  alt="post"
                  height={500}
                  width={500}
                  className="w-full h-auto object-cover"
                />
              )}

              {post.video && (
                <video
                  src={post.video}
                  controls
                  autoPlay
                  loop
                  typeof="video/mp4"
                  className="w-full h-auto object-cover"
                />
              )}

              {/* Like Button */}
              <div className="flex items-center mt-2">
                <Like id={post._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
