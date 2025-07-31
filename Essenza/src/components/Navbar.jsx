import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/aboutus" },
  { label: "Staffs", path: "/staffs" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contactus" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate=useNavigate();

  return (
    <nav className="bg-purple-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between">
        <img src="/logo.png" alt="Logo" className="w-15 h-15" />

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-8">
          {navItems.map((item) => (
           <Link
  to={item.path}
  style={{ color: "#6B21A8" }} // Tailwind's purple-900
  className="no-underline hover:text-purple-700 hover:text-xl font-medium px-1 transition-colors"
>
  {item.label}
</Link>


          ))}
        </div>

        {/* Login/Register */}
        <div className="flex gap-2 items-center">
         <button
         onClick={()=>{navigate('/login')}}
        className="text-purple-500 font-semibold px-4 py-2 rounded"
      >
        Login
      </button>
          <span className="border-r-2 h-6"></span>
          <button
          onClick={()=>{navigate('/register')}}
        className=" text-purple-500 font-semibold px-4 py-2 rounded"
      >
        Register
      </button>
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
