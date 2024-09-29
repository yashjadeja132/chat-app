import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

const AddUser = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [image, setImage] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();

    const newUser = {
      name: userName,
      number: userNumber,
      image:
        image ||
        "https://static.vecteezy.com/system/resources/thumbnails/020/911/731/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
      user_id: Date.now(),
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    setUser(newUser);

    setUserName("");
    setUserNumber("");
  };

  return (
    <form onSubmit={handleAddUser}>
      <div className="get-image">
        <ImageUploader image={image} setImage={setImage} />
      </div>
      <input
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="User Number"
        value={userNumber}
        onChange={(e) => setUserNumber(e.target.value)}
      />
      <div className="footer">
        <button type="submit">Add</button>
        <button type="button" onClick={() => setUser("")}>
          Back
        </button>
      </div>
    </form>
  );
};

export default AddUser;
