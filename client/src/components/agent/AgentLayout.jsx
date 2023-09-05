import React from 'react'
import AgentHeader from './AgentHeader'
import { Outlet } from 'react-router-dom'
import AgentHome from '../../pages/agent/AgentHome'
import AddTour from '../../pages/agent/AddTour'

const AgentLayout = () => {
  return (
    <div>
      <AgentHeader/>
      {/* <AgentHome/>
      <AddTour/> */}
      <Outlet/>
    </div>
  )
}

export default AgentLayout
