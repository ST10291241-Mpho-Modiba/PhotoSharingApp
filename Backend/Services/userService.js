import User from '../Models/User.js';
import jwt from 'jsonwebtoken';


const generateToken = (newUser) => {
    return jwt.sign({id: newUser._id, role: newUser._role},process.env.JWT_SECRET,{expiresIn: '7d'});
}
export const signupUser = async({username,email,password})=>{
//Check if this person exists
const existingUser = await User.findOne({$or: [{email},{username}]});
if(existingUser){
    throw new Error('Username or email already in use');
}
//If they dont exist create a new User
const newUser = new User({username,email,password});
await newUser.save();
const token = generateToken(newUser);
return {newUser:{id: newUser._id, username: newUser.username, email: newUser.Email, role: newUser.role},token};

};

export const loginUser = async({email})=>{
const user = await User.findOne({email});
if(!user){
    throw new Error("Invaild email or password");
}
const isMatch = await user.comparePassword(password);
if(!isMatch){
    throw new Error("Invaild email or password");
}
const token = generateToken(newUser);
return {newUser:{id: newUser._id, username: newUser.username, email: newUser.Email, role: newUser.role},token};

};

export default {signupUser,loginUser};