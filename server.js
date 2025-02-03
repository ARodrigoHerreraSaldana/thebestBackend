import express from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
//For the .env
import cors from "cors";
//limit the number of request per Ip
import rateLimit from "express-rate-limit"; 
dotenv.config()
const app = express();
const limiter=rateLimit({
    windowMs:15*60*1000, //in miliseconds
    max:70, //number of requests
    message:"To many requests"
});


const posts=[
    {
        username:'Kyle',
        title:'Post 1'
    },
    {
        username:'Jim',
        title:'Post 2'
    },
]
app.use(bodyParser.json())
app.use(limiter);


app.get('/posts',authenticateToken,(req,res)=>{
res.json(posts.filter(post=>post.username===req.user.name))
})


app.post('/token', (req,res) => {
    const refreshToken = req.body.token
})
//middleware
function authenticateToken(req,res,next){
 
    const authHeader=req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>
{
    if(err) return res.sendStatus(403)
        req.user=user
    next()
})

}

const server=app.listen(3003)
process.on("SIGTERM", async () => {
    if (server) {
      server.close(() => {});
    }
  });