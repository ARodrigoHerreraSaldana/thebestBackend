import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET,APP_DOMAIN,FRONT_DOMAIN } from "./index.js";
import generateAccessToken from "./middleware/generateToken.js";
import routerLogin from "./routes/login.js";
//For the .env
import cors from "cors";
//limit the number of request per Ip
import rateLimit from "express-rate-limit";
import connection from "./src/db.js";
import routerToken from "./routes/token.js";
import cookieParser from "cookie-parser";
import routerLogout from "./routes/logout.js";
import oauth2 from "./src/salesforce.js";
import jsforce from "jsforce";
import { fileURLToPath } from "url";
import path from "path";
import authenticateToken from "./middleware/authenticateToken.js";
import session from "express-session";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //in miliseconds
  max: 50, //number of requests
  message: "To many requests",
});
app.use(bodyParser.json());
app.use(limiter);
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    secret: ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/login", routerLogin);
app.use("/token", routerToken);
app.use("/logout", routerLogout);
app.use("/logout", routerLogout);

let accessTokenSalesForce;
let instanceUrlSalesForce;
let refreshTokenSalesForce;
//SalesForce
app.get("/auth", function (req, res) {
  const authURL = oauth2.getAuthorizationUrl({
    scope: "api web openid refresh_token",
  });
  
  res.redirect(authURL);
});

app.get("/callback", async function (req, res) {
  const conn = new jsforce.Connection({ oauth2 });
  const code = req.query.code;
  try {
    const userInfo = await conn.authorize(code);
    
    
    
    

    accessTokenSalesForce = conn.accessToken;
    instanceUrlSalesForce = conn.instanceUrl;
    refreshTokenSalesForce = conn.refreshToken;

    
    
    if(process.env.NODE_ENV === 'development') 
    {
    res.redirect(`${process.env.FRONT}/salesForceprotected`);
    }
    else
    {
     res.redirect(`${FRONT_DOMAIN}/salesForceprotected`);
    }
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    res.status(500).send("Internal Server Error");
  } finally {
  }
});

app.get('/test', (req, res) => {
  
  
  if (req.session.accessToken) {
      res.status(200).send({ message: "We send it to the SalesForce App" });
  } else {
    res.status(400).send('No access token found in session');
  }
});


app.post("/Register", async function (req, res) {

  try{
  const conn = new jsforce.Connection({
    oauth2,
    instanceUrl: instanceUrlSalesForce,
    accessToken: accessTokenSalesForce,
    refreshToken: refreshTokenSalesForce,
  });

  
   // Create Account
   const account = await conn.sobject('Account').create({
    Name: req.body.AccountName,
    Site: req.body.AccountSite
  });
  
  // Create Contact associated with Account
  const contact = await conn.sobject('Contact').create({
    LastName: req.body.LastName,
    FirstName: req.body.LastName,
    Email:req.body.Email,
    Title: req.body.Title,
    MobilePhone:req.body.Telephone,
    AccountId: account.id
    
  });
  res.status(200).send({ message: "We send it to the SalesForce App" });
  conn.on("refresh", function (accessToken, res) {
    accessTokenSalesForce=accessToken
    
  });
  
}

catch(error)
{
  console.error(error)
  res.status(403).send({ message: error.errorCode });
}
finally{

}});



const server = app.listen(4000);
process.on("SIGTERM", async () => {
  if (server) {
    server.close(() => {});
  }
});
process.once("SIGUSR2", function () {
  console.log("killed");
  if (server) {
    server.close(() => {});
  }
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  console.log("killed2");
  if (server) {
    server.close(() => {});
  }
  process.kill(process.pid, "SIGINT");
});
