import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSocketContext } from "../contexts/SocketContext";
import { MessagesData, Message } from "../types/message";


const fetchMessages = async (userId: string | undefined):Promise<MessagesData> => {
  try {
    const res = await axios.get(`/api/messages/${userId}`);
    return res.data;
  } catch (err: unknown) {
    if(err instanceof AxiosError) {
      throw new Error(err.response?.data?.message);
    }
    else {
      throw new Error("Failed to fetch messages");
    }
  }
};

const useGetMessages = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  const { isError, error, data, isLoading } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId),
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [error, isError]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      queryClient.setQueryData(
        ['messages', userId],
        (cacheData: MessagesData) => ({
          ...cacheData,
          messages: [...cacheData.messages, newMessage],
        })
      );
      console.log('new message received', newMessage);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, queryClient, userId]);

  return { isLoading, data };
};

export default useGetMessages;
