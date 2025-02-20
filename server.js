// import express from 'express'
// import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// const app = express()

// app.use(express.json())

// mongoose.connect("mongodb://localhost:27017",{
//     dbName:"A"
// }).then(()=>{
//     console.log("Mongoose is connected")
// })


// app.get('/',(req,res)=>{
//     res.json({
//         success:true,
//         message:'we are in home route'
//     })
// })


// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     email:{
//         type:String,
//         unique:true,
//         require:true
//     },
//     password:{
//         type:String,
//         require:true
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now
//     }

// })

// const User = mongoose.model("User", userSchema)

// // app.post('/api/users/register',async (req,res)=>{
// //     const { name,email,password}= req.body

// //     // const name = req.body.name
// //     // const email = req.body.name
// //     // const password = req.body.password

// //     const user = await User.create({
// //         name,email,password
// //     })
// //     res.json({
// //         success:true,
// //         message:'User register successfully!',

// //         user
// //     })

// // })


// app.post('/api/users/register',async (req,res)=>{
//     const {name,email,password} = req.body

//     let user = await User.findOne({email});

//     if(user) return res.status(404).json({
//         success:false,
//         message:"User Already exist.."
//     })

//     const hashPassword = await bcrypt.hash(password,10)

//     user = await User.create({
//         name,
//         email,
//         password:hashPassword
//     })

//     const token = jwt.sign({_id:user._id},'!@#$%^')

//     console.log(token)

//     // res.status(201).json({
//     //     success:true,
//     //     message:"User Register Successfully"
//     // })

//     res.status(201).cookie("token",token,{
//         httpOnly:true,
//         maxAge:10*60*1000
//     }).json({
//         success:true,
//         message:"User Register Successfully",
        
//     })
// })

// app.post('/api/users/login',async (req,res)=>{
//     const {email,password} = req.body

//     let user = await User.findOne({email});

//     if(!user) return res.status(400).json({
//         success:false,
//         message: "User not exits"
//     })

//     const isMatch = await bcrypt.compare(password,user.password)

//     if(!isMatch) return res.status(400).json({
//         success:false,
//         message: "Invalid credential"
//     })

    

//     const token = jwt.sign({_id:user._id},'!@#$%^')

//     console.log(token)

//     // res.status(201).json({
//     //     success:true,
//     //     message:"User Register Successfully"
//     // })

//     res.status(201).cookie("token",token,{
//         httpOnly:true,
//         maxAge:10*60*1000
//     }).json({
//         success:true,
//         message:`Welcome ${user.name}`,
        
//     })
// })

// const port = 5000;
// app.listen(port,()=>{
//     console.log(`this server in running on ${port} `)
// })



import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.js'
import blogRouter from './routes/blog.js'
import {config} from 'dotenv'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())

config({
    path:'./data/config.env'
})
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MONGO_URL,{
    dbName:"A"
}).then(()=>{
    console.log("Mongoose is connected")
})

// mongoose.connect("mongodb://localhost:27017/",{
//     dbName:"A"
// }).then(()=>{
//     console.log("Mongoose is connected")
// })






//user router
app.use('/api/users', userRouter)

// app.post('/api/users/register',async (req,res)=>{
//     const { name,email,password}= req.body

//     // const name = req.body.name
//     // const email = req.body.name
//     // const password = req.body.password

//     const user = await User.create({
//         name,email,password
//     })
//     res.json({
//         success:true,
//         message:'User register successfully!',

//         user
//     })

// })

//blog router

app.use('/api/blog',blogRouter)




//const port = 5000;
app.listen(process.env.PORT,()=>{
    console.log(`this server in running on ${process.env.PORT} `)
})