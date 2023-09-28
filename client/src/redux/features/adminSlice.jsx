import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"




export const adminlogin = createAsyncThunk("admin/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.adminlogin(formValue)
        toast.success("Login Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const fetchAdminUsers = createAsyncThunk("admin/fetchAdminUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.adminUsers();

        
        const usersWithIds = response.data.map((user, index) => ({
            ...user,
            id: user.id, 
        }));

        return usersWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});



export const fetchAdminAgents = createAsyncThunk("admin/fetchAdminAgents", async (_, { rejectWithValue }) => {
    try {
        const response = await api.adminAgents();

        
        const agentsWithIds = response.data.map(agent => ({
            ...agent, // Spread the agent's data
            id: agent.id, // Add the id property
        }));

        return agentsWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchAdminPackages = createAsyncThunk("admin/fetchAdminPackages", async (_, { rejectWithValue }) => {
    try {
        const response = await api.adminPackage();

        
        const packageWithIds = response.data.map((tour, index) => ({
            ...tour,
            id: index + 1, 
        }));

        return packageWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


export const adminCategoryList = createAsyncThunk("admin/adminCategoryList", async (_, { rejectWithValue }) => {
    try {
        const response = await api.adminCategoryList();

        
        const packageWithIds = response.data.map((category, index) => ({
            ...category,
            id: index + 1, 
        }));

        return packageWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


export const   adminBlockUser= createAsyncThunk("admin/ adminBlockUser", async ({ email,toast}, { rejectWithValue }) => {
    try {
        
        const response = await api.adminBlockUser(email)
        toast.success("Blocked Successfully")
        navigate("/adminpanel/users")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const   adminUnblockuser= createAsyncThunk("admin/ adminUnblockuser", async ({ email,toast}, { rejectWithValue }) => {
    try {
        
        const response = await api.adminUnblockuser(email)
        toast.success("UnBlocked Successfully")
        navigate("/adminpanel/users")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})



export const    adminBlockagent= createAsyncThunk("admin/  adminBlockagent", async ({ email,toast}, { rejectWithValue }) => {
    try {
        
        const response = await api. adminBlockagent(email)
        toast.success("Blocked Successfully")
        navigate("/adminpanel/users")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const   adminUnBlockagent= createAsyncThunk("admin/  adminUnBlockagent", async ({ email,toast}, { rejectWithValue }) => {
    try {
        
        const response = await api. adminUnBlockagent(email,toast)
        toast.success("UnBlocked Successfully")
        navigate("/adminpanel/users")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const adminDeletecategory = createAsyncThunk("admin/adminDeletecategory", async ({_id,toast}, { rejectWithValue }) => {
    try {
        console.log(_id)
        const response = await api.adminDeletecategory(_id)
        toast.success("Category deleted successfully")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const adminDeletePackage = createAsyncThunk("admin/adminDeletePackage", async ({_id,toast}, { rejectWithValue }) => {
    try {
        console.log(_id)
        const response = await api.adminDeletePackage(_id)
        toast.success("package deleted successfully")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const adminApprovalagent = createAsyncThunk("admin/adminApprovalagent", async ({email,toast}, { rejectWithValue }) => {
    try {
        console.log(email)
        const response = await api.adminApprovalagent(email)
        toast.success("agent approved successfully")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const adminNotApprovalagent= createAsyncThunk("admin/adminNotApprovalagent", async ({email,toast}, { rejectWithValue }) => {
    try {
        console.log(email)
        const response = await api.adminNotApprovalagent(email)
        toast.success("agent rejected successfully")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




export const adminBooking = createAsyncThunk("admin/adminBooking", async (_, { rejectWithValue }) => {
    try {
        const response = await api.adminBooking();

        
        const packageWithIds = response.data.map((booking, index) => ({
            ...booking,
            id: index + 1,
            // date: format(new Date(booking.bookin), 'yyyy-MM-dd'),

        }));

        return packageWithIds;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


export const adminBookingstatus = createAsyncThunk("admin/adminBookingstatus", async ({id,status}, { rejectWithValue }) => {
    try {
        
        const response = await api.adminBookingstatus({id,status})
       
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const admingetUserCount= createAsyncThunk("admin/admingetUserCount", async (_, { rejectWithValue }) => {
    try {
        console.log("user444444444444444444444444")
        const response = await api.admingetUserCount()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const admingetAgentCount= createAsyncThunk("admin/admingetAgentCount", async (_, { rejectWithValue }) => {
    try {
        console.log("user444444444444444444444444")
        const response = await api.admingetAgentCount()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const admingetOrderCount= createAsyncThunk("admin/admingetOrderCount", async (_, { rejectWithValue }) => {
    try {
        console.log("user444444444444444444444444")
        const response = await api.admingetOrderCount()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const admingetTotalearnings= createAsyncThunk("admin/admingetTotalearnings", async (_, { rejectWithValue }) => {
    try {
        console.log("user444444444444444444444444")
        const response = await api.admingetTotalearnings()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const adminsalesReport= createAsyncThunk("admin/adminsalesReport", async (_, { rejectWithValue }) => {
    try {
        console.log("user444444444444444444444444")
        const response = await api.adminsalesReport()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const adminspiecahrt= createAsyncThunk("admin/adminspiecahrt", async (_, { rejectWithValue }) => {
    try {
        console.log("pipipipippipipipipip")
        const response = await api.adminspiecahrt()
        console.log("countuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})








const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        agents: [],
        tours:[],
        deletecategory:[],
        bookingstatus:[],
        categories:[],
        agentTours:[],
        bookings:[],
        usercount: [],
        ordercount:[],
        agentcount:[],
        salesreport:[],
        piecahrt:[],
        totalearnings:[],
        approvalStatus: {} ,
        notapprovalStatus: {} ,

        bookingstatus:{},
      
        admin: null,
        error: "",
        loading: false

    },


    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload
        },
        setLogout: (state, action) => {
            localStorage.clear()
            state.admin = null
        }
    },



    extraReducers: {
        [adminlogin.pending]: (state, action) => {
            state.loading = true
        },
        [adminlogin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.admin = action.payload

        },
        [adminlogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [fetchAdminUsers.pending]: (state, action) => {
            state.loading = true
        },
        [fetchAdminUsers.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("getuserprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.users = action.payload

        },
        [fetchAdminUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [fetchAdminAgents.pending]: (state, action) => {
            state.loading = true
        },
        [fetchAdminAgents.fulfilled]: (state, action) => {
            state.loading = false
      
            console.log(action.payload)

            state.agents = action.payload

        },
        [fetchAdminAgents.rejected]: (state, action) => {
            state.loading = false
           
        },


        [ fetchAdminPackages.pending]: (state, action) => {
            state.loading = true
        },
        [ fetchAdminPackages.fulfilled]: (state, action) => {
            state.loading = false
           

            console.log(action.payload)

            state.tours = action.payload

        },
        [ fetchAdminPackages.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        
        [ adminCategoryList.pending]: (state, action) => {
            state.loading = true
        },
        [ adminCategoryList.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("getcategoryprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state. categories = action.payload

        },
        [ adminCategoryList.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [adminBlockUser.pending]: (state, action) => {
            state.loading = true
        },
        [ adminBlockUser.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("getblockeduser", JSON.stringify({ ...action.payload }))


            console.log(action.payload)
            const user = state.users.find(user => user.email === action.payload.email);
            if (user) {
              user.status = true; // Update status to blocked
            }
            
        },
        [adminBlockUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message

           
          },


          
        [  adminUnblockuser.pending]: (state, action) => {
            state.loading = true
        },
        [  adminUnblockuser.fulfilled]: (state, action) => {
            state.loading = false
    
            localStorage.setItem("getunblockeduser", JSON.stringify({ ...action.payload }))

            console.log(action.payload)
            const user = state.users.find(user => user.email === action.payload.email);

            if (user) {
                user.status = false; // Update status to unblocked
              }
            
        },
        [ adminUnblockuser.rejected]: (state, action) => {
            state.loading = false;
            state.error=action.payload
           
          },


          [ adminBlockagent.pending]: (state, action) => {
            state.loading = true
        },
        [ adminBlockagent.fulfilled]: (state, action) => {
            state.loading = false
    
            localStorage.setItem("blockStatus", JSON.stringify({ ...action.payload }))
            console.log(action.payload)
            state.agents = action.payload


            
        },
        [ adminBlockagent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
           
          },

          [ adminUnBlockagent.pending]: (state, action) => {
            state.loading = true
        },
        [ adminUnBlockagent.fulfilled]: (state, action) => {
            state.loading = false
    
            localStorage.setItem("blockStatus", JSON.stringify({ ...action.payload }))
            console.log(action.payload)
            state.agents = action.payload

            
        },
        [ adminUnBlockagent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
           
          },


          [ adminDeletecategory .pending]: (state, action) => {
            state.loading = true
        },
        [ adminDeletecategory .fulfilled]: (state, action) => {
            state.loading = false
            console.log("action",action)
            const deletedId = action.payload;

            state. deletecategory = state.categories.filter((item) => item._id !== deletedId);
          
            state. deletecategory= state.categories.filter((item) => item._id !== deletedId);
            state.error = null;


        },
        [ adminDeletecategory .rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        
        [ adminDeletePackage .pending]: (state, action) => {
            state.loading = true
        },
        [ adminDeletePackage .fulfilled]: (state, action) => {
            state.loading = false
            console.log("action",action)
            const deletedId = action.payload;

            state.tours = state.tours.filter((item) => item._id !== deletedId);
          
            state.tours = state.tours.filter((item) => item._id !== deletedId);
            state.error = null;



        },
        [adminDeletePackage .rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
           
        },


        [adminApprovalagent.pending]: (state, action) => {
            state.loading = true
        },
        [adminApprovalagent.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("getagentapprovedprofile", JSON.stringify({ ...action.payload }))

            const updatedAgents = state.agents.map((agent) =>
    agent.email === action.payload.email
      ? { ...agent, approved: true } // Update the approved status
      : agent
  );

  state.agents = updatedAgents;
        },
        [adminApprovalagent.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [adminNotApprovalagent.pending]: (state, action) => {
            state.loading = true
        },
        [adminNotApprovalagent.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("getagentNotapprovedprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            const updatedAgents = state.agents.map((agent) =>
    agent.email === action.payload.email
      ? { ...agent, approved: false } // Update the approved status
      : agent
  );
  state.agents = updatedAgents;
        },
        [adminNotApprovalagent.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [ adminBooking.pending]: (state, action) => {
            state.loading = true
        },
        [ adminBooking.fulfilled]: (state, action) => {
            state.loading = false
         

            console.log(action.payload)

            state.bookings = action.payload

        },
        [ adminBooking.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [ adminBookingstatus.pending]: (state, action) => {
            state.loading = true
        },
        [ adminBookingstatus.fulfilled]: (state, action) => {
            state.loading = false
         

            console.log(action.payload)

            state. bookingstatus = action.payload

        },
        [adminBookingstatus.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [admingetUserCount.pending]: (state, action) => {
            state.loading = true
        },
        [admingetUserCount.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.usercount = action.payload

        },
        [admingetUserCount.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [admingetAgentCount.pending]: (state, action) => {
            state.loading = true
        },
        [admingetAgentCount.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.agentcount = action.payload

        },
        [admingetAgentCount.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [admingetOrderCount.pending]: (state, action) => {
            state.loading = true
        },
        [admingetOrderCount.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.ordercount = action.payload

        },
        [admingetOrderCount.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [admingetTotalearnings.pending]: (state, action) => {
            state.loading = true
        },
        [admingetTotalearnings.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.totalearnings = action.payload

        },
        [admingetTotalearnings.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [adminsalesReport.pending]: (state, action) => {
            state.loading = true
        },
        [adminsalesReport.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.salesreport = action.payload

        },
        [adminsalesReport.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

        [adminspiecahrt.pending]: (state, action) => {
            state.loading = true
        },
        [adminspiecahrt.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminusercount", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.piecahrt = action.payload

        },
        [adminspiecahrt.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },










    }
})

export const { setAdmin, setLogout } = adminSlice.actions;

export default adminSlice.reducer;