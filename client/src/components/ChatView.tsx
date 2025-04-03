import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";
import useGetMessages from "../hooks/useGetMessages";
import Loading from "./Loading";

const ChatView = () => {

  const { chatId } = useParams<{ chatId: string }>();
  const { data, isLoading } = useGetMessages(chatId);

  
  if(isLoading) {
    return <Loading />;
  }
  const chatUser = data.receiver;

  return (
    <div className="w-full md:w-7/10 flex align-center flex-col">
      <ChatHeader user={chatUser}/>
      <Messages messageData={data}/>
      <NewMessageBox user={chatUser}/>
    </div>
  )
}

export default ChatView;
