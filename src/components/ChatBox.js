import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Message from "./Message";
import Popover from "./Popover";
import AddUser from "./AddUser";

const ChatBox = ({ user, setUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [popoverMessage, setPopoverMessage] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const currentUser = 100001;

  useEffect(() => {
    const findMessages = () => {
      if (!user) {
        setMessages([]);
        return;
      }

      const storedMessages =
        JSON.parse(localStorage.getItem("chatMessages")) || [];
      const foundMessages = storedMessages.find(
        (item) =>
          item.users.includes(currentUser) && item.users.includes(user.user_id)
      );

      if (foundMessages && foundMessages.messages) {
        const formattedMessages = foundMessages.messages.map((item) => ({
          ...item,
          align: item.sender === currentUser ? "right" : "left",
        }));

        setMessages(formattedMessages.reverse());

        const latestMessageTime = formattedMessages[0].time;
        const dateMessage = getDateMessage(latestMessageTime);
        setPopoverMessage(dateMessage);
        setShowPopover(true);

        setTimeout(() => setShowPopover(false), 1000);
      } else {
        setMessages([]);
      }
    };

    findMessages();
  }, [user]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(" ");

    if (words.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    if (words.length > 1) {
      words[1] = words[1].toLowerCase();
    }

    setNewMessage(words.join(" "));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const newMessageObject = {
      sender: currentUser,
      time: Date.now(),
      message: newMessage,
      align: "right",
    };

    setMessages((prevMessages) => [newMessageObject, ...prevMessages]);

    updateLocalStorage(newMessageObject);

    setNewMessage("");

    const dateMessage = getDateMessage(newMessageObject.time);
    setPopoverMessage(dateMessage);
    setShowPopover(true);

    setTimeout(() => setShowPopover(false), 3000);
  };

  const updateLocalStorage = (message) => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    const userChatIndex = storedMessages.findIndex(
      (item) =>
        item.users.includes(currentUser) && item.users.includes(user.user_id)
    );

    if (userChatIndex !== -1) {
      storedMessages[userChatIndex].messages.push(message);
    } else {
      storedMessages.push({
        users: [currentUser, user.user_id],
        messages: [message],
      });
    }

    localStorage.setItem("chatMessages", JSON.stringify(storedMessages));
  };

  const getDateMessage = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);

    const timeDiff = now - messageDate;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay) {
      return "Today";
    } else if (timeDiff < 2 * oneDay) {
      return "Yesterday";
    } else if (messageDate.getWeek() === now.getWeek()) {
      return "This Week";
    } else {
      return messageDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    }
  };

  if (!user) {
    return <div className="chat-box-message">Welcome to sparrow-chat</div>;
  }

  if (user === "newUser") {
    return (
      <div className="add-user">
        <AddUser user={user} setUser={setUser} />
      </div>
    );
  }

  return (
    <div className="box">
      <div className="header">
        <UserInfo data={user} />
      </div>
      <div className="chats">
        {showPopover && <Popover message={popoverMessage} />}
        {messages.length > 0 &&
          messages.map((item, index) => (
            <Message key={index} data={item} user={user} />
          ))}
      </div>
      <div className="footer">
        <form onSubmit={handleSendMessage}>
          <div className="footer-box">
            <input type="text" onChange={handleChange} value={newMessage} />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
