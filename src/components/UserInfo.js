import React from "react";

const UserInfo = ({ data, onClick }) => {
  return (
    <div
      className="user-info"
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          console.log("Click event is not defined");
        }
      }}
    >
      <div className="image">
        <img src={data?.image} alt="dp" />
      </div>
      <div className="info">
        <h4>{data?.name}</h4>
        <h6>{data?.number}</h6>
      </div>
    </div>
  );
};

export default UserInfo;
