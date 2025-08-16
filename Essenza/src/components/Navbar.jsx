import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/aboutus" },
  { label: "Staffs", path: "/staffs" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contactus" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

    

    const logout = async()=>{
      try {
        axios.defaults.withCredentials = true
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin (false)
        data.success && setUserData (false)
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      }
    }

  return (
    <nav className="bg-purple-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between">
        <img src="/logo.png" alt="Logo" className="w-15 h-15 cursor-pointer"  onClick={()=>{navigate('/')}}/>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-8">
          {navItems.map((item) => (
            <Link
              to={item.path}
              className="text-purple-900 no-underline hover:text-purple-700 hover:text-xl font-medium px-1 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* login */}
        <div className="flex gap-2 items-center">
          {userData ? (
            <div onClick={()=>{navigate('/profile')}} className="w-10 h-10 flex justify-center items-center rounded-full bg-white text-purple-600 font-extrabold relative group cursor-pointer ">{userData.name[0].toUpperCase()}
            
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              <li onClick={()=>{navigate('/profile')}} className="text-purple-900 py-1 px-2 hover:bg-gray-200 cursor-pointer ">Profile</li>
                <li onClick={logout} className="text-purple-900 py-1 px-2 hover:bg-gray-200 cursor-pointer ">Logout</li>
                
              </ul>
            </div>
            
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-purple-500 font-semibold bg-white cursor-pointer px-4 py-2 rounded hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          )}

          {/* <span className="border-r-2 h-6"></span>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className=" text-purple-500 font-semibold px-4 py-2 rounded"
          >
            Register
          </button>*/}
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-purple-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden px-6 pb-4 space-y-3 bg-white shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="block text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
