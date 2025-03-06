import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { insertTemplates } from "../controllers/Users/Template.insert.js";
import { getCards } from "../controllers/Users/Template.find.cards.js";
import { getCard } from "../controllers/Users/Template.find.card.js";
const routerCards = express.Router();

routerCards.get('/', authenticateToken, async(req, res)=>
{   
    try
    {  
            
            const result =await getCards()
            if(!result) return res.status(400).json({message:'Operation was not possible'})
            return res.status(200).json({ message: result });

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

routerCards.post('/uuid', authenticateToken, async(req, res)=>
    {   
        try
        {          
                const result =await getCard(req.body.uuid)
                
                if(!result) return res.status(400).json({message:'Operation was not possible'})
                return res.status(200).json({ message: result });
    
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

export default routerCards;