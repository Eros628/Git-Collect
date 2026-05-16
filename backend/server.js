import express from 'express';
import { getUserAllRepos, searchByRepos, searchByUser } from './services/api.js';

const app = express();


app.get("/gitcollect/api/search/repositories", async (req, res)=>{
    console.log(req);
    const {q, sort, page, order } = req.query;
    const response =  await searchByRepos({q, sort, page, order});
    res.send(response);
});

app.get("/gitcollect/api/search/:user", async(req, res)=>{
    const {q, sort, page, order} = req.query;
    const user = req.params.user;
    const data = await searchByUser({user, q, sort, page, order});
    res.send(data.data);
});

app.get("/gitcollect/api/:user/repos", async(req, res)=>{
    const user = req.params.user;
    const data = await getUserAllRepos(user);
    res.send(data);
});

app.listen(3000, ()=>{
    console.log(`THE SERVER IS RUNNING ON: `)
});