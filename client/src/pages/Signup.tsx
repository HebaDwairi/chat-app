import { ChangeEvent, FormEvent, useState } from "react";
import userService from '../services/users';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { setAuthUser } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    userService
      .signup(data)
      .then(res => {
        console.log(res);
        setAuthUser(res);
        navigate('/chats');
        toast.success(`Logged in as ${res.username}`);
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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-base-200">
    <h1 className="font-black text-3xl mb-5 w-full text-center">Chatify</h1>
    <div className="w-full max-w-md p-6 bg-base-200 border border-base-300 rounded-box shadow-md">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-4">
          <legend className="text-2xl font-bold mb-10">Signup</legend>
          <label className="text-sm font-medium">Username</label>
          <input
            className="input input-bordered w-full"
            placeholder="Enter your username"
            onChange={handleChange}
            name="username"
            value={data.username}
            onFocus={handleFocus}
          />
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                className="input input-bordered w-full"
                placeholder="First name"
                onChange={handleChange}
                name="firstName"
                value={data.firstName}
                onFocus={handleFocus}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                className="input input-bordered w-full"
                placeholder="Last name"
                onChange={handleChange}
                name="lastName"
                value={data.lastName}
                onFocus={handleFocus}
              />
            </div>
          </div>
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
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            onChange={handleChange}
            name="confirmPassword"
            value={data.confirmPassword}
            onFocus={handleFocus}
          />

          { errorMessage &&
          <div role="alert" className="alert alert-error alert-outline rounded-md mt-4">
            <span>{ errorMessage }</span>
          </div> }

          <button type="submit" className="btn btn-primary w-full mt-3 hover:bg-primary/40">Signup</button>
          <div>
            Already have an account?
            <button className="btn btn-link " onClick={() => {
              navigate('/login');
            }}> Login</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
  )
}

export default Signup;
