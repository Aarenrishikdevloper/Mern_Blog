import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import  {Usercontext} from '../Context/usercontext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const{userinfo, setuserinfo} =useContext(Usercontext); 
  const[loading,isloading] = useState(true);
   useEffect(()=>{
     fetch('http://localhost:4000/profile',{
       credentials:'include'
     }).then(response=>{
      if(response.ok){
        return response.json()
      } else{
        throw new Error("Something wendt wrong")
      } 

        
       }).then((userinfo)=>{
         setuserinfo(userinfo);
       }).catch((error)=>{
         console.log(error); 
         setuserinfo(null);
       })
       .finally(()=>{
         isloading(false);
       })
     
   },[]);
   function logout(){
     fetch('http://localhost:4000/logout',{
      method: 'POST', 
      credentials: 'include',
     })
     setuserinfo(null)
   }
   const username = userinfo?.username;
   if(isloading){
     console.log(loading);
   }
  return (
    <header className="d-flex justify-content-between my-4">
        <a  className="text-decoration-none text-dark"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }} href='/'>Tech Blog</a>
        <nav className="d-flex gap-3">
        {username&&(
          <>
          <Link to='/create'className="text-decoration-none text-dark">
              New Post
          </Link>
          
          <a onClick={logout} className="text-decoration-none text-dark " style={{cursor:"pointer"}}>
              Logout 
          </a>
          
         </>
        )}
          {!username &&(
              <>
              <Link to ='/login'className="text-decoration-none text-dark">
                 Login
              </Link>
              
              <Link to='/register' className="text-decoration-none text-dark">
                 Register
              </Link>
              
             </>
          )}
        </nav>
    </header>
  )
}