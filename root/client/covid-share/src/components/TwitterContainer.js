import React, { useEffect } from "react";
import "../styles/TwitterContainer.css";

const TwitterContainer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-tweet-limit="1"
          data-chrome="noheader nofooter noborders"
          href="https://https://twitter.com/CDCgov"
        >
          Tweets by CDC
        </a>
      </div>
    </section>
  );
};

export default TwitterContainer;
