import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} from './index.js'
import generateAccessToken from "./middleware/generateToken.js";
import routerLogin from "./routes/login.js";
//For the .env
import cors from "cors";
//limit the number of request per Ip
import rateLimit from "express-rate-limit"; 
import connection from "./src/db.js";
import routerToken from "./routes/token.js";
import cookieParser from 'cookie-parser';
import routerLogout from "./routes/logout.js";
dotenv.config()

const app = express();
const limiter=rateLimit({
    windowMs:15*60*1000, //in miliseconds
    max:50, //number of requests
    message:"To many requests"
});
app.use(bodyParser.json())
app.use(limiter);
app.use(cookieParser());
app.use(cors())
app.use('/login',routerLogin);
app.use('/token',routerToken);
app.use('/logOut',routerLogout)


// app.delete('/logout', (req,res)=>
// {
// refreshTokens= refreshTokens.filter(token => token !== req.body.token)
// res.sendStatus(204)
// })





const server=app.listen(4000)
process.on("SIGTERM", async () => {
    if (server) {
      server.close(() => {});
    }
  });
  process.once('SIGUSR2', function () {
    console.log('killed')
    if (server) {
        server.close(() => {});
      }
    process.kill(process.pid, 'SIGUSR2');

  });
  
  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    console.log('killed2')
    if (server) {
        server.close(() => {});
      }
    process.kill(process.pid, 'SIGINT');

  });