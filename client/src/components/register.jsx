import React, { useState } from 'react'



function Register() {
  
 const[username, setusername] =useState(''); 
 const[password, setpassword] = useState(''); 

 
 async function submit(ev){
  ev.preventDefault(); 
  const response = await fetch('http://localhost:4000/register',{
    method: 'POST', 
    body: JSON.stringify({username,password}),
    headers: {'Content-Type': 'application/json'},
  })
  console.log(response); 

  if(response.status === 200){
    
         alert("Registration sucessfull");  
         
    
  } 
  else{
     alert("Something went wrong try again ")
  }
  

 }
 
  return (
    <form className='mx-auto' style={{maxWidth: '400px'}}onSubmit={submit}>
    <h1 className='text-center'>Register</h1> 
    <input type='text' className='form-control mb-2' style ={{width:"100%"}} placeholder='Enter Username' value={username} onChange={(e)=> setusername(e.target.value)}/>  
    <input type='password' placeholder='Enter password' className='form-control mb-2' style ={{width:"100%"}} value={password} onChange={(e)=>setpassword(e.target.value)}/> 
    <button className='btn btn-primary btn-block' type='submit' style={{width:"100%" , backgroundColor: "#555"}}>Register</button>
</form>
  )
}

export default Register