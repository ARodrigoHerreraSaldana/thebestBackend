import express from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
//For the .env
import cors from "cors";
//limit the number of request per Ip
import rateLimit from "express-rate-limit"; 
import authenticateToken from './middleware/authenticateToken.js'
import cookieParser from 'cookie-parser';
import routerRegister from "./routes/register.js";
import routerGetUsers from "./routes/getUsers.js";
import routerPostTemplates from "./routes/templates.js";
import routerCards from "./routes/cards.js";
import routerPostAnswers from "./routes/answers.js";
import routerSalesForce from "./routes/salesforce.js";
dotenv.config()
const app = express();
const limiter=rateLimit({
    windowMs:15*60*1000, //in miliseconds
    max:150, //number of requests
    message:"To many requests"
});
app.use(cookieParser());
app.use(bodyParser.json())
app.use(limiter);
app.use(cors({ origin: true, credentials: true }));



const posts=[
  {
      username:'testmail2@gmail.com',
      title:'Post 1'
  },
  {
      username:'Jim',
      title:'Post 2'
  },
]

//Routes
//register for first time
app.use('/register',routerRegister)
app.use('/lastLogin',routerGetUsers)
//create templates
app.use('/templates',routerPostTemplates)

app.get('/posts',authenticateToken,(req,res)=>{
  
res.json(posts.filter(post=>post.username===req.data.mail))
})

app.use('/cards',routerCards)
app.use('/answers',routerPostAnswers)
app.use('/salesForce',routerSalesForce)

const server=app.listen(3003)
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