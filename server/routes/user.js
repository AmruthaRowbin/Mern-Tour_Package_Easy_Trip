const express = require('express');
const router = express.Router();
 const authuser=require('../middleware/authuser')


const userController = require('../controllers/userController')

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/createtour', userController.listTours)

router.get("/:id", userController.getTourssuser)

router.post('/search', userController.getToursbySearch)

router.post('/bookings', userController.bookPackage)

router.get('/bookingdetails/:id', userController.getBookingdetails)

router.post('/create-payment-intent/:id',authuser, userController.createOrder)

router.put('/order', userController.updateOrder)

router.post('/mybookings',authuser, userController.myBookings)

router.get('/allcategory', userController.getCategory)

router.get('/categoryselected/:id', userController.selectedCategory)

router.post('/cancelbooking',authuser,userController.cancelBooking)
router.post('/codorder/:id', authuser, userController.updateCodOrder)

router.post('/searchcategory', userController.getToursbySearchcategory)


router.get('/getslots/:id', userController.getSlots)


router.post('/addreview', userController.addReview)

router.get('/allreviews/:id', userController.getIdreviews)


router.get('/getuserdetails', authuser, userController.getUserDetails)

router.post('/updateuser', authuser, userController.updateUser)

router.post('/updatepassword', authuser, userController.updateUserPaaword)


// router.get('/mybookings', verifyToken, userController.myBookings)


module.exports = router;