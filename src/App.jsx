import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import MainLayout from "./MainLayout";
import TheaterMode from "./TheaterMode";
import Navbar from "./Navbar";
import { StreamProvider } from "./StreamContext";
import Info from "./Info";
const Vods = React.lazy(() => import('./Vods'))
const MultiStreams = React.lazy(() => import('./MultiStreams')) 

const App = () => {
  return (
    <StreamProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<MainLayout />} />
          <Route path="/watch/:streamId" element={<TheaterMode />} />
          <Route path="/info" element={<Info />} />
          <Route path="/Vods" element={<React.Suspense fallback='loading..'><Vods /></React.Suspense>} />
          <Route path="/multi" element={<React.Suspense fallback='loading..'><MultiStreams /></React.Suspense>} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </Router>
    </StreamProvider>
  );
};

export default App;