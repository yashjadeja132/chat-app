import { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList";

function App() {
  const [selectedUser, setSelectedUser] = useState(undefined);

  return (
    <div className="chat-app">
      <div className="chat-list">
        <ChatList setUser={setSelectedUser} />
      </div>
      <div className="chat-box">
        <ChatBox user={selectedUser} setUser={setSelectedUser} />
      </div>
    </div>
  );
}

export default App;
