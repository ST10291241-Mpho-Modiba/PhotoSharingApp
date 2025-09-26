import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  match:[/^[a-zA-Z0-9_]+$/,'Username can only contain letters, numbers, and underscores.'],
},
email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    //This is how an email restrition is put in a webiste Mongo will validate the email to make sure it's a valid email
    match:[/.+@.+\..+/,'Please fill in a vaild email.']
},
password: {
    type: String,
    required: true,
    minlength: 6,
},
role:{
    type: String,
    enum:['admin','user'],
    default: 'user',
}

}, {timestamps: true})

// Hash the password before saving the password
userSchema.pre('save',async function(next) {
    //
    if(!this.isModified('password'))
        return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    next();
    }catch(err){
        next(err);
    }
    
});

//Comparing the password for login
userSchema.methods.comparePasswords = 
function(candidatePassword){
return bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model('User', userSchema);
export default User;