import express from 'express';
import { searchByRepos, searchByUser } from './services/api.js';

const app = express();


app.get("/gitcollect/api/repositories", async (req, res)=>{
    console.log(req);
    const {q, sort, page, order } = req.query;
    const response =  await searchByRepos({q, sort, page, order});
    res.send(response);
});

app.get("/gitcollect/api/:user", async(req, res)=>{
    const {q, sort, page, order} = req.query;
    const user = req.params.user;
    const data = await searchByUser({user, q, sort, page, order});
    res.send(data.data);
})  

app.listen(3000, ()=>{
    console.log(`THE SERVER IS RUNNING ON: `)
});