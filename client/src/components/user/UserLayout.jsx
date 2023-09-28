import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'
import './userlayout.scss';
import Footer from './Footer/Footer';





const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      

      {/* <Home/> */}
   
    
  
      <Outlet />
      
   

    </div>
  )
}

export default UserLayout
