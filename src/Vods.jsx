import React, { useState, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';

function Vods() {
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const handleToggleTheaterMode = () => {
    const body = document.body;

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

  useEffect(() => {
    const iframe = document.getElementById('kickvod-iframe');

    const handleIframeLoad = () => {
      const contentMiddleDiv = iframe.contentDocument.getElementById('content-middle');

      // Ensure the div with the ID 'content-middle' exists before attempting to manipulate it
      if (contentMiddleDiv) {
        // Manipulate the content or apply any additional styling as needed
        // Example: contentMiddleDiv.style.backgroundColor = 'red';
      }
    };

    iframe.addEventListener('load', handleIframeLoad);

    // Remove event listener on component unmount
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, []);

  return (
    <>
      <p className='text-green-800'>Permission from site owner was granted</p>
      <div className={`min-h-screen ${isTheaterMode ? 'fullscreen' : ''}`}>
        <iframe
          id='kickvod-iframe'
          src='https://kickvod.com/'
          className='w-full h-full'
          allowFullScreen
          frameBorder='0'
          style={{ width: '100%', height: '100vh' }}
        ></iframe>
        <button
          onClick={handleToggleTheaterMode}
          className='fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full'
        >
          {isTheaterMode ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
    </>
  );
}

export default Vods;
