import axios from "axios";
import { githubConfig } from "../config/github.js";

export function verification(req, res, next){
    const token = req.cookies.token;

    if(!token){
         return res.status(401).json({
            isLogged: false,
            message: "Unauthorized. Please Login First"
        });
    };

    req.githubAxios = axios.create({
        baseURL: githubConfig.apiBaseURL,
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    });

    next();
}

