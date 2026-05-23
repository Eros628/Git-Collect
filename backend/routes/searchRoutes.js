import express from 'express';
import {verification} from '../middleware/verification_middleware.js';
import { getUserAllRepos, searchByRepos, searchByUser } from '../services/search_api.js';


const router = express.Router();



router.use(verification);

router.get("/search/repositories", verification ,async (req, res)=>{
    
    const {q, sort, page, order } = req.query;
    const response =  await searchByRepos({q, sort, page, order}, req.githubAxios);
    res.send(response);
});

router.get("/search/:user", verification, async(req, res)=>{
    
    const {q, sort, page, order} = req.query;
    const user = req.params.user;
    const data = await searchByUser({user, q, sort, page, order}, req.githubAxios);
    res.send(data.data);
})

router.get("/:user/repos", async(req, res)=>{ 
    const user = req.params.user;
    const data = await getUserAllRepos(user, req.githubAxios);
    res.send(data);
})


export default router;