// TheaterMode.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaExpand, FaCompress } from "react-icons/fa";
import axios from "axios";
import './App.css';

const TheaterMode = () => {
  const { streamId } = useParams();
  const [selectedStream, setSelectedStream] = useState(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/whoslive/streamfile/main/streamData.json");
        const streamData = response.data;

        // Find the stream with the given streamId
        const stream = streamData.find(stream => stream.id === streamId);

        if (stream) {
          setSelectedStream(stream);
        } else {
          console.error(`Stream with ID ${streamId} not found.`);
          // Handle the case where the stream is not found, e.g., redirect to a default page
        }
      } catch (error) {
        console.error("Error fetching stream data:", error);
        // Handle the error, e.g., show an error message or redirect to a default page
      }
    };

    fetchStreamData();
  }, [streamId]);

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
    <div className={`flex flex-col lg:flex-row ${isTheaterMode ? "fullscreen" : ""}`}>
      {/* Stream iframe */}
      <div className={`w-full lg:w-4/5 ${isTheaterMode ? "fullscreen" : ""}`}>
        <iframe
          src={selectedStream?.streamSrc || ""}
          title={`Theater Mode - ${selectedStream?.id || ""}`}
          className={`w-full h-96 lg:h-screen ${isTheaterMode ? "fullscreen" : ""}`}
          allowFullScreen
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* Chat iframe */}
      <div className={`w-full lg:w-1/5 mt-4 lg:mt-0 ${isTheaterMode ? "fullscreen" : ""}`}>
        <iframe
          src={selectedStream?.chatSrc || ""}
          title={`Chat - ${selectedStream?.id || ""}`}
          className={`w-full h-96 lg:h-screen ${isTheaterMode ? "fullscreen" : ""}`}
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>

      {/* Theater Mode Button */}
      <button
        onClick={handleToggleTheaterMode}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full"
      >
        {isTheaterMode ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
};

export default TheaterMode;
