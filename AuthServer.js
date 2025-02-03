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
    max:50, //number of requests
    message:"To many requests"
});

app.use(bodyParser.json())
app.use(limiter);

//store refreshTokens
let refreshTokens = []

//this function generates a new Token
function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
}

//this function deletes one token from the refresh tokens array
app.delete('/logout', (req,res)=>
{
refreshTokens= refreshTokens.filter(token => token !== req.body.token)
res.sendStatus(204)
})

app.post('/login',(req,res)=>{
//authenticate user
const username=req.body.username; 
const user = {name:username}
const accessToken=generateAccessToken(user)
const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

//push to the database
refreshTokens.push(refreshToken)
res.json({accessToken:accessToken, refreshToken:refreshToken})
})



app.post('/token',(req,res) =>{
    console.log(refreshTokens)
    const refreshToken = req.body.token
    if(refreshToken==null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user) => 
    {
     if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name:user.name})
    res.json(({accessToken:accessToken}))
    })
})


const server=app.listen(4000)
process.on("SIGTERM", async () => {
    if (server) {
      server.close(() => {});
    }
  });