import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


import * as api from "../api"


export const usersignIn = createAsyncThunk("userr/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.usersignIn(formValue)
        toast.success("Login Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const userregister = createAsyncThunk("userr/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.userregister(formValue)
        toast.success("Register Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const googleregister = createAsyncThunk("userr/googleregister", async ({ userdata, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.googleregister(userdata)
        toast.success("Register Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})



export const getUserdetailes= createAsyncThunk("userr/getUserdetailes", async ({  navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.getUserdetailes()
        toast.success("Register Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const userAgents= createAsyncThunk("userr/userAgents", async (_, { rejectWithValue }) => {
    try {
        const response = await api.userAgents()
      
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




export const userMessages= createAsyncThunk("userr/ userMessages", async ({ user1Id,user2Id}, { rejectWithValue }) => {
    try {
        const response = await api.userMessages(user1Id,user2Id)

     console.log(response.data,"ssssssssssss")
 
     

        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const userCretaemessage = createAsyncThunk("userr/userCretaemessage", async (messageData, { rejectWithValue }) => {
    try {
        console.log(messageData,"xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        const response = await api.userCretaemessage(messageData)
       
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




export const updateUser= createAsyncThunk("userr/updateUser", async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
        console.log( formData,"ttttttttttttttt")
        const response = await api.updateUser(formData)
        toast.success("updated successfully")
        console.log("mmmmmmmmmmmmm")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const updatePassword= createAsyncThunk("userr/updatePassword", async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
        console.log( formData,"ttttttttttttttt")
        const response = await api.updatePassword(formData)
        toast.success("updated successfully")
        navigate("/")
        console.log("mmmmmmmmmmmmm")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})





const userrSlice = createSlice({
    name: "userr",
    initialState: {
        user: null,
        error: "",
        updateuser:[],
        loading: false,
        agents:[],
        messages:[],
        usermessage:[],
    },



    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            localStorage.clear()
            state.user = null
        }
    },


    extraReducers: {
        [usersignIn.pending]: (state, action) => {
            state.loading = true
        },
        [usersignIn.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.user = action.payload

        },
        [usersignIn.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [userregister.pending]: (state, action) => {
            state.loading = true 
        },
        [userregister.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofile", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.user = action.payload

        },
        [userregister.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ getUserdetailes.pending]: (state, action) => {
            state.loading = true 
        },
        [ getUserdetailes.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofilelisting", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.user = action.payload

        },
        [ getUserdetailes.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [ updateUser.pending]: (state, action) => {
            state.loading = true 
        },
        [ updateUser.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofileupdate", JSON.stringify({ ...action.payload }))
           
            state.updateuser = action.payload

        },
        [ updateUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [ updatePassword.pending]: (state, action) => {
            state.loading = true 
        },
        [ updatePassword.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofileupdate", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.user = action.payload

        },
        [ updatePassword.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },



        [googleregister.pending]: (state, action) => {
            state.loading = true 
        },
        [googleregister.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofile", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.user = action.payload

        },
        [googleregister.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [ userAgents.pending]: (state, action) => {
            state.loading = true 
        },
        [ userAgents.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("agentlist", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.agents = action.payload

        },
        [ userAgents.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ userMessages.pending]: (state, action) => {
            state.loading = true 
        },
        [ userMessages.fulfilled]: (state, action) => {
            state.loading = false
       
            state.messages = action.payload

        },
        [ userMessages.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [userCretaemessage.pending]: (state, action) => {
            state.loading = true 
        },
        [userCretaemessage.fulfilled]: (state, action) => {
            state.loading = false
       
            state.usermessage = action.payload

        },
        [ userCretaemessage.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },





    }


})

export const { setUser, setLogout } = userrSlice.actions;

export default userrSlice.reducer;