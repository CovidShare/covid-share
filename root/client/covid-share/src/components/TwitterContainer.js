// TwitterContainer.js
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterContainer = () => {
  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="CDCemergency"
          options={{
            tweetLimit: "2",
            width: "100%",
            height: 200
          }}
          theme="light"
          noHeader="true"
          noBorders="true"
          noFooter="true"
          transparent="true"
        ></TwitterTimelineEmbed>
      </div>
    </section>
  );
};

export default TwitterContainer;