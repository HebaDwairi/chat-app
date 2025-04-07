import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const fetchChats = async () => {
  try {
    const res = await axios.get('/api/messages/conversations');
    return res.data;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const useGetChats = () => {
  const { isError, error, data, isLoading } =  useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
    staleTime: 1000,  
  });

  useEffect(() => {
    if(isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return { isLoading, data };
 
}

export default useGetChats;