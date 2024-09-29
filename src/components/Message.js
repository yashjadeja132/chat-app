import React from "react";

const Message = ({ data, user }) => {
  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`messages ${data.align}`}>
      <div className="message">
        <h4>{data.message}</h4>
        <h6>{getTime(data.time)}</h6>
      </div>
    </div>
  );
};

export default Message;
