// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar bg-gradient-to-r from-blue-500  to-indigo-500 p-1 ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link to="/home" className="text-white text-2xl font-bold mr-1 hover:text-black">
            Home
          </Link>
          
          {/* Dropdown for Vods, and MultiStreams */}
          <div className="relative group">
            <button
              onClick={toggleDropdown}
              className="text-white text-2xl ml-4 hover:text-black focus:outline-none"
            >
              <svg
                className={`${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                } inline-block ml-1 h-4 w-5 `}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 -ml-4 mt-2 px-2 w-48 bg-gradient-to-r from-blue-500 to-blue-800 rounded-b-lg shadow-lg">
                <div className='p-1'>
                 <Link
                  to="/multi"
                  className="block py-2 px-4 text-white text-center rounded-full hover:bg-blue-900"
                >
                  Add-Multi-Streams
                </Link>
                </div>

                <div className='p-1'>

                <Link
                  to="/Vods"
                  className=" block py-2 px-4 text-white text-center rounded-full hover:bg-blue-900"
                >
                  Vods
                </Link>
                </div>
              </div>
            )}
          </div>

        </div>

        <h1 className="text-slate-900 text-2xl font-bold my-4 lg:my-0">
         WHO'S LIVE ? scroll down..
        </h1>

        <div className="flex items-center">
          {/* Donate link */}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://paypal.me/nasserSA7?country.x=SA&locale.x=en_US"
            className="text-white font-bold bg-indigo-600 rounded-full py-2 px-4 lg:px-8 ml-3 mr-3  hover:bg-yellow-500 "
          >
             <span>Donate</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
