import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

interface Like {
    id: string;
  }

export default function Like({id}: Like) {
    const queryClient = useQueryClient();
  const { mutate: handleLikePost, isPending } = useMutation({
    mutationFn: async (id: string) => await axios.post(`/api/like/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post liked successfully!");
    },
    onError: () => {
      toast.error("Failed to like the post.");
    }
  });
  return (
    <div onClick={() => handleLikePost(id)}>Like</div>
  )
}
