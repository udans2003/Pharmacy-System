import user from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export async function createUser(req,res){
    try{
        const existingUser = await user.findOne({ email: req.body.email })

        if(existingUser != null){
            res.json({message : "User already exists"})
            return
        } 
        

        const passwordHash = bcrypt.hashSync(req.body.password,10)

        // console.log(passwordHash)
        //create user

        const newUser = new user({
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : passwordHash 
        })

        await newUser.save()

        res.json({message : "User created successfully"})

    }catch(err){
        res.json({message : err.message})
    }  
    
}   

export async function loginUser(req,res){
    try{

        const email = req.body.email
        const password = req.body.password

        if(email == null || password == null){
            res.status(400).json({message : "Email and password are required"})
            return
        }

        const User = await user.findOne({email : email})
        
        if(User == null){
            res.status(404).json({message : "User not Found"})
            return
        }

        const isPasswordValid = bcrypt.compareSync(password, User.password)

        if(isPasswordValid){

            const token = jwt.sign(
              {
                                email : User.email,
                                firstName : User.firstName,
                                lastName : User.lastName,
                                isAdmin : User.isAdmin,
                                isBlocked : User.isBlocked,
                                isemailverified : User.isemailverified,
                                image : User.image
            },
                process.env.JWT_SECRET,
            )
            res.json({message : "Login Successful" , token : token})
        }else{
            res.status(401).json({message : "Invalid Password"})
        }
    }catch(err){
        res.json({message : err.message})
    }
}

