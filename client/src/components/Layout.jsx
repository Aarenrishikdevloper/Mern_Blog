import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <main className="container" style={{ padding: '10px', maxWidth: '960px', margin: '0 auto' }}>
        <Header/> 
        <Outlet/>
    </main>    
  )
}

export default Layout