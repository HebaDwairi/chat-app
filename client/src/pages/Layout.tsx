import ChatList from "../components/ChatList";
import NoChat from "../components/NoChat";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const path = useLocation().pathname;
  const isChatOpen = String(path).includes('/chats/');
  return (
    <div className="w-full h-[100dvh] ">
      <div className="w-full h-full flex justify-center ">
        <div className={`${isChatOpen? 'hidden md:block' : 'block'} w-full md:w-3/10`}>
          <ChatList />
        </div>
        <Outlet />
        {!isChatOpen &&
          <NoChat />
        }
      </div>
    </div>
  )
}

export default Layout;
