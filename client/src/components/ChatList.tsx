import Search from "./Search";
import ChatElement from "./ChatElement";

const ChatList = () => {
  return (
    <div className="flex flex-col  items-center bg-neutral h-full p-9">
      <h1 className="font-black text-3xl p-3 mb-3 text-left w-full">Chatify</h1>
      <Search />
      <div className="divider"></div>

      <div className="flex w-full flex-col overflow-auto">
         <ChatElement />
         <ChatElement />
         <ChatElement />
         <ChatElement />
         <ChatElement />
         <ChatElement />
      </div>
    </div>
  )
}

export default ChatList;
