import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const fetchMessages = async (userId: string) => {
  try {
    const res = await axios.get(`/api/messages/${userId}`);
    console.log(res.data)
    return res.data;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const useGetMessages = (userId: string) => {
  const { isError, error, data, isLoading } =  useQuery({
    queryKey: ['messages', userId],
    queryFn: () => {
      return fetchMessages(userId);
    },
    staleTime: 5 * 60 * 1000,  
  });

  useEffect(() => {
    if(isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return { isLoading, data };
 
}

export default useGetMessages;