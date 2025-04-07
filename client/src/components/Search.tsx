import { useEffect, useState } from "react";
import userService from '../services/users';
import toast from "react-hot-toast";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useChatUser } from "../contexts/chatUserContext";

const SearchResult = ({ user, setSearchQuery }) => {
  const navigate = useNavigate();
  const { setChatUser }  = useChatUser();

  const handleClick  = () => {
    setChatUser(user);
    navigate(`/chats/${user.id}`);
    setSearchQuery('');
  }

  return (
    <div className=" h-17 p-3 flex gap-6 items-center transition-colors duration-100 hover:bg-primary
     active:bg-primary hover:text-primary-content active:text-primary-content rounded-b-box"
     onClick={handleClick}
    >
      <div className={`avatar`}>
        <div className="w-10 rounded-full ring-neutral ring-offset-base-100 ring ring-offset-1">
          <img src={user.profilePicture} />
        </div>
      </div>
      <div className="flex">
        <p className="font-bold ">{ user.fullName }</p>
      </div>
      
    </div>
  );
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(searchQuery.trim() === '') {
      setResult([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const delay = setTimeout(() => {
      userService
      .searchUsers(searchQuery.trim())
      .then(res => {
        setResult(res);
      })
      .catch(err => {
        console.log(err);
        toast.error('error searching users');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, 300);

    return () => (
      clearTimeout(delay)
    );

  }, [searchQuery]);

  return (
    <div className="w-full p-2 ">
      <div className="relative">
        <label className="input w-full rounded-box border-2 z-55" >
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input 
            type="search"
            placeholder="Search All Users" 
            value={searchQuery} 
            onChange={(e) => {setSearchQuery(e.target.value)}}
          />
        </label>
          <div className=" w-full bg-base-100/90 absolute z-50 top-3 rounded-b-box backdrop-blur-2xl border-2 border-base-content/20 pt-6">
            {
              isLoading? <div className="p-2">
                <Loading />
              </div> : 
              result.map(res => <SearchResult key={res.id} user={res} setSearchQuery={setSearchQuery}/>)
            }
          </div>
      </div>
    </div>
  )
}

export default Search;
