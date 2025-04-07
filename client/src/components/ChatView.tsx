import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";
import useGetMessages from "../hooks/useGetMessages";
import Loading from "./Loading";
import { useChatUser } from "../contexts/chatUserContext";
import { useAuth } from "../contexts/AuthContext";

const ChatView = () => {

  const { chatId } = useParams<{ chatId: string }>();

  const { data, isLoading } = useGetMessages(chatId);

  const { chatUser } = useChatUser();
  const { authUser } = useAuth();
  
  if(isLoading || (!chatUser && !data)) {
    return <div className="w-full md:w-7/10 flex align-center flex-col">
      <Loading />
    </div>;
  }
  
  return (
    <div className="w-full md:w-7/10 flex align-center flex-col">
      <ChatHeader user={chatUser || data?.receiver}/>
      <Messages messageData={data || {
        messages: [],
        sender: authUser,
        receiver: chatUser,
      }}/>
      <NewMessageBox user={chatUser || data?.receiver}/>
    </div>
  )
}

export default ChatView;
