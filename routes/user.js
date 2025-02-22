import express from 'express'
import {userLogin,userRegister,useLogout,getMyProfile,getUserById} from '../controllers/user.js'
import { isAuthneticated } from '../middleware/auth.js';


const router = express.Router();

// router.get('/',(req,res)=>{
//     res.json({
//         success:true,
//         message:'we are in home route'
//     })
// })

router.post('/register',userRegister)

router.post('/login',userLogin)

router.get('/logout',useLogout)
router.get('/myprofile',isAuthneticated,getMyProfile)

router.get('/:id',getUserById);

export default router