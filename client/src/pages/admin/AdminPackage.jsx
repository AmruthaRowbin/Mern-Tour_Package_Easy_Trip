import React, { useEffect} from 'react'
import './adminuser.scss';

import { useDispatch, useSelector } from 'react-redux';

import {  fetchAdminPackages } from '../../redux/features/adminSlice';
import PackageDatatable from '../../components/admin/PackageDatatable';
import './adminuser.css';



const AdminPackage = () => {

  const dispatch = useDispatch()
  const { tours } = useSelector((state) => state.admin)
  console.log(tours)
  console.log('bjbjnjnkmjkmkmkmklmlkmlkm')

  useEffect(() => {
    dispatch(fetchAdminPackages())
  }, [dispatch])
  return (
    <div className='adminuser'>

<div className="addButtonContainer">
        <h4>
          Package Management
          </h4>
      </div>

      <PackageDatatable rows={tours} />
    </div>
  )
}

export default AdminPackage
