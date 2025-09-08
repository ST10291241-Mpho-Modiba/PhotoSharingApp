import express from 'express';



const router = express.Router();

router.get('/Upload',(req,res) =>{
    res.send('Welcome to the PhotoShare API Photo share Route');
})


export default router;