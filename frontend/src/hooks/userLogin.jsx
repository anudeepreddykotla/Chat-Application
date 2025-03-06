import React from "react";
import { useAuth } from "../context/authContext";

function useUserLogin() {  // Renamed to follow React Hook naming conventions
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useAuth();

  const login = async ({ username, password }) => { 
    if (!verifyInputs({ username, password })) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useUserLogin;

const verifyInputs = ({ username, password }) => {
  if (!username || !password) {
    alert("All fields are required");
    return false;
  }
  return true;
};
