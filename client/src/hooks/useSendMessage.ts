import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const sendMessage = async (userId: string, content: string) => {
  const res = await axios.post(`/api/messages/send/${userId}`, { content });
  return res.data;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  const { isError, error, mutate } = useMutation({
    mutationFn: ({ userId, content }: { userId: string; content: string }) => {
      return sendMessage(userId, content);
    },
    onMutate: async ({ userId, content }) => {
      const tempId = Date.now().toString();
      const optimisticMessage = {
        id: tempId,
        content,
        createdAt: new Date().toISOString(),
        optimistic: true,
        status: 'sent'
      };

      await queryClient.cancelQueries({ queryKey: ["messages", userId] });

      const previousData = queryClient.getQueryData(["messages", userId]);

      queryClient.setQueryData(["messages", userId], (old: any) => ({
        ...old,
        messages: [...(old?.messages || []), optimisticMessage],
      }));

      return { previousData, userId };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.userId] });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["messages", context.userId], context.previousData);
      }
      toast.error("Failed to send message.");
    },

    onSuccess: (newMessage, variables) => {
      queryClient.setQueryData(["messages", variables.userId], (old: any) => {
        if (!old) return { messages: [newMessage] };

        const messages = old.messages.filter((msg: any) => !msg.optimistic);

        return {
          ...old,
          messages: [...messages, newMessage],
        };
      });
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return (userId: string, content: string) => {
    mutate({ userId, content });
  };
};

export default useSendMessage;
