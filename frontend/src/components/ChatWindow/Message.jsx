import React from 'react';

function Message({ message }) {
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id; 

  return (
    <div
      className={`max-w-xs p-3 my-1 rounded-lg text-sm 
        ${message.senderId === currentUserId ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-gray-900 self-start'}`}
    >
      {message.message}
    </div>
  );
}

export default Message;
 