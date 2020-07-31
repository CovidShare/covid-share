import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import config from "./config/config.js";
import authRouter from "./routes/AuthRouter.js";
import User from "./models/UserModel.js";
import dotenv from "dotenv/config.js";
import sgMail from "@sendgrid/mail";
import axios from "axios";
import cron from "node-cron";

const apiKey =
  "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";
const PORT = process.env.NODE_ENV || config.port;

// DATABASE CONNECTION
mongoose.connect(
  config.db.uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Successfully connected to DB");
  }
);
// Event triggers when the connection gives an error
mongoose.connection.on("error", () => {
  console.log("Error in connection to DB");
});
// Event triggers when the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Connection to DB is closed");
});
let emails = [];
let articles = "";
let getArticles = async () => {
  axios({
    method: "GET",
    url: "https://covid-19-news.p.rapidapi.com/v1/covid",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
      "x-rapidapi-key": "e48304fd56msh9b42ff3b0af4628p1e35b3jsnc8e93f88bf3a",
      useQueryString: true,
    },
    params: {
      sources: "cdc.gov",
      lang: "en",
      media: "True",
      from: "2020%2F07%2F28",
      q: "covid",
    },
  })
    .then((response) => {
      articles = "";
      for (var i = 0; i < response.data.articles.length; i++) {
        let title = response.data.articles[i].summary + "\n";
        let link = response.data.articles[i].link;
        let result = title.concat(link);

        result = "<li>" + result + "</li><br>";
        articles = articles + result;
      }
    })
    .then((response) => {
      let htmltest = `<h1>Hello! Here's the latest on COVID-19 From the CDC</h1>
            <ul>${articles}</ul>
            <h3>Remember to wear a mask, social distance and stay safe!</h3>`;
      let emails = [];
      var mysort = { code: 1 };
      User.find({}, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < result.length; i++) {
            if (result[i].notifications == false) {
              emails.push(result[i].email);
            }
          }
        }
      }).sort(mysort);

      sgMail.setApiKey(apiKey);
      const msg = {
        to: emails, //to be fixed
        from: "covidshareinc@gmail.com",
        subject: "Covid-19 Update",
        html: htmltest,
      };

      /* Remove when all non valid emails are deleted
      sgMail
        .send(msg)
        .then(() => {
          console.log("Message sent");
        })
        .catch((error) => {
          console.log(error.response.body);
          // console.log(error.response.body.errors[0].message)
        });*/
    })
    .catch((error) => {
      console.log(error);
    });
};
//cron.schedule("45 23 * * 6", () =>{ Remove when ready for final deployment
getArticles();
//});
const app = express(); // Init express app
app.use(morgan("dev")); // Request log
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/auth", authRouter);

// Heroku - Serve statis assets if in production
if (process.env.NODE_ENV === "production") {
  // Set statis folder
  app.use(express.static("client/build")); // Setting static folder and
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.NODE_ENV || config.port, () => {
  console.log(`App now listening...`);
});
