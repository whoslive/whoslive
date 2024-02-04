// Footer.js
import React, { useState } from "react";
import TwitterLogo from "../x-logo/logo-white.png";
import TwitterLogoBlack from "../x-logo/logo-black.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="bg-gradient-to-b  from-indigo-600 to-blue-600 p-4 text-white text-center rounded-full">
      <div className="flex flex-col items-center mb-4">
        <a
          href="https://twitter.com/Vict3r7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Twitter"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? TwitterLogoBlack : TwitterLogo}
            alt="Twitter Logo"
            className="w-8 h-10 mb-2"
          />
        </a>

        {/* Link to the Info component */}
        <Link to="/info" className="text-white hover:text-gray-700">
          About This Website.
        </Link>
        <p>&copy; 2024 All whoslive rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
