import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import searchRoutes from './routes/searchRoutes.js';
import authRoutes from './routes/authRoutes.js';



const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser());

app.use('/gitcollect/api', searchRoutes);
app.use('/gitcollect/auth', authRoutes);


app.listen(3000, ()=>{
    console.log(`THE SERVER IS RUNNING ON: `)
});