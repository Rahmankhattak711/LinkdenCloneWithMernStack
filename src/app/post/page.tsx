"use client";
import React, { useState, FormEvent } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "../components/buttons/Button";
import InputFailed from "../components/InputFailed";
import axios from "axios";
import toast from 'react-hot-toast';
import { MdClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostPage: React.FC = () => {
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();

  const togglePostInput = (): void => {
    setIsPostOpen(!isPostOpen);
  };

  const toggleEmojiPicker = (): void => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData): void => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: () => axios.post("/api/post", { content: text }),
    onSuccess: (data) => {
      toast.success("Post created successfully!");
      setText(""); 
      setIsPostOpen(false); 
      queryClient.invalidateQueries(['posts']); 
    },
    onError: () => {
      toast.error("Post creation failed");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (text.trim()) {
      createPost();
    } else {
      toast.error("Post content cannot be empty");
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="w-[55%]">
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
                    <MdClose/>
                  </div>
                  <Button type="submit" variant="outline" disabled={isLoading}>
                    {isLoading ? "Posting..." : "Post"}
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
