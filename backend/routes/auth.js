import express from 'express';
import { verification } from '../middleware/verification_middleware.js';
import { githubConfig } from '../config/github.js';
import { Auth, getUser } from '../services/authService.js';
const router = express.Router();

router.get("/github", (req, res)=>{
    const params = new URLSearchParams({
        client_id: githubConfig.client_id,
        prompt: "select_account",
        scope: "user repo"
    });

    res.redirect(`${githubConfig.redirectURLAuth}?${params.toString()}`);
});

router.get("/github/callback", async(req, res)=>{
    const code = req.query.code;

    if(!code){
        return res.status(400).json({error: "No code provided by GitHub"});
    }

   const token = await Auth(code);

   if(!token){
        return res.status(400).json({error: "Token is empty", token: token});
   }

   res.cookie("token", token.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 2000000
   }); 


    res.redirect('http://localhost:5173/home');

});

router.get("/verify", verification, (req, res)=>{
    return res.status(200).json({isLogged: true, messsage: "The user is already Log in"})
});


router.get('/user', verification, async(req, res)=>{
    const user =  await getUser(req.githubAxios);
    return res.json(user);
})


export default router;