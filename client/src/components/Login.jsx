import React, { useState } from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import  {Usercontext} from '../Context/usercontext';

function Login() {
  const[username, setusername] =useState(''); 
  const[password, setpassword] = useState('');  
  const[redirect,setredirect] = useState(false); 
  const{setuserinfo} = useContext(Usercontext)

  async function login(e){
     e.preventDefault(); 
     const response = await fetch('http://localhost:4000/login',{
      method: 'POST', 
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'}, 
      credentials: 'include'
    })
    if(response.ok){
      response.json().then(userinfo=>{
        setuserinfo(userinfo) 
        setredirect(true)
      })
    }
    else{
      alert('Wrong Credential')
    }
    
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  
  return (
    <form className='mx-auto' style={{maxWidth: '400px'}} onSubmit={login}>
        <h1 className='text-center'>Login</h1> 
        <input type='text' className='form-control mb-2' style ={{width:"100%"}} placeholder='Enter Username' value={username} onChange={(e)=>setusername(e.target.value)}/>  
        <input type='password' placeholder='Enter password' className='form-control mb-2' style ={{width:"100%"}} value={password} onChange={(e)=>setpassword(e.target.value)}/> 
        <button className='btn btn-primary btn-block'  type='submit' style={{width:"100%" , backgroundColor: "#555"}}>Login</button>
    </form>
  )
}

export default Login