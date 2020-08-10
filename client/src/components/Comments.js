import React, { Component } from "react"
import Disqus from "disqus-react"

export default class extends Component {
  render() {
    const disqusShortname = "covidshare"
    const disqusConfig = {
      url: "http://localhost:3000/share",
      identifier: "article-id",
      title: "Title of Your Article"
    }

    return (
      <div className="article-container">

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
}