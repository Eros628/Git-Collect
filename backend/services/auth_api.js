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


export async function  getUser(githubAxios) {
    const user = await githubAxios.get('https://api.github.com/user');
    const formatUser = {
        username: user.data.login,
        name: user.data.name,
        avatar: user.data.avatar_url,
        html_url: user.data.html_url,
        following: user.data.following,
        followers: user.data.followers,
        repo_url: user.data.repo_url
    }
    return formatUser;
}
