import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocketContext } from "../contexts/SocketContext";

const fetchMessages = async (userId: string) => {
  try {
    const res = await axios.get(`/api/messages/${userId}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch messages");
  }
};

const useGetMessages = (userId: string) => {
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  const { isError, error, data, isLoading } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [error, isError]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;

      queryClient.setQueryData(["messages", userId], (oldMessages: any) => {
        return oldMessages ? [...oldMessages, newMessage] : [newMessage];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, queryClient, userId]);

  return { isLoading, data };
};

export default useGetMessages;
