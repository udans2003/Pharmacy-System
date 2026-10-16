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

const mongodbURI = process.env.MONGODB_URI || process.env.mongodbURI || "mongodb://127.0.0.1:27017/i-computers"

async function startServer() {
    try {
        await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 })
        console.log("Mongodb Connected Successfuly")
    } catch (error) {
        console.error(`MongoDB connection failed for ${mongodbURI}`)
        console.error(error.message)
    }

    app.listen(3000 , ()=>{                        //arrow function or anonymous function
        console.log("server started successfully")
    })
}
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

startServer()
