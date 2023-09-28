import axios from "axios"
const API = axios.create({ baseURL: "http://localhost:4000" })


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});


API.interceptors.request.use((req) => {
  if (localStorage.getItem("userprofile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userprofile")).usertoken
      }`;
  }
  return req;
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("adminprofile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("adminprofile")).usertoken
      }`;
  }
  return req;
});




export const signIn = (formData) => API.post("/agent/login", formData)
export const signUp = (formData) => API.post("/agent/register", formData)
export const createTour = (tourData) => API.post('/agent/createtour', tourData)
export const getTours = () => API.get('/agent/createtour')
export const getTourbyagent=(agentId)=>API.get(`/agent/agentTours/${agentId}`)
export const deleteTours=(id)=>API.delete(`/agent/deletetour/${id}`)
export const editTours=(updatedTourData ,id)=>API.patch(`/agent/edittour/${id}`,updatedTourData)
export const getSingleTour=(id)=>API.get(`/agent/${id}`)
export const getCategory=()=>API.get('/agent/getcategory')

export const getTourbybooking=(agentId)=>API.get(`/agent/agentBookings/${agentId}`)


export const AgentUsers = () => API.post('/agent/getusers')

export const AgentMessages = (user1Id, user2Id) => API.post(`/agent/usermsg/${user1Id}/${user2Id}`);

export const AgentCretaemessage=(messageData)=>API.post('/agent/msge',messageData)

export const updateAgents=(formData)=>API.post('/agent/updateagent',formData)



export const updateAgentPassword=(formData)=>API.post('/agent/agentupdatepassword',formData)








export const usersignIn = (formData) => API.post("/login", formData)

export const userregister = (formData) => API.post("/register", formData)

export const googleregister =(userdata)=>API.post('/googleregister',userdata)

export const ListTours = (page ) => API.get(`/createtour?page=${page}`)


export const getTourssusers=(id)=>API.get(`/${id}`)

export const getToursBySearch=(searchQuery)=>API.post(`/search?searchQuery=${searchQuery}`)

export const bookPackage=(packagedata)=>API.post('/bookings',packagedata)

export const bookingDetailes=(id)=>API.get(`/bookingdetails/${id}`)


export const payment=(id)=>API.post(`/create-payment-intent/${id}`)

export const orderdetailes=({ payment_intent })=>API.put('/order',{ payment_intent })

export const getToursBySearchcategory=(searchQuery)=>API.post(`/searchcategory?searchQuery=${searchQuery}`)

export const getBookings=()=>API.post('/mybookings')

export const cancelbookings=({ bookingid, cancelText })=>API.post('/cancelbooking',{ bookingid, cancelText })
 

export const getslots=(id)=>API.get(`/getslots/${id}`)

export const addReview=({ packageid, ownerid, reviewText })=>API.post('/addreview',{ packageid, ownerid, reviewText })


export const allReviewss=(id)=>API.post(`/allreviews/${id}`)

export const getUserdetailes=()=>API.get('/getuserdetails')


export const updateUser=(formData)=>API.post('/updateuser',formData)

export const updatePassword=(formData)=>API.post('/updatepassword',formData)


export const getToursBytag=(tag)=>API.get(`/tag/${tag}`)

export const getrelatedTours=(tags)=>API.post('/relatedtours',tags)

export const getWallet=()=>API.post('/getwallet')

export const getwalletcash=(id)=>API.post(`/codorder/${id}`)

export const userAgents = () => API.post('/getagents')


export const userMessages = (user1Id, user2Id) => API.post(`/msg/${user1Id}/${user2Id}`);

export const userCretaemessage=(messageData)=>API.post('/msg',messageData)

export const adminlogin = (formData) => API.post("/admin/login", formData)






export const adminUsers = () => API.get('/admin/users')

export const adminAgents = () => API.get('/admin/agents')

export const adminPackage = ()=>API.get('/admin/listpackages')

export const adminaddCategory=(categorydata)=>API.post('/admin/addcategory',categorydata)

export const adminCategoryList=()=>API.get('/admin/listcategory')

export const adminBlockUser=(email)=>API.patch('/admin/blockuser', { email })

export const adminUnblockuser=(email)=>API.patch('/admin/unblockuser',{email})

export const adminBlockagent=(email)=>API.patch('/admin/blockagent',{email})

export const adminUnBlockagent=(email)=>API.patch('/admin/unblockagent',{email})

export const adminDeletecategory=(id)=>API.delete(`/admin/deletecategory/${id}`)

export const adminDeletePackage=(id)=>API.delete(`/admin/deletepackage/${id}`)


export const adminApprovalagent=(email)=>API.post('/admin/approve/',{email})

export const adminNotApprovalagent=(email)=>API.post('/admin/notapprove',{email})

export const adminBooking=()=>API.get('/admin/allorders')



export const adminBookingstatus=({id,status})=>API.patch('/admin/bookingStatus',{id,status})

export const admingetUserCount=()=>API.get('/admin/getusercounts')

export const admingetAgentCount=()=>API.get('/admin/getagentcounts')


export const admingetOrderCount=()=>API.get('/admin/getordercount')

export const admingetTotalearnings=()=>API.get('/admin/getearnings')

export const adminsalesReport=()=>API.get('/admin/salesreport')

export const adminspiecahrt=()=>API.get('/admin/getpiedetails')















