import React, { useEffect, useState } from 'react'
import './adminCategoryStyles.css';
import './adminuser.scss';

import { useDispatch, useSelector } from 'react-redux';


import { adminCategoryList, fetchAdminAgents } from '../../redux/features/adminSlice';
import CategoryDatatable from '../../components/admin/CategoryDatatable';
import { Link } from 'react-router-dom'



const AdminCategory = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.admin)
  console.log(categories)
  console.log('bjbjnjnkmjkmkmkmklmlkmlkm')

  useEffect(() => {
    dispatch(adminCategoryList())
  }, [dispatch])
  return (
    <div className='adminuser'>


      <div className="addButtonContainer">
        <Link className="addButton" to={"/adminpanel/category/new"}>
          Add New Category
        </Link>
      </div>
      <CategoryDatatable rows={categories} />
    </div>
  )
}

export default AdminCategory
