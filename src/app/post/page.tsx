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

  const togglePostInput = (): void => {
    setIsPostOpen(!isPostOpen);
  };

  const toggleEmojiPicker = (): void => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData): void => {
    setText((prevText) => prevText + emojiObject.emoji);
  };


  const {  isError, mutate: datafunction, error } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/post", { content: text });
      return response.data;
    },
  })

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
    <div className="relative w-full flex justify-center items-center">
      <div className="w-[55%] flex gap-4">
      <Image
            src="/images/user.png"
            alt="user"
            height={50}
            width={50}
            className="rounded-full border-[1px] p-1 h-[60px] w-[60px]"
          />
        <InputFailed onClick={togglePostInput} />

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
                className="w-[50%] h-[60%] bg-black border-gray-600 border-[1px] rounded-md relative p-5"
              >
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write something..."
                  className="w-full h-72 p-4 shadow-md bg-black rounded-lg resize-none focus:outline-none"
                ></textarea>

                <div className="flex gap-4 justify-between border-t-[1px] border-gray-600 pt-3">
                  <Button onClick={toggleEmojiPicker}>🥰</Button>

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
                    className="absolute top-5 right-5 border-gray-600 border-[1px] p-1"
                  >
                    <MdClose />
                  </div>
                  <Button type="submit" variant="outline">
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
