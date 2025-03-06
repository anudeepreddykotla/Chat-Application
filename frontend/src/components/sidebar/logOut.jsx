import React from 'react';
import userLogout from '../../hooks/userLogout';

function LogOut() {
  const {loading, logout} = userLogout();
  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
      onClick={logout} disabled={loading}>
      Log Out
    </button>
  );
}

export default LogOut;
