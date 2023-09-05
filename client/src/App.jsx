
import './App.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AgentHome from './pages/agent/AgentHome'
import AgentLogin from './pages/agent/AgentLogin'
import AgentRegister from './pages/agent/AgentRegister'
import AgentHeader from './components/agent/AgentHeader'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAgent } from './redux/features/authSlice'
import AddTour from './pages/agent/AddTour'
import UserHome from './pages/user/UserHome'
import AgentLayout from './components/agent/AgentLayout'
import UserLayout from './components/user/UserLayout'
import UserRegister from './pages/user/UserRegister'
import UserLogin from './pages/user/UserLogin'
import { setUser } from './redux/features/userrSlice'



import AdminLogin from './pages/admin/AdminLogin'
import { setAdmin } from './redux/features/adminSlice'
import AdminHome from './pages/admin/AdminHome'
import AdminLayout from './components/admin/AdminLayout'
import AdminUser from './pages/admin/AdminUser'
import Adminagents from './pages/admin/Adminagents'
import SingleTour from './pages/user/SingleTour'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/user/privateRoute'
import NotFound from './pages/agent/NotFound'
import Usersearch from './pages/user/Usersearchpage'
import Home from './components/user/Home/Home'
import UserHeader from './components/user/UserHeader'
import AdminPackage from './pages/admin/AdminPackage'


import AdminCategory from './pages/admin/AdminCatogory'
import AddCategory from './pages/admin/AddCategory'
import AgentSingleTour from './pages/agent/AgentSingleTour'
import UserDatatable from './components/admin/UserDatatable'
import AgentDatatable from './components/admin/AgentDatatable'
import PackageDatatable from './components/admin/PackageDatatable'
import CategoryDatatable from './components/admin/CategoryDatatable'
import Payment from './pages/user/Payment'
import Success from './pages/user/Success'
import BookingList from './pages/user/BookingList'
import Usercategory from './pages/user/Usercategory'
import BookingDatatable from './components/admin/BookingDtatatable'
import Updateprofile from './components/user/Updateprofile'



function App() {

  const dispatch = useDispatch()
  const agent = JSON.parse(localStorage.getItem("profile"))
  const user = JSON.parse(localStorage.getItem("userprofile"))
  const admin = JSON.parse(localStorage.getItem("adminprofile"))


  useEffect(() => {
    dispatch(setAgent(agent))
  }, [])

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  useEffect(() => {
    dispatch(setAdmin(admin))
  }, [])
  return (
    <BrowserRouter>
      <div className='App'>
        {/* <AgentHeader/> */}
        <ToastContainer />
        <Routes>

          <Route path='/agent' element={<AgentLayout />}>
          <Route index element={<AgentHome/>}/>
            <Route path='/agent/Home' element={<AgentHome />} />
            

            <Route path='/agent/login' element={<AgentLogin />} />
            <Route path='/agent/register' element={<AgentRegister />} />
            <Route 
            path='/agent/addTour'
             element={
               <PrivateRoute>
                <AddTour />
                </PrivateRoute>
              } 
              />
            <Route
             path='/agent/editTour/:id'
              element={
              <PrivateRoute>
                <AddTour />
                </PrivateRoute>
              } 
              />
            <Route 
            path='/agent/dashboard'
             element={
             <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>
            }
            />
              <Route path='/agent/tour/:id' element={<AgentSingleTour/>}/>
          <Route path="*" element={<NotFound/>}/>

          </Route>


      
 


         
          <Route path='/login' element={<UserLogin />} />
         
          <Route path='/' element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/tour/:id' element={<SingleTour/>}/>
          
      
          <Route path='/tours/search' element={<Usersearch/>}/>
            <Route path='/userHome' element={<UserHome />} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/payment/:id'element={<Payment/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/bookings' element={<BookingList/>}/>

            <Route path='/tours/searchcategory' element={<Usercategory/>}/>
            <Route path='/profile' element={<Updateprofile/>}/>
   

      
            
          




          </Route>

          <Route path='/admin' element={<AdminLogin />} />



          <Route path='/adminpanel' element={<AdminLayout />}>
            <Route path='/adminpanel/users' element={<UserDatatable/>}/>
            <Route path='/adminpanel/agent' element={<AgentDatatable/>}/>
            <Route path="/adminpanel/category" element={<CategoryDatatable/>}/>
            <Route path="/adminpanel/category/new" element={<AddCategory/>}/>
            <Route path="/adminpanel/packages" element={<PackageDatatable/>}/>
            <Route path='/adminpanel/bookings' element={<BookingDatatable/>}/>












          </Route>






        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default App
