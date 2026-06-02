import express from 'express';
import { verification } from '../middleware/verification_middleware.js';
import { getUser } from '../services/userService.js';

const router = express.Router();

router.use(verification);


router.get('/', async (req, res)=>{
    const {user} = req.query;
    const response = await getUser(user, req.githubAxios);

    res.send(response);
})

export default router;

