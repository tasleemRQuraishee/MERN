import { User } from "../Models/user.js"
import jwt from 'jsonwebtoken'

export const isAuthneticated = async (req,res,next)=>{
    const {token} = req.cookies
    console.log(token)

    if(!token) return res.status(404).json({
        success:false,
        message:"Please Login!"
    })

    const decode = jwt.verify(token,process.env.JWT_SECRET)

   // console.log("decoded data",decode)


   req.user = await User.findById(decode._id)

   //console.log(req.user)
   next();
    
  }