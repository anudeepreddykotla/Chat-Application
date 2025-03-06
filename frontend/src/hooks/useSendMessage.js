import { useState } from 'react';
import useConversation from '../store/useConversation.js';

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, setNewMessage } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) return; // Ensure conversation is selected

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // ✅ Update Zustand store (state consistency)
      setMessages((prevMessages) => [...prevMessages, data]); 
      setNewMessage(data); // Update latest message
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessage;
