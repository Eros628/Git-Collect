import 'dotenv/config.js';

export const githubConfig = {
    client_id : process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    apiBaseURL: "https://api.github.com",
    redirectURLAuth: "https://github.com/login/oauth/authorize"
}