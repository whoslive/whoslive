import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';

const StreamCard = ({ onStreamHover, streamsData }) => {
  const [onlineChannels, setOnlineChannels] = React.useState([]);
  const [offlineChannels, setOfflineChannels] = React.useState([]);

  React.useEffect(() => {
    const checkOnlineStatus = async () => {
      const updatedChannels = await Promise.all(
        streamsData.map(async (stream) => {
          try {
            const response = await axios.get(`https://kick.com/api/v1/channels/${stream.id}`);
            const data = response.data;
            const isOnline = data.livestream;

            return {
              ...stream,
              isOnline,
            };
          } catch (error) {
            console.error(`Error fetching status for ${stream.id}:`, error);
            return {
              ...stream,
              isOnline: false,
            };
          }
        })
      );

      // Separate online and offline channels
      const online = updatedChannels.filter(channel => channel.isOnline);
      const offline = updatedChannels.filter(channel => !channel.isOnline);

      setOnlineChannels(online);
      setOfflineChannels(offline);
    };

    // Initially check the online status and set up an interval for periodic checks
    checkOnlineStatus();
    const intervalId = setInterval(checkOnlineStatus, 3 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [streamsData]);

  const handleStreamHover = (stream) => {
    onStreamHover(stream);
  };

  return (
    <div className="flex flex-wrap">
      {/* Display online channels at the top */}
      {onlineChannels.map((stream, index) => (
        <div key={stream.id} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2 relative hover:bg-opacity-20">
          {/* Stream iframe */}
          <iframe
            src={stream.streamSrc}
            title={`Stream ${index + 1}`}
            className="w-full h-64 md:h-96 border-solid border-2 border-blue-900"
            allowFullScreen
            frameBorder="0"
            scrolling="no"
          ></iframe>

          {/* Stream title */}
          <div className="mt-1 text-center flex items-center justify-center h-9 p-0">
            <p className="text-white text-lg font-semibold">{stream.streamTitle}</p>
          </div>

          {/* Chat iframe */}
          <Link key={stream.id} to={`/watch/${stream.id}`}>
            <div className="relative">
              <iframe
                src={stream.chatSrc}
                title={`Chat ${index + 1}`}
                className="w-full h-48 md:h-54 mt-4 border-double border-4 border-blue-900"
                allowFullScreen
                frameBorder="0"
                onMouseEnter={() => handleStreamHover(stream)}
                onMouseLeave={() => handleStreamHover(null)}
              ></iframe>

              {/* Highlight and Watch text */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 bg-sky-500 bg-opacity-20 p-4 hover:opacity-100 transition-opacity duration-300">
                <p className="text-gray-300 font-bold text-2xl">Watch in Theater Mode 🍿</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Display offline channels below online channels */}
      {offlineChannels.map((stream, index) => (
        <div key={stream.id} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2 relative hover:bg-opacity-20">
          {/* Stream iframe */}
          <iframe
            src={stream.streamSrc}
            title={`Stream ${index + 1}`}
            className="w-full h-64 md:h-96 border-solid border-2 border-blue-900"
            allowFullScreen
            frameBorder="0"
            scrolling="no"
          ></iframe>

          {/* Stream title */}
          <div className="mt-1 text-center flex items-center justify-center h-9 p-0">
            <p className="text-white text-lg font-semibold">{stream.streamTitle}</p>
          </div>

          {/* Chat iframe */}
          <Link key={stream.id} to={`/watch/${stream.id}`}>
            <div className="relative">
              <iframe
                src={stream.chatSrc}
                title={`Chat ${index + 1}`}
                className="w-full h-48 md:h-54 mt-4 border-double border-4 border-blue-900"
                allowFullScreen
                frameBorder="0"
                onMouseEnter={() => handleStreamHover(stream)}
                onMouseLeave={() => handleStreamHover(null)}
              ></iframe>

              {/* Highlight and Watch text */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 bg-sky-500 bg-opacity-20 p-4 hover:opacity-100 transition-opacity duration-300">
                <p className="text-gray-300 font-bold text-2xl">Watch in Theater Mode 🍿</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

StreamCard.propTypes = {
  onStreamHover: PropTypes.func.isRequired,
  streamsData: PropTypes.array.isRequired,
};

export default StreamCard;
