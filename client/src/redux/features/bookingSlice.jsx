import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"


export const bookPackage = createAsyncThunk("booking/bookPackage", async ({ packagedata,navigate }, { rejectWithValue }) => {
    try {
        const response = await api.bookPackage(packagedata)
         navigate(`/payment/${response.data._id}`); 
     console.log(packagedata,"pppppppppppppppppp")
     console.log(response.data,"ssssssssssss")

        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



export const bookingDetailes= createAsyncThunk("booking/ bookingDetailes", async ({ id}, { rejectWithValue }) => {
    try {
        const response = await api.bookingDetailes(id)

     console.log(response.data,"ssssssssssss")
     console.log(id,'qqqqqqqqqqqqq')
     

        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const  getBookings= createAsyncThunk("booking/getBookings", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getBookings()

     console.log(response.data,"ssssssssssss")
  
     

        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const payment= createAsyncThunk("booking/ payment", async ({ id}, { rejectWithValue }) => {
    try {
        const response = await api.payment(id)

     console.log(response.data,"ssssssssssss")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const cancelbookings= createAsyncThunk("booking/cancelbookings", async ({ bookingid, cancelText ,}, { rejectWithValue }) => {
    try {
        const response = await api.cancelbookings({ bookingid, cancelText })
        
       

     console.log(response.data,"ssssssssssss")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getslots= createAsyncThunk("booking/getslots", async ({id}, { rejectWithValue }) => {
    try {
        const response = await api.getslots(id )
        toast.success("booking cancelled successfully")
        navigate('/bookings')

     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


// export const addReview= createAsyncThunk("booking/addReview", async ({ packageid, ownerid, reviewText }, { rejectWithValue }) => {
//     try {
//         const response = await api.addReview( { packageid, ownerid, reviewText })
//         // toast.success("booking cancelled successfully")
//         // navigate('/bookings')

//      console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
 
//         return response.data
        

//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// })



export const getTourbybooking = createAsyncThunk("booking/getTourbybooking", async (agentId, { rejectWithValue }) => {
    try {
        const response = await api.getTourbybooking(agentId)
        const packageWithIds = response.data.map(( agentbookings , index) => ({
            ... agentbookings,
            id: index + 1,
            // date: format(new Date(booking.bookin), 'yyyy-MM-dd'),
            
        }));

       
        return packageWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getWallet= createAsyncThunk("booking/getWallet", async (_, { rejectWithValue }) => {
    try {
        console.log('waletwaletwaletwaletwaletwaletwaletwaletwaletwaletwaletwalet')
        const response = await api.getWallet( )
      

     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const getwalletcash= createAsyncThunk("booking/ getwalletcash", async ({ id}, { rejectWithValue }) => {
    try {
        const response = await api.getwalletcash(id)

     console.log(response.data,"ssssssssssss")
 
        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


const bookingSlice= createSlice({
    name: 'booking',
    initialState: {
        booking : {},
        bookings : [],
        cancelbookings:[],
        agentbookings : [],
        wallets : [],
    
        error : "",
        loading: false,
    },

    extraReducers: {
        [bookPackage.pending]: (state, action) => {
            state.loading = true
        },
        [bookPackage.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("booking", JSON.stringify({ ...action.payload }))
             state.bookings.push(action.payload);
            // state.bookings = action.payload



        },
        [bookPackage.rejected]: (state, action) => {
            state.loading = false
         
        },
        [bookingDetailes.pending]: (state, action) => {
            state.loading = true
        },
        [bookingDetailes.fulfilled]: (state, action) => {
            state.loading = false
          
            //  state.bookings.push(action.payload);
            state.booking = action.payload



        },
        [bookingDetailes.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },

        [payment.pending]: (state, action) => {
            state.loading = true
        },
        [payment.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("paymentdetailes", JSON.stringify({ ...action.payload }))
             //state.bookings.push(action.payload);
             state.booking = action.payload



        },
        [payment.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },

        [getBookings.pending]: (state, action) => {
            state.loading = true
        },
        [getBookings.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userbookingdetailes", JSON.stringify({ ...action.payload }))
             //state.bookings.push(action.payload);
             state.bookings = action.payload



        },
        [getBookings.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },
        [cancelbookings.pending]: (state, action) => {
            state.loading = true
        },
        [cancelbookings.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("cancelbookingdetailes", JSON.stringify({ ...action.payload }))
             //state.bookings.push(action.payload);
             state.cancelbookings = action.payload



        },
        [cancelbookings.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },
        [getslots.pending]: (state, action) => {
            state.loading = true
        },
        [getslots.fulfilled]: (state, action) => {
            state.loading = false
        
             state.bookings.push(action.payload);
            



        },
        [getslots.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },


        [getTourbybooking.pending]: (state, action) => {
            state.loading = true
        },
        [getTourbybooking.fulfilled]: (state, action) => {
            state.loading = false
            // state.agentTours.push(action.payload);
          
            state.agentbookings = action.payload
            // console.log(agentbooking,"22222222222222222222222222222222222222222")




        },
        [getTourbybooking.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },



        [getWallet.pending]: (state, action) => {
            state.loading = true
        },
        [getWallet.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("wallet", JSON.stringify({ ...action.payload }))
             state.wallets.push(action.payload);
          


        },
        [getWallet.rejected]: (state, action) => {
            state.loading = false
         
        },


        [getwalletcash.pending]: (state, action) => {
            state.loading = true
        },
        [getwalletcash.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("paymentdetailes", JSON.stringify({ ...action.payload }))
             //state.bookings.push(action.payload);
             state.wallets = action.payload



        },
        [getwalletcash.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
         
        },


      
    }




})

export default bookingSlice.reducer