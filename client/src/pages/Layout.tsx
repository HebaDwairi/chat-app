import ChatList from "../components/ChatList";
import NoChat from "../components/NoChat";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Layout = () => {
  const { authUser }  = useAuth();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    if(!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

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
