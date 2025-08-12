import express from 'express';



const router = express.Router();

router.get('/Login',(req,res) =>{
    res.send('Welcome to the PhotoShare API Login route');
})


export default router;