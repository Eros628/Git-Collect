import express from 'express';
import {verification} from '../middleware/verification_middleware.js';
import {searchByRepos, searchByUser } from '../services/searchService.js';


const router = express.Router();



router.use(verification);

router.get("/search/repositories" ,async (req, res)=>{
    
    const {q, sort, order, page} = req.query;
    console.log(q);
    const response =  await searchByRepos({q, sort,page, order}, req.githubAxios);
    res.send(response);
});

router.get("/search/user", async(req, res)=>{
    
    const {q, sort, page, order} = req.query;
    const data = await searchByUser({q, sort, page, order}, req.githubAxios);
    res.send(data);
})

router.get("/:user/repos", async(req, res)=>{ 
    const user = req.params.user;
    const data = await getUserAllRepos(user, req.githubAxios);
    res.send(data);
})


export default router;