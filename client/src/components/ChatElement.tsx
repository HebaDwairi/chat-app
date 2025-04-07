import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../contexts/SocketContext";
import { useChatUser } from "../contexts/chatUserContext";

const ChatElement = ({ chat }) => {

  const navigate = useNavigate();
  const { setChatUser } = useChatUser();

  const handleClick = () => {
    setChatUser(chat.user);
    
    navigate(`/chats/${chat.user.id}`);
  }

  const { onlineUsers } = useSocketContext();
  const userOnline = onlineUsers.includes(chat.user.id);

  return (
    <div className="bg-primary rounded-box h-16 p-3 text-neutral flex gap-5 items-center m-2
    transition-colors duration-100 hover:bg-primary/50 active:bg-primary/50"
    onClick={handleClick}>
      <div className={`avatar ${userOnline? 'avatar-online' : ''}`}>
        <div className="w-10 rounded-full ring-neutral ring-offset-base-100 ring ring-offset-1">
          <img src={chat.user.profilePicture} />
        </div>
      </div>
      <div className="flex flex-col gap-1 h-12">
        <p className="font-bold ">{ chat.user.fullName }</p>
        <p className="text-base-100 text-sm overflow-hidden"> { 
        chat.message.content 
        } </p>
      </div>
    </div>
  );
}

export default ChatElement;
