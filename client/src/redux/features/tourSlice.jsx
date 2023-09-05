import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"


export const createTour = createAsyncThunk("tour/createTour", async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.createTour(updatedTourData)
        toast.success("Tour added  Successfully")
        navigate("/agent/Home")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getTours = createAsyncThunk("tour/getTours", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getTours()

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const ListTours = createAsyncThunk("tour/ListTours", async (page, { rejectWithValue }) => {
    try {
        const response = await api.ListTours(page)

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getTourssusers = createAsyncThunk("tour/getTourssusers", async (id, { rejectWithValue }) => {
    try {
        const response = await api.getTourssusers(id)

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getSingleTour = createAsyncThunk("tour/getSingleTour", async (id, { rejectWithValue }) => {
    try {
        const response = await api.getSingleTour(id)

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const getTourbyagent = createAsyncThunk("tour/getTourbyagent", async (agentId, { rejectWithValue }) => {
    try {
        const response = await api.getTourbyagent(agentId)
       
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const deleteTours = createAsyncThunk("tour/deleteTours", async ({id,toast}, { rejectWithValue }) => {
    try {
        const response = await api.deleteTours(id)
        toast.success("Tour deleted successfully")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



export const editTours = createAsyncThunk("tour/editTours", async ({id,updatedTourData, toast,navigate}, { rejectWithValue }) => {
    try {
        const response = await api.editTours(updatedTourData,id)
        toast.success("Tour updated successfully")
        navigate('/agent/Home')
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



export const getToursBySearch = createAsyncThunk("tour/getToursBySearch", async (searchQuery, { rejectWithValue }) => {
    try {
        const response = await api.getToursBySearch(searchQuery)
      
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



export const getCategory = createAsyncThunk("tour/getCategory", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getCategory()

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const getToursBySearchcategory = createAsyncThunk("tour/getToursBySearchcategory", async (searchQuery, { rejectWithValue }) => {
    try {
        const response = await api.getToursBySearchcategory(searchQuery)
      
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        agentTours: [],
        categories:[],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
    },

  reducers: {
    setCurrentPage: (state,action)=>{
        state.currentPage=action.payload
    },
  },





    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours.push(action.payload);



        },
        [createTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [getTours.pending]: (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tours = action.payload




        },
        [getTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ListTours.pending]: (state, action) => {
            state.loading = true
        },
        [ListTours.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tours = action.payload.data;
            state.numberOfPages=action.payload.numberOfPages;
            state.currentPage=action.payload.currentPage;




        },
        [ListTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
       
        [getTourssusers.pending]: (state, action) => {
            state.loading = true
        },
        [getTourssusers.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tour = action.payload




        },
        [getTourssusers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTourbyagent.pending]: (state, action) => {
            state.loading = true
        },
        [getTourbyagent.fulfilled]: (state, action) => {
            state.loading = false
            // state.agentTours.push(action.payload);

            state.agentTours = action.payload




        },
        [getTourbyagent.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [deleteTours.pending]: (state, action) => {
            state.loading = true
        },
        [deleteTours.fulfilled]: (state, action) => {
            state.loading = false
            console.log("action",action)
            const {arg: {id}}=action.meta

            if(id){
                state.agentTours=state.agentTours.filter((item)=> item._id !==id)
                state.tours=state.tours.filter((item)=> item._id !==id)
            }
           
          




        },
        [deleteTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [editTours.pending]: (state, action) => {
            state.loading = true
        },
        [editTours.fulfilled]: (state, action) => {
            state.loading = false
            console.log("action",action)
            const {arg: {id}}=action.meta

            if(id){
                state.agentTours=state.agentTours.map((item)=> item._id === id ? action.payload : item)
                state.tours=state.tours.map((item)=> item._id === id ? action.payload : item)
            }
           
          




        },
        [editTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [getToursBySearch.pending]: (state, action) => {
            state.loading = true
        },
        [getToursBySearch.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tours = action.payload




        },
        [getToursBySearch.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ getSingleTour.pending]: (state, action) => {
            state.loading = true
        },
        [ getSingleTour.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tour = action.payload




        },
        [ getSingleTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [getCategory.pending]: (state, action) => {
            state.loading = true
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.categories = action.payload




        },
        [getCategory.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [getToursBySearchcategory.pending]: (state, action) => {
            state.loading = true
        },
        [getToursBySearchcategory.fulfilled]: (state, action) => {
            state.loading = false
            // state.tours.push(action.payload);

            state.tours = action.payload




        },
        [getToursBySearchcategory.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },





    },
})

export const {setCurrentPage}=tourSlice.actions;

export default tourSlice.reducer
