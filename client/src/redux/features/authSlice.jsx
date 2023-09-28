import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"


export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signIn(formValue)
        toast.success("Login Successfully")
        navigate("/agent/Home")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const register = createAsyncThunk("auth/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signUp(formValue)
        toast.success("Register Successfully")
        navigate("/agent/Home")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const  AgentUsers= createAsyncThunk("auth/ AgentUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await api. AgentUsers()
      
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const AgentMessages = createAsyncThunk("auth/ AgentMessages ", async ({ user1Id,user2Id}, { rejectWithValue }) => {
    try {
        const response = await api.AgentMessages (user1Id,user2Id)

     console.log(response.data,"ssssssssssss")
 
     

        return response.data
        

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const AgentCretaemessage = createAsyncThunk("auth/AgentCretaemessage", async (messageData, { rejectWithValue }) => {
    try {
        console.log(messageData,"xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        const response = await api.AgentCretaemessage(messageData)
       
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})



export const updateAgents= createAsyncThunk("auth/updateAgents", async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
        console.log( formData,"ttttttttttttttt")
        const response = await api.updateAgents(formData)
        toast.success("updated successfully")
        console.log("mmmmmmmmmmmmm")
        navigate("/agent")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




export const updateAgentPassword= createAsyncThunk("auth/updateAgentPassword", async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
        console.log( formData,"ttttttttttttttt")
        const response = await api.updateAgentPassword(formData)
        toast.success("updated successfully")
        navigate("/agent")
        console.log("mmmmmmmmmmmmm")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        agent: null,
        error: "",
        users:[],
        messages:[],
        agentmsg:[],
        loading: false,
    },


    reducers: {
        setAgent: (state, action) => {
            state.agent = action.payload
        },
        setLogout: (state, action) => {
            localStorage.clear()
            state.agent = null
        }
    },





    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.agent = action.payload

        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.agent = action.payload

        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },



        [ AgentUsers.pending]: (state, action) => {
            state.loading = true 
        },
        [ AgentUsers.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("agentlist", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.users = action.payload

        },
        [ AgentUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ AgentMessages.pending]: (state, action) => {
            state.loading = true 
        },
        [ AgentMessages.fulfilled]: (state, action) => {
            state.loading = false
       
            state.messages = action.payload

        },
        [ AgentMessages.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [AgentCretaemessage.pending]: (state, action) => {
            state.loading = true 
        },
        [AgentCretaemessage.fulfilled]: (state, action) => {
            state.loading = false
       
            state.agentmsg = action.payload

        },
        [ AgentCretaemessage.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [ updateAgents.pending]: (state, action) => {
            state.loading = true 
        },
        [ updateAgents.fulfilled]: (state, action) => {
            state.loading = false
       
            state.agent = action.payload

        },
        [  updateAgents.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },



        [ updateAgentPassword.pending]: (state, action) => {
            state.loading = true 
        },
        [updateAgentPassword.fulfilled]: (state, action) => {
            state.loading = false
       
            state.agent = action.payload

        },
        [ updateAgentPassword.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },



    },
})
export const { setAgent, setLogout } = authSlice.actions
export default authSlice.reducer