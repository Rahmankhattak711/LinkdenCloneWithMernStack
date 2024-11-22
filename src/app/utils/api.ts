import axios from "axios";

export const getData = async () => {
  const response = await axios.get("/api/post");
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await axios.delete(`/api/post/${postId}`);
  return response.data;
};

export const likePost = async (postId: string, userId: string) => {
  try {
    const response = await axios.post(`/api/like`, { postId, userId });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error.response?.data || error.message);
    throw error;
  }
};
