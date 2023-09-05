// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// import * as api from "../api"



// export const getslots= createAsyncThunk("slot/getslots", async ({id}, { rejectWithValue }) => {
//     try {
//         const response = await api.getslots(id )
//         toast.success("booking cancelled successfully")
//         navigate('/bookings')

//      console.log(response.data,"ssssssssssss")
 
//         return response.data
        

//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// })


// const slotSlice=createSlice({
//     name:'slot',
//     initialState: {
//         slot : {},
//         slots :[],
//     },

//     extraReducers: {
//     [getslots.pending]: (state, action) => {
//         state.loading = true
//     },
//     [getslots.fulfilled]: (state, action) => {
//         state.loading = false
//         localStorage.setItem("slotdetailes", JSON.stringify({ ...action.payload }))
//          //state.bookings.push(action.payload);
//          state.slots = action.payload



//     },
//     [getslots.rejected]: (state, action) => {
//         state.loading = false
     
//     },

// }
// })

// export default slotSlice.reducer