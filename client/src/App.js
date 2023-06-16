import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./pages/Home";
import React from 'react'
import {Routes, Route} from "react-router-dom";
import Register from "./components/register";
import { Usercontextprovider } from "./Context/usercontext";
import Createpost from "./pages/createpost"; 
import Postpage from "./pages/postpage";
import Editpost from "./pages/Editpost";

function App() {
  
  return(
    <Usercontextprovider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route  index element={<Home/>}/> 
        <Route path = "/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<Createpost/>} /> 
        <Route path="/post/:id" element={<Postpage/>}/> 
        <Route path="/edit/:id"  element={<Editpost/>}/>

      </Route> 
        
     
      
    </Routes>
    </Usercontextprovider>
  )
}

export default App