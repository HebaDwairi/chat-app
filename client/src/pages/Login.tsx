import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import userService from '../services/users';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
      username: '',
      password: '',
    });
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value
    });
  }

  const { setAuthUser } = useAuth(); 
  const navigate = useNavigate();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    userService
      .login(data)
      .then(res => {
        console.log(res);
        setAuthUser(res);
        navigate('/chats');
        toast.success(`Logged in as ${res.username}`)
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      event.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  if(isLoading) {
    return <div className="w-screen h-screen grid place-items-center">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center  bg-base-200">
      <h1 className="font-black text-3xl m-15 w-full text-center">Chatify</h1>
      <div className="w-full max-w-sm p-6 bg-base-200 border border-base-300 rounded-box shadow-md">
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4">
            <legend className="text-2xl font-bold mb-10">Login</legend>

            <label className="text-sm font-medium">Username</label>
            <input
              className="input input-bordered w-full"
              placeholder="Enter your username"
              onChange={handleChange}
              name="username"
              value={data.username}
              onFocus={handleFocus}
            />
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              onChange={handleChange}
              name="password"
              value={data.password}
              onFocus={handleFocus}
            />
            
            { errorMessage &&
            <div role="alert" className="alert alert-error alert-outline rounded-md mt-4">
              <span>{ errorMessage }</span>
            </div> }

            <button className="btn btn-primary w-full mt-3 hover:bg-primary/50" type="submit">Login</button>
            <div>
              Don't have an account?
              <button className="btn btn-link" onClick={() => {
                navigate('/signup');
              }}> Signup</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
