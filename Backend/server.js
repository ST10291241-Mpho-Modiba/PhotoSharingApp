import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'
import { Console } from 'console';
import mongoose from 'mongoose';
import routes from './Routes/index.js'
// We are loading the enviroments variables from .env
dotenv.config();

//Initialise express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI

// Adding middleware to parse JSON Bodies; Middleware using software that you did not create yourself
app.use(express.json())

//routes 
app.use('/api',routes);

//Add basic route

//use MkCert generated certificates for HTTPS
const Options ={
    key: fs.readFileSync('./Certs/localhost-key.pem'),
    cert: fs.readFileSync('./Certs/localhost.pem')
}


//Adding MongoDB Connection
mongoose.connect(MONGODB_URI,{

}).then(()=>console.log(`MongoDB connected successfully`))
.catch(err =>console.error(`MongoDB connection error`,err));


//Start the Http server
//app.listen(PORT,() => {
//console.log(`Server is running on Port ${PORT}`)
//});

// starting HTTPS server
https.createServer(Options,app).listen(PORT,()=>{
console.log(`Https Server running on port ${PORT}`)

})
