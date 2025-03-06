import React, { useEffect, useRef } from 'react';
import useConversation from '../../store/useConversation.js';
import Message from './Message.jsx';
import useListenMessages from '../../hooks/useListenMessages.js';
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from '../../hooks/useGetMessages';

function ChatArea() {
  const { loading } = useGetMessages(); // Fetch messages initially
  const { messages = [], newMessage} = useConversation(); // ✅ Default to empty array
  const { sendMessage } = useSendMessage();
  useListenMessages();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {loading ? (
        <p className='text-center'>Loading messages...</p>
      ) : Array.isArray(messages) && messages.length > 0 ? ( // ✅ Ensure messages is an array
        <>
          {messages.map((message, index) => (
            <Message key={message._id || index} message={message} />
          ))}
          <div ref={chatEndRef} />
        </>
      ) : (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default ChatArea;
