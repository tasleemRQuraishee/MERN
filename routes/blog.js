import express from 'express';
import { isAuthneticated } from '../middleware/auth.js';
import {createBlog,myBlog,updateBlog,deleteBlog} from '../controllers/blog.js'
const router = express.Router();

 router.post('/new',isAuthneticated,createBlog);


router.get('/myblogs',isAuthneticated,myBlog);


router.put('/:id',isAuthneticated,updateBlog);


router.delete('/:id',isAuthneticated,deleteBlog);





export default router