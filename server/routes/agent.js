const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')


const agentControllers = require('../controllers/agentController');

router.post('/register', agentControllers.agentRegister)

router.post('/login', agentControllers.agentLogin)

router.post('/createtour', auth, agentControllers.createTour)


router.get('/createtour', agentControllers.getTours)

router.get('/agentTours/:id',agentControllers.getToursByagent)

router.delete('/deletetour/:id',auth,agentControllers.deleteTour)

router.patch('/edittour/:id',auth,agentControllers.editTour)

router.get('/getcategory', agentControllers.getCategory)

router.get('/:id',agentControllers.singleTour)


router.get('/agentBookings/:id',agentControllers.getBookingByagent)

router.patch('/bookingStatus', agentControllers.bookingStatus)


router.get('/getmessages/:id', auth, agentControllers.getuserMessages)

router.post('/getusers', agentControllers.getuserss)

router.post("/usermsg/:user1Id/:user2Id",agentControllers.getUserMessage)

router.post('/updateagent',auth, agentControllers.updateAgent)


router.post('/agentupdatepassword', auth, agentControllers.updateAgentPaaword)

router.post('/msge',agentControllers.createMessages)

module.exports = router;