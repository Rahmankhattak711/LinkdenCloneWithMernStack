"use client";
import React, { useState, FormEvent } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "../components/buttons/Button";
import InputFailed from "../components/InputFailed";
import axios from "axios";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";

const PostPage: React.FC = () => {
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const togglePostInput = (): void => {
    setIsPostOpen(!isPostOpen);
  };

  const toggleEmojiPicker = (): void => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData): void => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const {
    isError,
    mutate: datafunction,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/post", {
        content: text,
        image: image,
        video: video,
      });
      return response.data;
    },
  });

  if (isError) {
    return <div>Error...</div>;
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (text.trim()) {
      datafunction();
    } else {
      toast.error("Post content cannot be empty");
    }
  };

  return (
    <div className="relative  w-full flex justify-center items-center">
      <div className="w-[55%] bg-[#1B1F23] flex gap-4">
        <Image
          src="/images/user.png"
          alt="user"
          height={50}
          width={50}
          className="rounded-full border-[1px] h-[55px] w-[55px]"
        />
        <InputFailed
          onClick={togglePostInput}
          type="text"
          placeholder="What's on your mind?"
        />

        {isPostOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black opacity-40"
              onClick={togglePostInput}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 flex justify-center items-start top-10 z-50">
              <form
                onSubmit={handleSubmit}
                className="w-[50%] h-auto bg-black border-gray-600 border-[1px] rounded-md relative p-5 "
              >
                <Image
                  src="/images/user.png"
                  alt="user"
                  height={50}
                  width={50}
                  className="rounded-full border-[1px] h-[55px] w-[55px]"
                />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write something..."
                  className="w-full h-28 pt-4 shadow-md bg-black rounded-lg resize-none focus:outline-none"
                ></textarea>

                <InputFailed
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                  placeholder="Add Image Url"
                  className="border-[1px] border-gray-600 rounded-md mb-4"
                />

                <InputFailed
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  type="text"
                  placeholder="Add Video Url"
                  className="border-[1px] border-gray-600 rounded-md mb-4"
                />

                <div className="flex gap-4 justify-between border-t-[1px] border-gray-600 pt-3 bottom-5">
                  <Button variant="secondary" onClick={toggleEmojiPicker}>
                    Emojes 🥰
                  </Button>

                  {isEmojiPickerOpen && (
                    <div className="absolute bottom-20 left-5">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        height={300}
                        className="overflow-y-scroll"
                      />
                    </div>
                  )}

                  <div
                    onClick={togglePostInput}
                    className="absolute top-5 right-5 rounded-full border-gray-600 border-[1px] p-1"
                  >
                    <MdClose className="text-1xl" />
                  </div>
                  <Button type="submit" variant="secondary">
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
