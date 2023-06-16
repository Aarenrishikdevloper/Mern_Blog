import React, { useEffect, useState } from 'react'

import Post from '../components/post'


function Home() {
const [posts,setpost] =useState([]); 
useEffect(()=>{
    fetch('http://localhost:4000/post').then(response=>{
      response.json().then(posts=>{
        setpost(posts);
      })
    }).catch(err=>{
      alert("Something Went wrong please refresh")
    })

    
},[])
  return (
       <> 
        {posts.length >0 && posts.map(post=>{
          return <Post {...post}/>;
        })}
      </>
  )
}

export default Home