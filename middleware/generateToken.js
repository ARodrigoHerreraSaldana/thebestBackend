import {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} from '../index.js'
import jwt from "jsonwebtoken";
//this function generates a new Token
export default function generateAccessToken(data){
    if(ACCESS_TOKEN_SECRET==undefined){
        return null
    }
    else
    {
        //create a token
        return jwt.sign(data,ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
    }
}
