import React, { useState } from 'react' 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom'
function Createpost(){
   const[title,settitle] = useState('');  
   const[summary,setsummary] = useState('');   
   const[content,setcontent] = useState('');  
   const[files,setfiles] = useState(''); 
   const[redirect,setredirect] = useState(false);
   async function create(e){
      e.preventDefault();  
      const data = new  FormData(); 
      data.set('title', title);
      data.set('content',content);
      data.set('summary', summary); 
      data.set('file', files[0]); 
      const response = await fetch("http://localhost:4000/create",{
         method: 'POST', 
         body: data, 
         credentials: 'include'
      }); 
      if(response.ok){
         setredirect(true)
      }
     

   } 
   if(redirect){
      return <Navigate to ={'/'}/>
   }

 
  return (
     <form onSubmit={create}>
        <input type='title' className='form-control mb-2' style ={{width:"100%"}} placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)} required={true}/>   
        <input type='summary' placeholder='Summary' className='form-control mb-2' style ={{width:"100%"}} value={summary} onChange={(e)=>setsummary(e.target.value)}required={true}/>   

        <input type='file' placeholder='Summary' className='form-control mb-2' style ={{width:"100%"}}  onChange={(e)=>setfiles(e.target.files)} required={true}/>   
        <ReactQuill style={{marginBottom:'10px'}} theme="snow" value={content} onChange={setcontent} required={true}/>
        <button className='btn btn-primary btn-block' type='submit' style={{width:"100%" , backgroundColor: "#555"}}>Create Post</button>
     </form>
  )
}

export default Createpost