import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import search from './routes/search.js';
import auth from './routes/auth.js';
import user from './routes/user.js';




const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser());

app.use('/gitcollect/api', search);
app.use('/gitcollect/auth', auth);
app.use('/gitcollect/user', user)


app.listen(3000, ()=>{
    console.log(`THE SERVER IS RUNNING ON: `)
});