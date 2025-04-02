import ChatList from "../components/ChatList";
import NoChat from "../components/NoChat";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const path = useLocation().pathname;
  const isChatOpen = String(path).includes('/chats/');
  return (
    <div>
      <div className={`${isChatOpen? 'hidden md:block' : 'block'}`}>
        <ChatList />
      </div>

      <Outlet />
      {!isChatOpen &&
        <NoChat />
      }
    </div>
  )
}

export default Layout;
