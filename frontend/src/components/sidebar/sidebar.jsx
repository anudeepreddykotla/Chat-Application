import React from 'react';
import SearchInput from './searchInput';
import Conversation from './Conversation.jsx';
import Logout from './logOut.jsx';
import '../../pages/Home/home.css';

function Sidebar() {
  return (
    <div className="sidebar flex flex-col h-full">
      <SearchInput />
      <div className="divider px-3"></div>

      <Conversation />

      <div className="divider my-2 mx-3"></div>

      <div className="p-4">
        <Logout />
      </div>
    </div>
  );
}

export default Sidebar;
