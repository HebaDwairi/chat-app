import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatView from "./components/ChatView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./contexts/AuthContext";

const App = () => {

  const { authUser, isLoading } = useAuth();

  if(isLoading) {
    return <div className="w-screen h-screen grid place-items-center">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  }

  return(
    <div>
      <Toaster toastOptions={{
          style: {
            background: 'var(--color-neutral)', 
            color: '#fff', 
          },
        }}/>
      <Routes>
        <Route path="/" element={<Navigate to={ authUser ? '/chats' : '/login'} />}></Route>
        <Route path="/chats" element={<Layout />}>
          <Route index element={null}></Route>
          <Route path=":chatId" element={<ChatView />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;