import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const sendMessage = async (userId: string, content: string) => {
  try {
    const res = await axios.post(`/api/messages/send/${userId}`, { content });
    console.log(res.data)
    return res.data;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const useSendMessage = () => {
  const queryClient = useQueryClient();

  const { isError, error, mutate } = useMutation({
    mutationFn: ({ userId, content }: { userId: string; content: string }) => {
      return sendMessage(userId, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.userId] });
    }
  });
  useEffect(() => {
    if(isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return (userId: string, content: string) => {
    mutate({ userId, content });
  };
 
}

export default useSendMessage;