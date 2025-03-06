import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages"; // Import useGetMessages

function ChatInput({ chatId }) {
  const [message, setMessage] = useState("");
  const { sendMessage, loading} = useSendMessage();
  
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex items-center p-3 border-t border-gray-300 bg-gray-100">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSend(e); // Send message on Enter key press
        }}
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        onClick={handleSend}
        disabled={loading} // Disable button while sending
      >
        {loading ? <div className="loading loading-spinner"></div> : <IoSend className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default ChatInput;