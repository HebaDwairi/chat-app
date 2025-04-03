import { useAuth } from "../contexts/AuthContext";
import useChatScroll from "../hooks/useScroll";
import Message from "./Message";

const Messages = ({ messageData }) => {

  const ref = useChatScroll(messageData.messages) as React.MutableRefObject<HTMLDivElement>;

  if(!messageData.messages) {
    return <div>
      no messages yet
    </div>
  }

  const user = messageData.sender;
  const chatUser = messageData.receiver;
  const messages = messageData.messages;

  return (
    
    <div className="mx-1 p-3 overflow-auto py-24" ref={ref}>
      {
        messages.map(message => 
        <Message 
          start={ message.senderId !== user.id } 
          data={message}
          user={message.senderId === user.id? user : chatUser}
          key={message.id}/>)
      }
    </div>
  )
}

export default Messages;
