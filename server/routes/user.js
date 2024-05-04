import express from 'express';
import bcrypt from 'bcrypt'; 
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
const router = express.Router();
import nodemailer from 'nodemailer'

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body; // Corrected 'password' spelling

    try {
        // Check if user with provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        return res.json({ status: true,message: "User registered successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "An error occurred while registering user" });
    }
});
router.post('/login', async (req,res)=>{
    const {email, password}= req.body;
    const user= await User.findOne({email})
    if(!user){
        return res.json({message: "user is not registered"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message : "password is incorrect"})
    }
    const token= jwt.sign({username: user.username},process.env.KEY,{expiresIn: '1h'})
    res.cookie('token',token,{httpOnly: true,maxAge: 360000})
    return res.json({status: true , message:"login sucessfully"})

})
router.post('/forgot-password',async(req,res)=>{
    const {email}=req.body;
    try{
         const user=await User.findOne({email})
         if(!user){
            return res.json({message: "user not registered"})
         }
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset Password',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }catch(err){
        console.log(err)
    }
})
export { router as UserRouter };
