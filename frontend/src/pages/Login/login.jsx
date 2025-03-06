import { Link } from "react-router-dom";
import useUserLogin from "../../hooks/userLogin"; // Updated import
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useUserLogin();  // Corrected hook usage

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ username, password });  // Pass an object instead of separate arguments
    };

    return (
      <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <br /><br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <br /><br />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <br />
          <p className="text-center text-gray-600 text-sm">
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </p>
          <br />
          <p className="text-center text-gray-600 text-sm">
            <Link to='/signup' className="text-blue-500 hover:underline">Don't have an account?</Link>
          </p>
        </div>
      </div>
    );
}

export default Login;
