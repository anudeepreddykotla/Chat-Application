import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import userSignup from "../../hooks/userSignup";

function Signup({ signupHandler }) {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });

    const [error, setError] = useState('');
    const { loading, signup } = signupHandler || userSignup(); // Use passed function or default hook

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (inputs.password !== inputs.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await signup(inputs);
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {["fullName", "email", "username"].map((field, index) => (
                        <input
                            key={index}
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            required
                            value={inputs[field]}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    {["password", "confirmPassword"].map((field, index) => (
                        <input
                            key={index}
                            type="password"
                            name={field}
                            placeholder={field === "confirmPassword" ? "Confirm Password" : "Set Password"}
                            required
                            value={inputs[field]}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 rounded-md text-white transition ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-3">
                    <Link to="/login" className="text-blue-500 hover:underline">Already have an account?</Link>
                </p>
            </div>
        </div>
    );
}

// Define PropTypes
Signup.propTypes = {
    signupHandler: PropTypes.shape({
        loading: PropTypes.bool,
        signup: PropTypes.func.isRequired,
    }),
};

// Default props if none provided
Signup.defaultProps = {
    signupHandler: null,
};

export default Signup;
