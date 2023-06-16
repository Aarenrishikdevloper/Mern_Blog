const mongoose = require('mongoose') 
const{Schema, model} = mongoose;
const Postscheme = new Schema({
    title:String, 
    summary: String,  
    content:String,
    cover:String, 
    author:{
       type: Schema.Types.ObjectId, 
       ref:'User'
        
    }
},{
 timestamps:true
       
}) 

const postmodel = model('Post', Postscheme); 
module.exports = postmodel