import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface ISocketContext {
	socket: Socket | null;
	onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);
const socketURL = import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const {isLoading, authUser} = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

useEffect(() => {
  if (!isLoading && authUser) {
    console.log("Connecting to socket...");

    const socket = io(socketURL, {
      query: {
        userId: authUser.id,
      }
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("getOnlineUsers", (users: string[]) => {
      console.log("Updated online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      console.log("Closing socket...");
      socket.close();
      socketRef.current = null;
    };
  } else if (!isLoading && !authUser) {
    if (socketRef.current) {
      console.log("No auth user, closing socket...");
      socketRef.current.close();
      socketRef.current = null;
    }
  }
}, [authUser, isLoading]);
  

  return(
    <SocketContext.Provider value={{
      socket: socketRef.current,
      onlineUsers
    }}>
      { children }
    </SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
}

export default SocketContextProvider;