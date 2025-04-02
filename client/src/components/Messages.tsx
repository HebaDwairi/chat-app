import Message from "./Message";

const Messages = () => {
  return (
    <div className="mx-8 p-3 overflow-auto py-24">
      <Message start={true}/>
      <Message start={false}/>
      <Message start={true}/>
      <Message start={true}/>
      <Message start={false}/>
      <Message start={true}/>
      <Message start={true}/>
      <Message start={true}/>
      <Message start={false}/>
      <Message start={false}/>
      <Message start={false}/>
      <Message start={true}/>
    </div>
  )
}

export default Messages;
