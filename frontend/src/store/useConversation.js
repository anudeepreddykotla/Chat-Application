import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  
  messages: [], // ✅ Ensure messages is an array
  setMessages: (update) => 
    set((state) => ({
      messages: typeof update === "function" ? update(state.messages) : update
    })),

  newMessage: null, // ✅ Initialize newMessage to avoid undefined issues
  setNewMessage: (newMessage) => set({ newMessage }),
}));

export default useConversation;
