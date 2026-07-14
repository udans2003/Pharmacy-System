import jwt from "jsonwebtoken"
export default function authenticate(req,res,next){

const header = req.header("Authorization")
        // console.log(header)

        if(header == null){
            next()
        }else{
            const token = header.replace("Bearer ", "")
            // console.log(token)

            jwt.verify(token , "secretkey9911111",
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