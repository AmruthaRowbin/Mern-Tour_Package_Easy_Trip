const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'keyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';

const Users = require('../modelsss/user')
const Tour = require('../modelsss/tour')

const Booking = require('../modelsss/booking');

const Order = require('../modelsss/order');

const Category = require('../modelsss/category')

const Slot = require('../modelsss/slot');
const Review = require('../modelsss/review');

const Stripe = require("stripe");

exports.userRegister = async (req, res) => {
    const { firstname, lastname, email, number, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'User registration failed', message: 'Email already exists' });
        }

        const UserDoc = await Users.create({
            name: `${firstname} ${lastname}`,
            email,
            number,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        const usertoken = jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, { expiresIn: "1d" })
        res.status(201).json({ UserDoc, usertoken })
    } catch (e) {
        res.status(422).json({ error: 'User registration failed', message: e.message });
    }
};














exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await Users.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        // Check if the user is blocked
        if (!userExist.status) {
            return res.status(403).json({ message: "User is blocked. Please contact support." });
        }

        const checkPassword = await bcrypt.compare(password, userExist.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const usertoken = jwt.sign(
            { email: userExist.email, id: userExist._id },
            jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(200).json({ result:userExist, usertoken });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};







exports.listTours = async (req, res) => {
    const { page}=req.query
    try {
        // const tours = await Tour.find({ status: true }).sort({ _id: -1 });
        // res.status(200).json(tours);
        const limit=6
        const startIndex=(Number(page)-1)*limit
        const total=await Tour.countDocuments({})
        const tours=await Tour.find().limit(limit).skip(startIndex)
        res.json({
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

exports.getTourssuser = async (req, res) => {
    const { id } = req.params
    try {
        const tour = await Tour.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({ message: "something went wrong" })
    }
}


exports.getToursbySearch = async (req, res) => {
    const { searchQuery } = req.query
    console.log('qqqqqqqqqqqq')
    try {
        console.log('vvvvvvvvvvvvvvvvvvvbgfhvv')
        const city = new RegExp(searchQuery, "i")
        const tours = await Tour.find({ city })
        res.json(tours)
        console.log(tours)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "something went wrongcbchbgfhgfnghjghjjghj" })
    }
}



exports.bookPackage = async (req, res, next) => {
    try {
        const { bookin, guestno, name, email, phone, place, price, owner } = req.body;

        const slotDoc = await Slot.find({ place: place, bookin: bookin });
        if (slotDoc) {
            if ((slotDoc[0]?.count + parseInt(guestno)) > 20) {
                const no = 20 - slotDoc[0].count;
                return res.status(400).json({ message: `Group of ${no} persons available for this date` });
            }
        }

        const bookinDate = new Date(bookin);
        const bookinoutDate = new Date(bookinDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        console.log(bookinDate, "bookinDate");
        console.log(bookinoutDate, "bookinoutDate");

        const existingBooking = await Slot.findOne({
            place: place,
            bookin: { $lt: bookin },
            bookout: { $gte: bookin }
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Slot is already filled for the selected date range" });
        }

        const selectedDate = moment(bookin);
        const minDate = moment().add(14, 'days');

        if (selectedDate.isBefore(minDate)) {
            return res.status(400).json({ message: "Booking date must be at least 14 days from now" });
        }

        if (guestno < 1) {
            return res.status(400).json({ message: "Min 1 Guest" });
        }

        const booking = await Booking.create({
            bookin, guestno, name, email, phone, place, price, owner
        });

        res.status(200).json(booking);
        console.log(booking, "aaaaaaaaaaa");
    } catch (err) {
        next(err);
    }
}


exports.getBookingdetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }
      
        const bookingDoc = await Booking.findById(id);
        console.log(bookingDoc);
        res.status(200).json(bookingDoc);
    }
    catch (err) {
        next(err);
    }
}







exports.createOrder = async (req, res, next) => {
    try {
         console.log("")
        const stripe = new Stripe("sk_test_51NjyHGSG1cvs4dTHpFlhkzpSmlDL7mgRcUN1pLlGAXgSri0oIUHo61cF722r2YQac3Lg16UNQLSDFB3BpZpb49bL00A3mwhHja");
        const { id } = req.params;
        const bookingDoc = await Booking.findById(id);

        const paymentIntent = await stripe.paymentIntents.create({
            
            amount: (bookingDoc.price * bookingDoc.guestno) * 100,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true,
            },
        })


        const bookinDate = new Date(bookingDoc.bookin);
        const bookinoutDate = new Date(bookinDate.getTime() + 2 * 24 * 60 * 60 * 1000);

        const formattedBookinoutDate = bookingDoc.bookin.toISOString().split('T')[0];
        const no = parseInt(bookingDoc.guestno);
        console.log(formattedBookinoutDate, "formattedBookinoutDate")
        console.log(bookingDoc.place, "bookingDoc.place ")
        const slotDetails = await Slot.find({ place: bookingDoc.place, bookin: formattedBookinoutDate })
        console.log(slotDetails, "slotDetails")

        if (slotDetails.length > 0) {
            await Slot.findOneAndUpdate({ place: bookingDoc.place, bookin: formattedBookinoutDate }, { $inc: { count: no } });
        }
        else {
            const slotDoc = await Slot.create({
                user: req.userId,
                count: bookingDoc.guestno,
                bookin: bookingDoc.bookin,
                bookout: bookinoutDate,
                place: bookingDoc.place,
            });

        }


        console.log("paymentIntent"+paymentIntent)

        const orderdoc = await Order.create({
            owner: bookingDoc.owner,
            bookin: bookingDoc.bookin,
            guestno: bookingDoc.guestno,
            name: bookingDoc.name,
            email: bookingDoc.email,
            phone: bookingDoc.phone,
            place: bookingDoc.place,
            price: bookingDoc.price,
            total: bookingDoc.price * bookingDoc.guestno,
            payment_intent: paymentIntent.id,
        
        })
        console.log("paymentIntent"+paymentIntent.client_secret)
        res.status(200).send({ clientSecret: paymentIntent.client_secret })
        
    }
    catch (err) {
        next(err)
    }
}



 
exports.updateOrder = async (req, res, next) => {
    try {
        // Validate that req.body.payment_intent is a string
        if (typeof req.body.payment_intent !== 'string') {
            return res.status(400).json({ error: 'Invalid payment_intent format' });
        }

        // Find and update the order
        const order = await Order.findOneAndUpdate(
            { payment_intent: req.body.payment_intent },
            { $set: { orderstatus: 'Success', ordermethod: 'Stripe', deliverystatus: 'Pending' } },
            { new: true }
        );

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).send(order);
    } catch (err) {
        console.error(err);
        next(err);
    }
};



