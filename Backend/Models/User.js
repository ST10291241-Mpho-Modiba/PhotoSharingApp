import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
useName: {
    type: String,
    required: true,
    unique: true,
    trim: true
},
Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    //This is how an email restrition is put in a webiste Mongo will validate the email to make sure it's a valid email
    match:[/.+@+\..+/,'Please fill in a vaild email']
},
Password: {
    type: String,
    required: true,
    minlength: 12,
},
role:{
    type: String,
    enum:['admin','user'],
    default: 'user',
}
})

// Hash the password before saving the password
userSchema.pre('save',async function(next) {
    //
    if(!this.isModified('Password'))
        return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password,salt);
    }catch(err){
        next(err);
    }
    
})

//Comparing the password for login
userSchema.methods.comparePasswords = 
function(candidatePassword){
return bcrypt.compare(candidatePassword,this.Password);
}

const User = mongoose.model('User', userSchema)
export default  User;