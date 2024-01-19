import React, { useState } from "react";
import { FaPlus, FaExpand, FaCompress, FaTimes } from "react-icons/fa";

const MultiStreams = () => {
  const [streams, setStreams] = useState([]);
  const [newStream, setNewStream] = useState("");
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const addStream = () => {
    if (newStream.trim() !== "") {
      setStreams((prevStreams) => [...prevStreams, newStream]);
      setNewStream("");
    }
  };

  const removeStream = (index) => {
    setStreams((prevStreams) => prevStreams.filter((_, i) => i !== index));
  };

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
      {/* Display iframes for each stream */}
      <div className="grid gap-1 lg:grid-cols-2 sm:grid-cols-1 auto-rows-max relative p-2 object-fill">
        {streams.map((stream, index) => (
          <div key={index} className="mb-0 relative">
            <button
              onClick={() => removeStream(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <FaTimes />
            </button>
            <iframe
              src={`https://player.kick.com/${stream}`}
              title={`Stream ${index + 1}`}
              className="w-full h-96"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      {/* Floating button for adding new streams */}
      <button
        onClick={() => {
          const streamName = prompt("Kick channel Name, one name at a time");
          if (streamName) {
            setStreams((prevStreams) => [...prevStreams, streamName]);
          }
        }}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:text-green-500"
      >
        <FaPlus />
      </button>

      {/* Theater Mode Button */}
      <button
        onClick={handleToggleTheaterMode}
        className="fixed top-4 right-4 bg-gray-900 text-white p-2 rounded-full hover:text-purple-500"
      >
        {isTheaterMode ? <FaCompress /> : <FaExpand />}
      </button>
    </>
  );
};

export default MultiStreams;