exports.updateCodOrder = async (req, res, next) => {
    try {
        console.log("lll");
        const { id } = req.params;
        const bookingDoc = await Booking.findById(id);
        const userDoc = await User.findById(req.userId);
        const bookinDate = new Date(bookingDoc.bookin);
        const bookinoutDate = new Date(bookinDate.getTime() + 2 * 24 * 60 * 60 * 1000);

        // Format the bookinoutDate to "yyyy-MM-dd"
        const formattedBookinoutDate = bookingDoc.bookin.toISOString().split('T')[0];
        const no = parseInt(bookingDoc.guestno);
        const bookingprice = parseInt(bookingDoc.price);
        const amt = no * bookingprice;
        console.log(formattedBookinoutDate, "formattedBookinoutDate")
        console.log(bookingDoc.place, "bookingDoc.place ")
        const slotDetails = await Slot.find({ place: bookingDoc.place, bookin: formattedBookinoutDate })
        console.log(slotDetails, "slotDetails");

        if ((bookingDoc.price * bookingDoc.guestno) > userDoc.wallet) {
            return next(createError(400, "Insuffiecient Wallet Balance"));
        }

        if (slotDetails.length > 0) {
            await Slot.findOneAndUpdate({ place: bookingDoc.place, bookin: formattedBookinoutDate }, { $inc: { count: no } });
        }
        else {
            const slotDoc = await Slot.create({
                user: req.userId,
                count: bookingDoc.guestno,
                bookin: bookingDoc.bookin,
                bookout: bookinoutDate,
                place: bookingDoc.place,
            });
        }

        const orderdoc = await Order.create({
            owner: bookingDoc.owner,
            bookin: bookingDoc.bookin,
            guestno: bookingDoc.guestno,
            name: bookingDoc.name,
            email: bookingDoc.email,
            phone: bookingDoc.phone,
            place: bookingDoc.place,
            price: bookingDoc.price,
            total: bookingDoc.price * bookingDoc.guestno,
            orderstatus: 'Success',
            ordermethod: 'Wallet',
            deliverystatus: 'Pending'
        })
        await Users.findByIdAndUpdate(req.userId, { $inc: { wallet: -amt } });
        res.status(200).json(true);
    }
    catch (err) {
        next(err)
    }
}


exports.myBookings = async (req, res) => {
    try {
        console.log('Debug: Inside myBookings controller');
        console.log('User ID:', req.userId);

        // Find all bookings associated with the user and populate the 'tour' field.
        const allBookings = await Order.find({ owner: req.userId }).populate({
            path: 'place',
            model: 'Tour',
        }).sort({ _id: -1 });

        console.log('All Bookings:', allBookings);
        res.status(200).json(allBookings);
    } catch (err) {
      
        res.status(404).json({ message: "something went wrongcbchbgfhgfnghjghjjghj" })
    }
};





