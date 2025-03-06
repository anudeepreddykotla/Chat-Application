import React, { useState } from 'react';
import { useAuth } from '../context/authContext'; // Import useAuth hook

function useUserSignup() { // Custom hook for handling signup
  const { setUser } = useAuth(); // Access setUser function from context
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullName, username, password, confirmPassword, email }) => {
    const areValidInputs = verifyInputs({ fullName, username, password, confirmPassword, email });
    if (!areValidInputs) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, email }),
        credentials: 'include', // Include credentials for cookies or authentication
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Store user data in localStorage and update context
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      alert(error.message); // Display error to user
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup };
}

export default useUserSignup;

const verifyInputs = ({ fullName, username, password, confirmPassword, email }) => {
  if (!fullName || !email || !username || !password || !confirmPassword) {
    alert('All fields are required');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Invalid email format');
    return false;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }
  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return false;
  }
  return true;
}
