import { buffer } from 'stream/consumers'
import Photo from '../Models/Photo.js'
import User from '../Models/User.js'
import cloudinary from '../utils/cloudinary.js'
import stream from 'stream'
import { error } from 'console'
import { title } from 'process'

export const streamUpload = (butter)=>{
    return new Promise((resolve,reject) =>{
const butterStream = new stream.PassThrough();
bufferStream.end(buffer);

const uploadStream = cloudinary.uploader.upload_stream(
    {resource_type:'image',folder:'securephoto'},
    (error,result)=>{
    if(result){
        resolve(result);
    }else{
        reject(error);
    }
}
);
butterStream.pipe(uploadStream);
    });
};

export const createPhoto = async(req, res) =>{
    try{
        const{title,description} = req.body;
        if(!title ||!req.file){
            return res.status(400).json({error: 'Title and image file are required'});
        }
        //Upload to Cloudinary
        const result = await streamUpload(req.file.buffer);

        //Save photo to DB 
        const photo = new Photo({
            title,
            description,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            owner: req.user.id,
        });
        await photo.save();
        res.status(201).json({photo})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}