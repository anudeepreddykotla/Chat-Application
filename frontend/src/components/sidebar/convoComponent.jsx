import React from 'react';
import useConversation from '../../store/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function ConvoComponent({ chat, lastItem }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === chat._id;
  const { onlineUsers } = useSocketContext(); 

  // console.log("Online Users:", onlineUsers);
  // console.log("Checking chat._id:", chat._id);
  // console.log("Is Online:", onlineUsers?.some(id => id === chat._id));

  const isOnline = onlineUsers?.some(id => id === chat._id);

  return (
    <div 
      className={`w-full max-w-md bg-white rounded-lg overflow-hidden 
        ${isSelected ? 'bg-blue-400' : ''}`} 
      onClick={() => setSelectedConversation(chat)}
    >
      <li className="flex items-center p-4 hover:bg-theme-secondary cursor-pointer">
        <div className="relative w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
          {chat.fullName.charAt(0)}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-white rounded-full"></span>
          )}
        </div>
        <div className="ml-3 font-medium text-gray-900">{chat.fullName}</div>
      </li>
      {!lastItem && <div className="border-b border-gray-200"></div>}
    </div>
  );
}

export default ConvoComponent;
