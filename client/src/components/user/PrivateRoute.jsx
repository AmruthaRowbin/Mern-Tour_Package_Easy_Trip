import React from 'react'
import {  useSelector } from 'react-redux'
import LoadingToredirect from './LoadingToredirect'

const PrivateRoute = ({children}) => {
    const {agent}=useSelector((state)=>({...state.auth}))
  return agent ? children :<LoadingToredirect/>
    
  
}

export default PrivateRoute
