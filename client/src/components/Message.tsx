interface MessageProps {
  start: boolean;
}

const Message : React.FC<MessageProps>= ({ start, data, user}) => {

  const dateObj = new Date(data.createdAt);
  const formattedDate = dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric", 
    hour: "numeric", 
    minute: "numeric", 
  });

  return (
    <div>
      <div className={`chat ${start ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-header">
          <span >{user.fullName}</span>
          <time className="text-xs opacity-50">{ formattedDate }</time>
        </div>
        <div className={`${start ? 'chat-bubble' : 'chat-bubble chat-bubble-primary'}`}>
          { data.content }
        </div>
        {!start && 
        <div className="chat-footer opacity-50">{ data.status.toLowerCase() }</div>}
      </div>
    </div>
  )
}

export default Message;
