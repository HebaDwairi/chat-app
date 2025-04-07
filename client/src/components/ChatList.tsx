import Search from "./Search";
import ChatElement from "./ChatElement";
import useGetChats from "../hooks/useGetChats";
import Loading from "./Loading";
import userService from '../services/users';
import { useAuth } from "../contexts/AuthContext";
import { ChatType } from "../types/chat";

const ChatList = () => {

  const {isLoading, data} = useGetChats();
  const { setAuthUser } = useAuth();


  const handleLogout = () => {
    userService
      .logout()
      .then(() => {
        setAuthUser(null);
      })
      .catch(err => {
        console.log(err)
      })
  }

  if(isLoading) {
    return <Loading />
  }


  return (
    <div className="flex flex-col  items-center bg-neutral h-full p-9">
      <div className="flex p-3 mb-3 text-left w-full justify-between">
        <h1 className="font-black text-3xl ">Chatify</h1>
        <button
          className="btn btn-circle btn-base p-2"
          onClick={handleLogout}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-log-out-icon lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
        </button>
      </div>
      
      <Search />
      <div className="divider"></div>

      <div className="flex w-full flex-col overflow-y-auto overflow-x-hidden">
         {
          data.length > 0 ? 
          data.map((chat: ChatType) => 
            <ChatElement chat={chat} key={chat.user.id}/>
          ):
          <div className="grid place-items-center text-neutral-content/60 ">
            No chats yet
          </div>
         }
      </div>
    </div>
  )
}

export default ChatList;
