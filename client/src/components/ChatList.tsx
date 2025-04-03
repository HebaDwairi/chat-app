import Search from "./Search";
import ChatElement from "./ChatElement";
import useGetChats from "../hooks/useGetChats";
import Loading from "./Loading";

const ChatList = () => {

  const {isLoading, data} = useGetChats();

  console.log(data);

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col  items-center bg-neutral h-full p-9">
      <h1 className="font-black text-3xl p-3 mb-3 text-left w-full">Chatify</h1>
      <Search />
      <div className="divider"></div>

      <div className="flex w-full flex-col overflow-y-auto overflow-x-hidden">
         {
          data.map(chat => 
            <ChatElement chat={chat} key={chat.user.id}/>
          )
         }
      </div>
    </div>
  )
}

export default ChatList;
