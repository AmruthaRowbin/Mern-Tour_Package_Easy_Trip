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



module.exports = router;