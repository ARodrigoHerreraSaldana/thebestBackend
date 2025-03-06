import { USERNAME, PASSWORD, TOKEN , CONSUMER_KEY, CONSUMER_SECRET,APP_DOMAIN } from "../index.js";
import jsforce from "jsforce";
import dotenv from "dotenv";

const oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    //loginUrl : 'https://test.salesforce.com',
    clientId: CONSUMER_KEY,
    clientSecret: CONSUMER_SECRET,
    redirectUri:  process.env.NODE_ENV === 'development' ? `${process.env.URL}/callback` : `${APP_DOMAIN}/callback` 
  });

export default oauth2;
