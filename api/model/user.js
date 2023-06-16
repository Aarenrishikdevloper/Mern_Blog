const moongoose = require('mongoose') 
const{Schema, model} = moongoose; 

const Userscheme = new Schema({
    username:{type:String, required: true, min:4, unique:true}, 
    password: {type: String,required:true} 

    
})

const usermodel = model('User', Userscheme); 

module.exports =usermodel;