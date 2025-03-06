import React, { useEffect } from 'react';
import ChatInput from './chatInput';
import ChatArea from './chatArea';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../store/useConversation';

function ChatWindow() { // Receive chatSelected as prop
  const {selectedConversation, setSelectedConversation} = useConversation();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    }
  },[setSelectedConversation])
  return (
    <div className="flex flex-col w-screen h-full bg-white">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-300 bg-gray-100">
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg font-semibold">
              {selectedConversation.fullName.charAt(0)} {/* Show first letter of chat ID */}
            </div>
            <div className="ml-3 text-lg font-medium text-gray-900">{selectedConversation.fullName}</div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
            <ChatArea chatId={selectedConversation} /> {/* Pass chat ID to ChatArea */}
          </div>

          {/* Chat Input */}
          <div>
            <ChatInput chatId={selectedConversation._id}/>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;

const NoChatSelected = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")); // Parse JSON safely
  const userName = currentUser?.fullName || "User"; // Fallback if fullName is missing

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl flex flex-col items-center gap-2">
        <p>Welcome {userName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