exports.getCategory = async (req, res, next) => {
    try {
        const categoryDoc = await Category.find({ status: true });
        res.json(categoryDoc);
    }
    catch (err) {
        next(err)
    }
}


exports.selectedCategory = async (req, res, next) => {
    try {
        const { name} = req.params;
        console.log(name, "iddddddddddddddddd");
        const categoryDoc = await Tour.find({ category: name });
        res.status(200).json(categoryDoc);
    }
    catch (err) {
        next(err);
    }
}




exports.getToursbySearchcategory = async (req, res) => {
    const { searchQuery } = req.query
    console.log('qqqqqqqqqqqq')
    try {
        console.log('vvvvvvvvvvvvvvvvvvvvv')
        const category = new RegExp(searchQuery, "i")
        const tours = await Tour.find({ category })
        res.json(tours)
        console.log(tours)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "something went wrongcbchbgfhgfnghjghjjghj" })
    }
}


exports.cancelBooking = async (req, res, next) => {
    try {
        const { bookingid, cancelText } = req.body;
        const order = await Order.findById(bookingid);

        const amt = parseInt(order.total)
        console.log(amt, "amt");
        const currentDate = new Date();
        const bookingDate = order.bookin;
        const daysBeforeBooking = Math.floor((bookingDate - currentDate) / (1000 * 60 * 60 * 24));

        if (daysBeforeBooking <= 14) {
            return next(createError(400, "Should Cancel 14 days before the booking date"))
        }

        const orderDeatials = await Order.findById(bookingid);
        const no = parseInt(orderDeatials.guestno);

        //  await Slot.findOneAndUpdate({ place: orderDeatials.place }, { $inc: { count: - no } });

        const orderDoc = await Order.findByIdAndUpdate(bookingid, { $set: { deliverystatus: 'Cancelled', reason: cancelText } });
        const user = await Users.findByIdAndUpdate(req.userId,  { new: true });

        if (!user) {
            return next(createError(500, "Failed to update user's wallet"));
        }
        console.log(user, "user");
        res.status(200).json(orderDoc);
    } catch (err) {
        next(err);
    }
}



exports.getSlots = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const slotDoc = await Slot.find({ place: id });
        
        res.status(200).json(slotDoc);
        console.log(slotDoc,"MMMMMMMMMMMMMMMMMMMMMM")
    } catch (err) {
        next(err);
    }
}




exports.addReview = async (req, res, next) => {
    try {
        const { packageid, ownerid, reviewText } = req.body;
        const reviewDoc = await Review.create({
            owner: ownerid,
            place: packageid,
            desc: reviewText
        })
        res.status(200).json(reviewDoc)
    }
    catch (err) {
        next(err);
    }
}



exports.getIdreviews = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id,'idididididididididididididi')
        const reviewDoc = await Review.find({ place: id }).populate({
            path: 'owner',
            model: 'Users'
        })
            .populate({
                path: 'place',
                model: 'Tour'
            });;
        res.status(200).json(reviewDoc);
        console.log(reviewDoc,"revrevreveererreteet")
    }
    catch (err) {
        next(err);
    }
}


exports.getUserDetails = async (req, res, next) => {
    try {
        console.log(req.userId)
        const userDoc = await Users.findById(req.userId);
        res.status(200).json(userDoc);
    } catch (err) {
        next(err);
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, number } = req.body;
        const userDoc = await Users.findByIdAndUpdate(req.userId, { $set: { name: name, email: email, number: number } });
        res.status(200).json(userDoc);
    }
    catch (err) {
        next(err);
    }
}


exports.updateUserPaaword = async (req, res, next) => {
    try {
        const { oldpassword, newpassword, confirmpassword } = req.body;

        if (!oldpassword || !newpassword || !confirmpassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).json({ message: "Password Doesn't Match" });
        }

        if (newpassword.length < 4 || newpassword.length > 10) {
            return res.status(400).json({ message: "Password should be between 4 and 10 characters" });
        }

        const userDoc = await Users.findById(req.userId);
        if (userDoc) {
            const passok = bcrypt.compareSync(oldpassword, userDoc.password);
            if (passok) {
                const userDocumts = await Users.findByIdAndUpdate(req.userId, { $set: { password: bcrypt.hashSync(newpassword, bcryptSalt) } });
                res.status(200).json(userDocumts)
            }
            else {
                return res.status(400).json({ message: "Incorrect Password" })
            }
        }
        else {
            return res.status(400).json({ message: "User Not Registered" });
        }

    } catch (err) {
        next(err);
    }
}
