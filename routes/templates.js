import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { insertTemplates } from "../controllers/Users/Template.insert.js";
const routerPostTemplates = express.Router();

routerPostTemplates.post('/', authenticateToken, async(req, res)=>
{   
    try
    {  
            const result =await insertTemplates(req.data.mail,req.body.obj)
            if(!result) return res.status(400).json({message:'Operation was not possible'})

            return res.status(200).json({ message: 'Template added to the database' });
    }
    catch(error)
    {
        console.error(error)
        return res.status(400).json({ message: error });
    }
    finally
    {
        
    }
})

export default routerPostTemplates;