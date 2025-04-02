import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatView from "./components/ChatView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return(
    <Routes>
      <Route path="/chats" element={<Layout />}>
        <Route index element={null}></Route>
        <Route path=":chatId" element={<ChatView />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default App;