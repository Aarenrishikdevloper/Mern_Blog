import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../Context/usercontext';
import { Link, useParams } from 'react-router-dom'; 
import { formatISO9075 } from 'date-fns/esm';



export default function Postpage() {
  const[postinfo, setpostinfo] = useState(null); 
  const{userinfo} = useContext(Usercontext); 
  const{id} = useParams(); 
  useEffect(()=>{
      fetch(`http://localhost:4000/post/${id}`).then(response=>{
        response.json().then(info=>{
          setpostinfo(info)
        })
      })
  },[])
  if(!postinfo){
     return <p style={{textAlign:'center',marginTop:'20px'}}>Loading</p>
  }
  return (
    <div className='postpage'>
       <h1 className='text-center mt-4 mb-2'>{postinfo.title}</h1>     
       <time className='text-center d-block small text-muted my-2"'>{formatISO9075(new Date(postinfo.createdAt))}</time>  
       <div className='text-center mb-4'>
       <div className='font-weight-bold small'>by @{postinfo.author.username}</div>
       {userinfo.id === postinfo.author._id &&(
         <div className='text-center mb-3'style={{marginTop:'10px'}}>
            <Link to={`/edit/${postinfo._id}`} className='btn btn-dark' style={{padding:'15px 30px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"style={{height:'20px'}}>
                 <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>

               <span className='d-inline-flex align-items-center mr-2'>
               Edit this post
               </span>
            </Link>
         </div>
       )}
       </div> 
       <div className='d-flex overflow-hidden'style={{height:'auto'}}>
       
         <img src = {`http://localhost:4000/${postinfo.cover}`} alt='/' className='w-100' style={{objectFit:'cover', objectPosition:'center center'}} />
       </div>
       <div dangerouslySetInnerHTML={{__html:postinfo.content}} className='content' style={{lineHeight:'1.7rem', margin:'30px 0'}}/>
    </div>
  )
}
