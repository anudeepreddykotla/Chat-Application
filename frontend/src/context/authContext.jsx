import { createContext, useContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Use context to get access to user and setUser
}

// AuthProvider to wrap your app and provide the context
export const AuthProvider = ({ children }) => {
  // State to manage the user, fetched from localStorage or set to null initially
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children} {/* Children will have access to this context */}
    </AuthContext.Provider>
  );
}
