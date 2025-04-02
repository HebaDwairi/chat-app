import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import axios from 'axios';
//import Toast from 'react-hot-toast';

type AuthUserType = {
  fullName: string,
  id: string,
  username: string,
  profilePicture: string
}

const AuthContext = createContext<{
  authUser: AuthUserType | null,
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>,
  isLoading: boolean,
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

const AuthProvider = ({ children }: {children: React.ReactNode}) =>{
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('/api/users/me');
        const data = res.data;

        if(!data.ok) {
          throw new Error(data.error);
        }

        setAuthUser(data);
      }
      catch (error: unknown) {
        console.log(error);
        //Toast.error(error.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      { children }
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;