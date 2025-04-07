import type { Message } from "../types/message";
import { User } from "../types/user";

type MessageProps = {
  start: boolean,
  data: Message,
  user: User,
}

const Message : React.FC<MessageProps>= ({ start, data, user}) => {

  const dateObj = new Date(data.createdAt);
  const formattedDate = dateObj.toLocaleString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric", 
    hour: "numeric", 
    minute: "numeric", 
  });

  return (
    <div>
      <div className={`chat ${start ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-header">
          <span >{user.fullName.split(' ')[0]}</span>
          <time className="text-xs opacity-50">{ formattedDate }</time>
        </div>
        <div className={`${start ? 'chat-bubble rounded-box' : 'chat-bubble chat-bubble-primary rounded-box'}`}>
          { data.content }
        </div>
        {!start && 
        <div className="chat-footer opacity-50">{ data.status.toLowerCase() }</div>}
      </div>
    </div>
  )
}

export default Message;
