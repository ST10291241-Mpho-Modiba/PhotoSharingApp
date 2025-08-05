import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'
import { Console } from 'console';

// We are loading the enviroments variables from .env
dotenv.config();

//Initialise express app
const app = express();
const PORT = process.env.PORT || 5000;

// Adding middleware to parse JSON Bodies; Middleware using software that you did not create yourself
app.use(express.json())

//Add basic route
app.get('/',(req,res) =>{

    res.send('Welcome to the PhotoShare API');
})

//use MkCert generated certificates for HTTPS
const Options ={
    key: fs.readFileSync('./Certs/localhost-key.pem'),
    cert: fs.readFileSync('./Certs/localhost.pem')
}

//Start the Http server
app.listen(PORT,() => {
console.log(`Server is running on Port ${PORT}`)
});

// starting HTTPS server
https.createServer(Options,app).listen(PORT,()=>{
Console.log(`Https Server running on port ${PORT}`)

})
