import {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} from '../index.js'
import jwt from "jsonwebtoken";

export default function authenticateToken(req,res,next){
    const token = req.cookies.accessToken;
    if(!token) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>
{
    if(err) return res.sendStatus(403)
        req.data=data
    next()
})

}
