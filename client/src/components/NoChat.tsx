import { useAuth } from "../contexts/AuthContext";

const NoChat = () => {
  const { authUser }  = useAuth();
  return (
    <div className='hidden md:flex flex-col gap-5 w-full md:w-7/10 justify-center items-center text-lg font-bold'>
      <h1 className="font-black pb-10 text-3xl">Hi! {authUser?.fullName} 👋</h1>
      <p>No chat selected</p>
      <p>Select a chat or search users to start a new chat</p>
    </div>
  )
}

export default NoChat;
