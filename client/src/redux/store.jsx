import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice"
import TourReducer from './features/tourSlice'
import UserrReducer from './features/userrSlice'
import AdminReducer from './features/adminSlice'
import CategoryReducer from './features/categorySlice'
 import BookingReducer from './features/bookingSlice'
 import OrderReducer from './features/orderSlice'
 import ReviewReducer from './features/reviewSlice'


export default configureStore({
    reducer: {
        auth: AuthReducer,
        tour: TourReducer,
        userr: UserrReducer,
        admin: AdminReducer,
        category:CategoryReducer,
        booking :BookingReducer,
        order:OrderReducer,
        review:ReviewReducer,




    },
})