import React, { useEffect, useState } from 'react'
import './adminuser.scss';
import UserDatatable from '../../components/admin/UserDatatable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUsers } from '../../redux/features/adminSlice';

import { Link } from 'react-router-dom'
import './adminuser.css';



const AdminUser = () => {

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.admin)
  
  console.log(users,"xbdsjbvjdsssssssssssssssssssbjj")
  console.log('bjbjnjnkmjkmkmkmklmlkmlkm')

  useEffect(() => {
    dispatch(fetchAdminUsers())
  }, [dispatch])
  return (
    <div className='adminuser'>

<div className="addButtonContainer">
        <h4>
          User Management
          </h4>
      </div>

      <UserDatatable rows={users} />
    </div>
  )
}

export default AdminUser
