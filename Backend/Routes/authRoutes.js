import express from 'express';
import {signUp,Login} from '../Controllers/authController.js';
import {validateSignUp,validateLogin} from '../Middleware/validaters.js'
import requireAdmin from '../Middleware/roleBaseAccessControl.js';
import upload from '../Middleware/upload.js';
const router = express.Router();

router.post('/signup',validateSignUp,signUp);
router.post('/login',validateLogin,Login);





export default router;