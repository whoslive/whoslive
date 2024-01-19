import React, { useState, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import axios from 'axios';

function Vods() {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [content, setContent] = useState('');

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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.post('/.netlify/functions/fetchContent', {
          url: 'https://kickvod.com/',
        });
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      <p className='text-green-800'>Permission from site owner was granted</p>
      <div className={`min-h-screen ${isTheaterMode ? 'fullscreen' : ''}`}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
