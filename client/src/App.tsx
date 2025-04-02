import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatView from "./components/ChatView";

const App = () => {
  return(
    <Routes>
      <Route path="/chats" element={<Layout />}>
        <Route index element={null}></Route>
        <Route path=":chatId" element={<ChatView />}></Route>
      </Route>
    </Routes>
  );
}

export default App;