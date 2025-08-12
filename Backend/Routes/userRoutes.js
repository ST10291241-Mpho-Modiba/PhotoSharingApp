import express from 'express';

const router = express.Router();

router.get('/Create',(req,res) =>{
    res.send('Welcome to the PhotoShare API Create User Route');
})


export default router;