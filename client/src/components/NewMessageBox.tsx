import { FormEvent, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const NewMessageBox = ({ user }) => {
  const [message, setMessage] = useState('');
  const send = useSendMessage();

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    send(user.id, message);
    setMessage('');
  }

  return (
    <div className=" fixed bottom-0 w-full md:w-7/10 bg-neutral/20 backdrop-blur-md">
       <div >
        <form  onSubmit={sendMessage} className="h-15 p-3 flex gap-5 items-center m-3">
          <input
            type="text"
            placeholder="Type Message"
            className="input w-full text-lg rounded-box border-2"
            value={message}
            onChange={(e) => {setMessage(e.target.value)}}
          />
          <button
            className="btn btn-circle btn-primary p-2"
            type="submit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewMessageBox;
