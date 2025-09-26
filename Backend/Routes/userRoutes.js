import express from 'express';
import requireAdmin from '../Middleware/roleBaseAccessControl.js';
import auth from '../Middleware/auth.js';
import{getMe,updateMe,getAllUsers,getUserById,deleteUserById,promoteUserToAdmin,demoteUserFromAdmin} from '../Controllers/userController.js'
import { validateUserUpdate } from '../Middleware/validaters.js';
const router = express.Router();

router.use(auth);
router.get('/me',getMe);
router.put('/me',validateUserUpdate,updateMe);
router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.delete('/:id',deleteUserById);
router.put('/:id/promote',promoteUserToAdmin);
router.put('/:id/demote',demoteUserFromAdmin);


export default router;