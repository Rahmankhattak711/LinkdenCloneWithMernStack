import axios from "axios";

export const getData = async () => {
  const response = await axios.get("/api/post");
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await axios.delete(`/api/post/${postId}`);
  return response.data;
};