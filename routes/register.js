import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
const routerRegister = express.Router();

routerRegister.post('/', async(req, res)=>
{   
    
    if(!req.body) return res.status(400).json({ message: "Your fields can not be empty" });
    const{firstName,email,lastName, occupation,password} = req.body
    if(!firstName||!email||!lastName||!occupation||!password) return res.status(403).json({message:'Your fields can not be emptyy'})
    try
    {
        const results =  await sequelize.query(
            "caLL registerUser(:firstName,:lastName,:occupation,:email,:password)",
            {
              replacements: { firstName: req.body.firstName, email:req.body.email, lastName: req.body.lastName,occupation:req.body.occupation,password: req.body.password},
              type: sequelize.QueryTypes.RAW,
            })
            return res.status(200).json({ message: "User registered" });
    }
    catch(error)
    {
        console.error(error)
        return res.status(400).json({ message: error.parent.sqlMessage  });
    }
    finally
    {
        
    }
})

export default routerRegister;