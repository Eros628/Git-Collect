import axios from "axios";
import 'dotenv/config.js';
import { githubConfig } from "../config/github.js";
import { json } from "express";



export async function Auth(code){
    const token = await axios.post("https://github.com/login/oauth/access_token",{
        client_id: githubConfig.client_id,
        client_secret: githubConfig.client_secret,
        code:code
    }, {headers: {
        Accept: 'application/json'
    }});

    return token.data;
}
