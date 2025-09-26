import express from 'express';
import auth from '../Middleware/auth.js'
import { validatePhotoUpdate } from '../Middleware/validaters.js';
import requireAdmin from '../Middleware/roleBaseAccessControl.js';
import upload from '../Middleware/upload.js';
import{createPhoto
    ,streamUpload,getAllPhotos,getPhotoById,getPhotos,updatePhoto,deletePhoto} from '../Controllers/photoController.js'
const router = express.Router();

router.use(auth);

router.post('/',upload.single('image'),createPhoto);
router.get('/',getPhotos);
router.get('/all',requireAdmin,getAllPhotos);
router.get('/:id',getPhotoById);
router.put('/:id',upload.single('image'),validatePhotoUpdate,updatePhoto);
router.delete('/:id',deletePhoto);

//Multer error handler
router.use((err,req,res,next)=>{
if(err&&err.name =='MulterError'){
    if(err.code=='LIMIT_FILE_SIZE'){
        return res.status(400).json({error:'File is to long Max size 5MB'});
    }
    return res.status(400).json({error: err.message});
}
if(err){
    return res.status(400).json({error: err.message});
}
next();
});



export default router;