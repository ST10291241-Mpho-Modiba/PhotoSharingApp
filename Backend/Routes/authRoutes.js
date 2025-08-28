import express from 'express';
import {signUp,Login} from '../Controllers/authController.js';
import {validateSignUp,validateLogin} from '../Middleware/validaters.js'
const router = express.Router();



router.get('/Login',(req,res) =>{
    res.send('Welcome to the PhotoShare API Login route');
});

router.post('/signup',validateSignUp,signUp);
router.post('/login',validateLogin,Login);




export default router;