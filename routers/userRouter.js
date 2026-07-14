import express from 'express';
import user from "../models/user.js"
import { createUser,loginUser } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)

export default userRouter
