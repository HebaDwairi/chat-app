import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";

const ChatView = () => {
  return (
    <div className="w-full md:w-7/10 flex align-center flex-col">
      <ChatHeader />
      <Messages />
      <NewMessageBox />
    </div>
  )
}

export default ChatView;
