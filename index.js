import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import studentRouter from "./routers/StudentRouter.js"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import authenticate from "./middlewares/authentication.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const mongodbURI = process.env.mongodbURI

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("Mongodb Connected Successfuly")
    }
)
// function success(){
//     console.log("Server Started Successfully")
// }

app.use(express.json())

app.use(authenticate)
app.use("/students",studentRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)


app.delete(
    "/"
    ,
    (req,res)=>{
        console.log(req)
        console.log("DELETE Request Received")

        res.json
    }
)

app.put(
    "/"
    ,
    (req,res)=>{
        console.log("PUT Request Received")

        res.json()
    }
)


app.listen(3000 , ()=>{                        //arrow function or anonymous function
    console.log("server started successfully")
})
