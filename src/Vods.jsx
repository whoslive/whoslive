import React from 'react';
import { useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";

function Vods() {
const [isTheaterMode, setIsTheaterMode] = useState(false);

    const handleToggleTheaterMode = () => {
        const body = document.body;
    
        // Toggle Theater Mode
        if (!isTheaterMode) {
          const element = document.documentElement;
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
          body.classList.add('fullscreen');
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          body.classList.remove('fullscreen');
        }
    
        setIsTheaterMode(!isTheaterMode);
      };
    return (
        <>
        <p className='text-green-800'>permission from site owner was granted</p>
        <div className={`min-h-screen ${isTheaterMode ? "fullscreen" : ""}`}>
            <iframe
                src="https://kickvod.com/"
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
                style={{ width: '100%', height: '100vh'  }}
            ></iframe>
      <button
        onClick={handleToggleTheaterMode}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full"
      >
        {isTheaterMode ? <FaCompress /> : <FaExpand />}
      </button>
        </div>
        </>
    );
}

export default Vods;