import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

const ChatList = ({ setUser }) => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const defaultUser = {
      name: "Yash",
      number: "9725525656",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4FUsugFLmRqBgBQEsJ42qaC4-y2sk1yLYiQ&s",
      user_id: 100001,
    };

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((item) => item.user_id === 100001);

    if (!foundUser) {
      storedUsers.push(defaultUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setUsers(storedUsers);
      setUserData(defaultUser);
    } else {
      setUsers(storedUsers);
      setUserData(foundUser);
    }
  }, [userData]);

  const listData = users.filter((item) => item.user_id !== 100001);

  return (
    <div className="list">
      <div className="header">
        <UserInfo data={userData} />
      </div>
      <div className="users">
        {listData.length > 0 &&
          listData.map((item) => (
            <div key={item.user_id} onClick={() => setUser(item)}>
              <UserInfo data={item} />
            </div>
          ))}
      </div>
      <div className="add-button">
        <button onClick={() => setUser("newUser")}>+ User</button>
      </div>
    </div>
  );
};

export default ChatList;
