import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import authRouter from './routes/AuthRouter.js';

const PORT = process.env.PORT || config.port;

// DATABASE CONNECTION
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log("Successfully connected to DB");
});
// Event triggers when the connection gives an error
mongoose.connection.on('error', () => {
    console.log("Error in connection to DB");
});
// Event triggers when the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log("Connection to DB is closed");
});


const app = express(); // Init express app
app.use(morgan('dev')); // Request log
app.use(cookieParser());
app.use(express.json());


// ROUTES
app.use("/auth", authRouter);






app.listen(PORT, () => {
    console.log(`App now listening on port ${config.port}`);
});
