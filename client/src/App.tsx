import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatView from "./components/ChatView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return(
    <div>
      <Toaster toastOptions={{
          style: {
            background: 'var(--color-neutral)', 
            color: '#fff', 
          },
        }}/>
      <Routes>
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