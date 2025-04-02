interface MessageProps {
  start: boolean;
}

const Message : React.FC<MessageProps>= ({ start }) => {
  return (
    <div>
      <div className={`chat ${start ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">2 hours ago</time>
        </div>
        <div className={`${start ? 'chat-bubble' : 'chat-bubble chat-bubble-primary'}`}>You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Seen</div>
      </div>
    </div>
  )
}

export default Message;
