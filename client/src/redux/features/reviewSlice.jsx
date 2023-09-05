import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"



export const addReview= createAsyncThunk("review/addReview", async ({ packageid, ownerid, reviewText }, { rejectWithValue }) => {
    try {
        const response = await api.addReview( { packageid, ownerid, reviewText })
        // toast.success("booking cancelled successfully")
        // navigate('/bookings')

     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const allReviewss= createAsyncThunk("review/allReviewss", async (id , { rejectWithValue }) => {
    try {
        console.log(id)
        const response = await api.allReviewss(id)
        // toast.success("booking cancelled successfully")
        // navigate('/bookings')

     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


const reviewSlice=createSlice({
    name:'review',
    initialState: {
        review : {},
        reviews :[],
    },

    extraReducers: {
        [ addReview.pending]: (state, action) => {
            state.loading = true
        },
        [ addReview.fulfilled]: (state, action) => {
            state.loading = false
        
             state.reviews.push(action.payload);
            



        },
        [ addReview.rejected]: (state, action) => {
            state.loading = false
         
        },
        [ allReviewss.pending]: (state, action) => {
            state.loading = true
        },
        [ allReviewss.fulfilled]: (state, action) => {
            state.loading = false
        
             state.reviews.push(action.payload);
            



        },
        [ allReviewss.rejected]: (state, action) => {
            state.loading = false
         
        },
}
})

export default reviewSlice.reducer