import { redirect } from "react-router";
import axios from 'axios';
import { userContext } from "../context/userContext";


export  async function authMiddleware({context}, next){
    try {
            const verify = await axios.get("http://localhost:3000/gitcollect/auth/verify", {
            withCredentials: true
            });

            if(verify.data.isLogged){
                const userData = await axios.get("http://localhost:3000/gitcollect/auth/user", {
                    withCredentials: true
                });

                context.set(userContext, userData.data);
                await next();
                
            }
        } catch (error) {
            throw redirect("/");
        }
}