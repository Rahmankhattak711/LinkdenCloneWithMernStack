"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loader from "./components/Loader";
import { getData} from "./utils/api";
import PostPage from "./post/page";
import ThreeDots from "./components/ThreeDots";
import CommentBox from "./components/CommentBox";
import UserInfo from "./components/UserInfo";

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
      <div className="flex items-center flex-col justify-between w-[90%] max-w-[700px] mt-5">
        <PostPage />

        {posts.map((post: Post, index: number,) => (
          <div key={index} className="w-[90%] max-w-[700px] mt-4">
            <div className="rounded-md bg-[#1B1F23] px-6 py-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <UserInfo/>
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

              <CommentBox/>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
