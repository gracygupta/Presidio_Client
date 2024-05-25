import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../path/to/UserContext"; // Import your UserContext

function NavBar() {
  const [user, setUser] = useState(); // Use array destructuring
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // No need for async/await here
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Project Name */}
        <Link to="/" className="text-white text-2xl font-semibold">
          Rentify
        </Link>

        {/* Navigation Links (Right Side) */}
        <div className="flex space-x-4 font-bold">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>

          {/* Conditional Links Based on User Role */}
          {user && user.role === "seller" && (
            <Link
              to="/owned/properties"
              className="text-white hover:text-gray-200"
            >
              My Properties
            </Link>
          )}

          {user ? (
            <>
              {/* Logged In: Show Profile and Logout */}
              <Link to="" className="text-white hover:text-gray-200">
                Profile
              </Link>
              <Link to="" className="text-white hover:text-gray-200">
                Liked
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Not Logged In: Show Login and Register */}
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
