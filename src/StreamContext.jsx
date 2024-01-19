import { createContext, useContext, useState, useCallback } from 'react';

const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
  const [streamsData, setStreamsData] = useState([]);

  const setStreams = useCallback((data) => {
    setStreamsData(data);
  }, []); // empty dependency array since setStreamsData doesn't change

  return (
    <StreamContext.Provider value={{ streamsData, setStreams }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};
