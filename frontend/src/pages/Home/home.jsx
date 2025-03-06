import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar.jsx'
import ChatWindow from '../../components/ChatWindow/chatWindow.jsx'

function Home() {
  const [chatSelected, setChatSelected] = useState(null);
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl h-[90vh] bg-white shadow-md rounded-lg">
        <Sidebar/>
        <ChatWindow />
      </div>
    </div>
  );
}

export default Home;
