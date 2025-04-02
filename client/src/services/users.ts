const baseUrl = '/api/users';
import axios from "axios";

type singupObj = {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  confirmPassword: string
}

type loginObj = {
  username: string,
  password: string,
}

const signup = async (obj: singupObj) => {
  const res = await axios.post(`${baseUrl}/register`, obj);
  return res.data;
}

const login = async (obj: loginObj) => {
  const res = await axios.post(`${baseUrl}/login`, obj);
  return res.data;
}

const logout = async () => {
  const res = await axios.post(`${baseUrl}/logout`);
  return res.data;
}


export default{
  signup,
  login,
  logout,
}