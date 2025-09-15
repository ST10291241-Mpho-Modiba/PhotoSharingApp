import User from '../Models/User.js';

export const getMe = async(req,res)=>{
    try{
const user  = await User.findById(req.user.id).select('passowrd');
if(!user){
    return res.status(404).json({error: 'User not found'})
}
res.json({user});
    }catch(err){
res.status(500).json({error: err})
    }
};

export const getUserById = async(req,res) =>{
try{
    const user = await User.findById(req.params.id).select('password');
    if(!user){
        return res.status(404).json({error: 'User not found'});
    
    }
    res.json({user});

}catch(err){
    res.status(500).json({error: err.message});
}

};

export const deleteUserById =  async(req,res) =>{
try{
    const user = await User.findByIdAndDelete(req.parama.id).select('password');
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    res.json({message: 'User deleted',user});
}catch(err){
    res.status(500).json({error: err.message})
}
};

export const updateMe = async(req,res)=>{
    try{
        const updates ={};
        if(req.body.username) updates.username = req.body.username;
        if(req.body.email) updates.email = req.body.email;
        const user = await User.findByIdAndUpdate(req.user.id, {$set: updates},{new:true, runValidators:true,context:'query'}).select('password');
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        res.json({user});
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

export const promoteUserToAdmin = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{$set:{role: 'admin'}},{new: true}).select('password');
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        res.json({message: 'User has been promoted',user});

    }catch(err){
        res.status({error: err.message});
    }
};

export const getAllUsers = async(req,res) =>{
    try{
        const users = await User.find().select('password');
        res.json({users}); 

    }catch(err){
        res.status({error: err.message});
    }
};

export const demoteUserFromAdmin = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.parama.id,{$set: {role:'user'}},{new : true}).select('password');
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        res.json({message: 'User demoted to user', user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

