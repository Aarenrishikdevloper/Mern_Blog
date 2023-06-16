import React from 'react'
import 'bootstrap/dist/css/bootstrap.css' 
import {formatISO9075} from 'date-fns'; 
import { Link } from 'react-router-dom'
function Post({title,summary, cover,content, createdAt, author,_id}) {
   console.log(author);
  
  return (
    
   <div className='row row-cols-1 row-cols-md-2 g-3 post"' style={{marginBottom:'30px'}}>
     <div className='d-flex'style={{maxHeight:'300px', overflow: "hidden"}}>
     <Link to = {`/post/${_id}`}>
         <img src={'http://localhost:4000/'+cover} alt='/' style={{objectFit:'cover', width: '100%', height:'100%'}}/>
      </Link> 
      
     </div>  
     <div>
         <Link to = {`/post/${_id}`} className='text-decoration-none text-inherit text-dark'>
         <h1 className="m-0" style={{fontSize: "1.5rem"}}>{title}</h1> 
         </Link>
         <p className='d-flex' style={{margin: "24px 0", color:"#888", fontSize: "1rem", fontWeight: 'bold', gap: "10px"}}>
            <a className='text-decoration-none text-inherit text-dark'>{author.username}</a> 
            <time>{formatISO9075(new Date(createdAt))}</time>
         </p> 
         <p className='summary' style={{margin: "10px 0", lineHeight:"1.8rem", maxHeight:'7.2rem', overflow:'hidden',textOverflow:'ellipsis' ,display: '-webkit-box',  WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,}}>{summary}</p>
     </div>

   </div>
    
  )
}

export default Post