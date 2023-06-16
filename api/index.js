const express = require('express');  
const app = express() 
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const mongoose  = require("mongoose")
const User = require('./model/user')
const Post = require('./model/post');
const cors = require('cors') 
const bcrypt = require('bcryptjs');    
const secret = 'ty7654rhuhcjbkl'
var salt = bcrypt.genSaltSync(10);
const multer  = require('multer')
app.use(express.json())
app.use(cors({credentials:true,origin:'http://localhost:3000'})); 
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb+srv://Blog:AR9PnVaDF5uDD5Mm@cluster0.ozicgxe.mongodb.net/?retryWrites=true&w=majority')
app.use('/uploads', express.static(__dirname + '/uploads'))
const upploadmiddleware = multer({dest: 'uploads/'})
const fs = require('fs')  

 

app.post("/register", async(req, res)=>{
    const{username,password} = req.body;  
    try{
       const userdoc = await User.create({
          username,  
          password:bcrypt.hashSync(password, salt),

       })
       res.json({requuestData:{username,password}});   
    }
    catch(e){
      console.log(e); 
      res.status(400).json(e);
    }
    
    
    
    
}) 
app.post("/login",async(req,res)=>{
   const{username, password} = req.body; 
   const userdoc = await User.findOne({username}) 
   const passok= bcrypt.compareSync(password, userdoc.password);  
   if(passok){
      jwt.sign({username, id:userdoc._id},secret,{},(err,token)=>{
        if(err) throw err 
        res.cookie('token',token).json({
          id:userdoc._id, 
          username,
        });
      });

   }
   else{
      res.status(400).json('Wrong credential');
   }

})
app.get('/profile',(req,res)=>{
    const{token} = req.cookies; 
    jwt.verify(token,secret,{},(err,info)=>{
       if(err) throw err 
       res.json(info);
    })

    
})
app.post('/logout',(req, res)=>{
   res.clearCookie('token').json('Logged out Sucessfully');
})
app.post('/create',upploadmiddleware.single('file'), async(req,res)=>{
 
  
   const{originalname,path} = req.file; 
   const parts =  originalname.split('.'); 
   const ext = parts[parts.length - 1] 
   const newpath = path+'.'+ext  
   fs.renameSync(path, newpath)        
   const{token} = req.cookies; 
   jwt.verify(token, secret, {},async(err,info)=>{
      if(err) throw err; 
      const{title,summary, content} = req.body;  
      const author  = await User.findOne({ username: info.username })
      const postdoc = await Post.create({
         title,
         summary,  
         content, 
         cover: newpath, 
         author: author._id
      }); 
      res.json(postdoc);

   })

  
  
})
app.get('/post',async(req,res)=>{
   res.json(
      await Post.find().populate('author', ['username']).sort({creeatedAt: - 1})
   )
})

app.get('/post/:id', async(req,res)=>{
   const{id} = req.params; 
   const postdoc = await Post.findById(id).populate('author',['username']); 
   res.json(postdoc);
})
app.put('/update', upploadmiddleware.single('file'), async(req,res)=>{
    let newpath = null; 
    if(req.file){
        
      const{originalname,path} = req.file; 
      const parts =  originalname.split('.'); 
      const ext = parts[parts.length - 1] 
      newpath = path+'.'+ext  
      fs.renameSync(path, newpath) 
    }  
    const{token} = req.cookies;
    jwt.verify(token, secret, {},async(err,info)=>{
      if(err) throw err; 
      const{title,summary, content,id} = req.body;  
      const postdoc = await Post.findById(id)
      const isauthor = JSON.stringify(postdoc.author._id)  === JSON.stringify(info.id);  
      if(!isauthor){
         return res.status(400).json("You are not the author");
      }
      
      const postDoc = await Post.updateOne(
         { _id: id },{
         title,
         summary,  
         content, 
         cover: newpath?newpath:postdoc.cover, 
         
      }); 
      res.json(postdoc);

   })
    
})

app.listen(4000);
