import { useSocketContext } from "../contexts/SocketContext"
import { User } from "../types/user";


const ChatHeader = ({ user }: {user: User}) => {

  const { onlineUsers } = useSocketContext();

  return (
    <div className="fixed top-0 w-full md:w-7/10 bg-neutral/20 backdrop-blur-md z-10">
      <div className=" h-12 p-2 flex gap-5 items-center m-4">
        <div className="avatar">
          <div className="w-10 rounded-full ring-neutral ring-offset-base-100 ring ring-offset-1">
            <img src={user.profilePicture} />
          </div>
        </div>
        <div className="flex flex-col  gap-1">
          <p className="font-black ">{user.fullName}</p>
          <p className="text-base-content/80 text-sm">
           { onlineUsers.includes(user.id) ? 'online' : 'away' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
