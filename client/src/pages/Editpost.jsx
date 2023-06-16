
import React,{useEffect,useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

function Editpost() {
  const {id} = useParams()
   const[title,settitle] = useState('');  
   const[summary,setsummary] = useState('');   
   const[content,setcontent] = useState('');  
   const[files,setfiles] = useState(''); 
   const[redirect,setredirect] = useState(false);  
   useEffect(()=>{
         fetch('http://localhost:4000/post/'+id).then(
            response=>{ 
                response.json().then(postinfo=>{
                    settitle(postinfo.title); 
                    setsummary(postinfo.summary); 
                    setcontent(postinfo.content);
                })
            }).catch(err=>console.log(err));
   },[id])
   async function updatepost(e){
     e.preventDefault(); 
     const data = new FormData(); 
     data.set('id',id)
     data.set('title', title);
      data.set('content',content);
      data.set('summary', summary);  
      if(files?.[0]){
        data.set('file', files?.[0]) 
      }
      const response = await fetch("http://localhost:4000/update",{
        method: 'PUT', 
        body: data, 
        credentials: 'include'
     }); 
     if(response.ok){
        setredirect(true);
     }
   }
   if(redirect){
     return <Navigate to={'/post/'+id}/>
   }
  return (
    <form onSubmit={updatepost}>
        <input type='title' className='form-control mb-2' style ={{width:"100%"}} placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)} />   
        <input type='summary' placeholder='Summary' className='form-control mb-2' style ={{width:"100%"}} value={summary} onChange={(e)=>setsummary(e.target.value)}/>   

        <input type='file' placeholder='Summary' className='form-control mb-2' style ={{width:"100%"}}  onChange={(e)=>setfiles(e.target.files)} />   
        <ReactQuill style={{marginBottom:'10px'}} theme="snow" value={content} onChange={setcontent} />
        <button className='btn btn-primary btn-block' type='submit' style={{width:"100%" , backgroundColor: "#555"}}>Edit Post</button>
     </form>
  )
}

export default Editpost