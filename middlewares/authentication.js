import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default function authenticate(req,res,next){

const header = req.header("Authorization")
        // console.log(header)

        if(header == null){
            next()
        }else{
            const token = header.replace("Bearer ", "")
            // console.log(token)

            jwt.verify(token , process.env.JWT_SECRET ,
                (err , decoded)=>{
                    // console.log(decoded)
                    if(err || decoded == null){
                        res.status(401).json({message : "Invalid Token please try again"})
                        return
                    }else{
                        req.user = decoded
                        next()
                    }
                    
                }
            )
        }
    }