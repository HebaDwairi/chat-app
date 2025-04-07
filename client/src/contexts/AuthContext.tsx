import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import userService from "../services/users";

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
    userService
      .getUser()
      .then(res => {
        console.log(res);
        setAuthUser(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      { children }
    </AuthContext.Provider>
  );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;