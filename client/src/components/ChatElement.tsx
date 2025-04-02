

const ChatElement = () => {
  return (
    <div className="bg-primary rounded-box h-16 p-3 text-neutral flex gap-5 items-center m-2
    transition-colors duration-100 hover:bg-primary/50 active:bg-primary/50">
        <div className="avatar">
          <div className="w-10 rounded-full ring-neutral ring-offset-base-100 ring ring-offset-1">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="flex flex-col  gap-1">
          <p className="font-bold ">john doe</p>
          <p className="text-base-100 text-sm">hey how are you?</p>
        </div>
      </div>
  );
}

export default ChatElement;
