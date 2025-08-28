import express from 'express';
import requireAdmin from '../Middleware/roleBaseAccessControl.js';
import auth from '../Middleware/auth.js';
const router = express.Router();

router.get('/Create',(req,res) =>{
    res.send('Welcome to the PhotoShare API Create User Route');
})

router.get("/me",(req,res) =>{
res.json({})
})

export default router;