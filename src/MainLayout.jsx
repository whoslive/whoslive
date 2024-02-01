import React, { useState, useEffect, lazy, Suspense } from "react";
import { useStream } from "./StreamContext";
import Footer from "./Footer";
import axios from "axios";
const LazyStreamCard = lazy(() => import("./StreamCard"));

const MainLayout = () => {
  const { setStreams, streamsData } = useStream();
  const [hoveredStream, setHoveredStream] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/whoslive/streamfile/main/streamData.json"
        );

        const data = response.data;

        setStreams(data);
      } catch (error) {
        console.error("Error fetching stream data:", error);
      }
    };

    fetchData();
  }, [setStreams]);

  return (<>
    <main className="flex flex-col min-h-screen">
      {/* Wrap the lazy-loaded component in a Suspense component */}
      <Suspense fallback={<div className="text-wihte">Loading...</div>}>
        <LazyStreamCard onStreamHover={setHoveredStream} streamsData={streamsData} />
      </Suspense>

      {hoveredStream && (
        <div>
          <p>{hoveredStream.id}</p>
        </div>
      )}
      
    </main>
    <Footer/>
    </>
  );
};

export default MainLayout;