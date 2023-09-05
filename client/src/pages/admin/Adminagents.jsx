import React, { useEffect, useState } from 'react'
import './adminuser.scss';

import { useDispatch, useSelector } from 'react-redux';

import AgentDatatable from '../../components/admin/AgentDatatable';
import { fetchAdminAgents } from '../../redux/features/adminSlice';
import './adminuser.css';




const Adminagents = () => {

  const dispatch = useDispatch()
  const { agents } = useSelector((state) => state.admin)
  console.log(agents)
  console.log('bjbjnjnkmjkmkmkmklmlkmlkm')

  useEffect(() => {
    dispatch(fetchAdminAgents())
  }, [dispatch])
  return (
    <div className='adminuser'>

      <div className="addButtonContainer">
        <h4>
          Agent Management
        </h4>
      </div>

      <AgentDatatable rows={agents} />
    </div>
  )
}

export default Adminagents
