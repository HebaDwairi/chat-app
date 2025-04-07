import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ChatUser = {
  fullName: string,
  profilePicture: string,
  id: string,
}

const ChatUserContext = createContext<{
  chatUser: ChatUser | null,
  setChatUser: Dispatch<SetStateAction<ChatUser | null>>
}>({
  chatUser: null,
  setChatUser: () => {}
});

// eslint-disable-next-line react-refresh/only-export-components
export const useChatUser = () => {
  return useContext(ChatUserContext);
}

const ChatUserContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);

  return (
    <ChatUserContext.Provider value={{
      chatUser,
      setChatUser
    }}>
      { children }
    </ChatUserContext.Provider>
  );
}

export default ChatUserContextProvider;