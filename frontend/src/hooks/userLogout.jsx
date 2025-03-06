import React from 'react'
import { useAuth } from '../context/authContext'

function userLogout() {
  const [loading, setLoading] = React.useState(false); 
  const { setUser } = useAuth(); // Access setUser function from context
  const logout = async () => {
    setLoading(true);
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem('user');
        setUser(null);
    } catch (error) {
        alert(error.message);
    } finally {
        setLoading(false);
    }   
  }
  return { loading, logout };
}

export default userLogout