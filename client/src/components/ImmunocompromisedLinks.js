import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import NavBar from "./NavBar.js";
import logoN from "../assets/LogoNew.png";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { Nav } from "react-bootstrap";
import "../styles/Prevention.css";
class ImmunocompromisedLinks extends React.Component {
  constructor(props) {
    super();
    this.state = { articleList: [], links: [] };
  }
  render() {
    let articleList = [];
    let links = [];

    async function fetchHTML(url) {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    }

    (async () => {
      const $ = await fetchHTML(
        "https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/index.html"
      );

      $("ul.block-list.td-none li").each((index, value) => {
        var link = $(value).find("a").attr("href");
        if (!link.includes("youtube")) {
          link = "https://www.cdc.gov" + link;
        }
        var title = $(value).find("a").text();
        if (!link.includes("language-assistance")) {
          links.push({ link: link, title: title });
        }
      });

      let test = links.map((article) => (
        <div className="linkContainer">
          <a href={article.link}>{article.title}</a>
        </div>
      ));
      this.setState({ articleList: test });
    })();
    if (this.state.articleList.length == 0) {
      return null;
    } else {
      return <div>{this.state.articleList}</div>;
    }
  }
}

export default ImmunocompromisedLinks;
