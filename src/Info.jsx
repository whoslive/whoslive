import React from "react";
import Footer from "./Footer";
const Info = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between text-center">
      <div>
        <br />
        <h2 className="text-3xl font-bold mb-4 text-white">Website Information:</h2>
        <br />
        <p className="text-lg text-white">
          Welcome to "Who's Live?" a platform that aggregates and presents live streaming content
          from various sources. Explore different streams and enjoy the latest content from your
          favorite creators.
        </p>
        <p className="text-lg mt-4 text-white">
          This platform is designed to provide a seamless experience for discovering and watching live
          streams.
          <br />
          I created this for myself first and then I thought it would be fun to share this experience
          with others. Feel free to navigate through the streams and find your preferred content , <a
          href="https://paypal.me/nasserSA7?country.x=SA&locale.x=en_US"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="donation"
          className="text-blue-500"
        >please support me by donating it means a lot .</a>

          <br />
          For more information, to add other features (or other creators), or to support, you can
          contact me at whosliverightnow@gmail.com or on  <a
          href="https://twitter.com/Vict3r7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Twitter"
          className="text-blue-500"
          >My X account</a>
        </p>
        <br/>
        <p className="text-bold text-red-500 mt-4 text-xl">
          This platform doesn't have any ill intent whatsoever to harm in any way shape form or
          entity any individuals, or companies..., and by using this platform you agree to this statement.
        </p>
        
      </div>
      <Footer />
    </div>
  );
};

export default Info;
