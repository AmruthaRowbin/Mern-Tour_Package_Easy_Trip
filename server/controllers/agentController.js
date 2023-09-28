const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';
const Agent = require('../modelsss/agent');
const Tour=require('../modelsss/tour');
const { default: mongoose } = require('mongoose');
const Category = require('../modelsss/category');
const Slot = require('../modelsss/slot');
const Message = require("../modelsss/message")
const Users = require('../modelsss/user');


const Order = require('../modelsss/order');

exports.agentRegister = async (req, res) => {
    const { firstname,lastname, email, number, password } = req.body;
    try {
        const existingAgent = await Agent.findOne({ email });

        if (existingAgent) {
            return res.status(409).json({ error: 'Agent registration failed', message: 'Email already exists' });
        }

        const AgentDoc = await Agent.create({
            name:`${firstname} ${lastname}`,
            email,
            number,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        const token=jwt.sign({email:AgentDoc.email,id:AgentDoc._id},jwtSecret ,{expiresIn:"1d"})
       res.status(201).json({AgentDoc,token})
    } catch (e) {
        res.status(422).json({ error: 'Agent registration failed', message: e.message });
    }
};




exports.agentLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        
         const agentexist=await Agent.findOne({email})
       if(!agentexist)
       {
          return res.status(400).json({message:"agent dosn't exist"})
       }

       if (!agentexist.approved) {
        return res.status(403).json({ message: "Agent is not approved yet" });
      }
  

       if (!agentexist.status) {
        return res.status(403).json({ message: "Agent is blocked. Please contact support." });
    }
       const checkpassword = await bcrypt.compare(password, agentexist.password);

       if(!checkpassword)
       {
        return res.status(400).json({message:"Invalid credential"})
       }
     const token=jwt.sign({email:agentexist.email,id:agentexist._id},jwtSecret,{expiresIn:'1d'})
     res.status(200).json({result:agentexist,token})
        
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        
    }
    }






exports.createTour = async (req, res) => {
    const tour=req.body
    const newTour=new Tour({
        ...tour,
        creator:req.agentId,
        createdAt:new Date().toISOString(),
    })

    try{
        await newTour.save()
        res.status(201).json(newTour)
    }catch(error){
        res.status(404).json({message:"something went wrong"})
    }

}

exports.getTours = async (req, res) => {
    try {
        const tours = await Tour.find({ status: true }).sort({ _id: -1 });
        res.status(200).json(tours);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};


exports.getToursByagent=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"User doesn't exist"})
    }
    const agentTours=await Tour.find({creator : id})
    res.status(200).json(agentTours)
}



exports.deleteTour=async(req,res)=>{
    const {id}=req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:`No tour exist with id:${id}`})
        }
        await Tour.findByIdAndRemove(id)
        res.json({message:"Tour deleted successfully"})
    }catch(error){
        res.status(404).json({message:"something went wrong"})
    }
}


exports.editTour=async(req,res)=>{
    const {id}=req.params
    const{title,description,creator,imageFile,tags,price,dayone,daytwo,city,category}=req.body
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:`No tour exist with id:${id}`})
        }


        const updatedTour={

            title,
            description,
            creator,
            imageFile,
            tags,
            price,
            dayone,
            daytwo,
            city,
            category,
            _id: id,

        }
        await Tour.findByIdAndUpdate(id,updatedTour,{new : true})
        res.json(updatedTour)
       
    }catch(error){
        res.status(404).json({message:"something went wrong"})
    }
}



exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find({ status: true })
        res.status(200).json(category );
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};


exports.singleTour = async (req, res) => {
    const { id } = req.params
    try {
        const tour = await Tour.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({ message: "something went wrong" })
    }
}



exports.getBookingByagent=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"User doesn't exist"})
    }
    const allBookings = await Order.find({creator : id}).populate({
        path: 'place',
        model: 'Tour',
    });
    res.status(200).json(allBookings)
    console.log(allBookings,"5555555555555555555555555555")
}


exports.bookingStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body;
        console.log(id, status);
        const orderDeatials = await Order.findById(id);
        const no = parseInt(orderDeatials.guestno);
        const formattedBookinoutDate = orderDeatials.bookin.toISOString().split('T')[0];

        if (status == 'Pending') {
            await Slot.findOneAndUpdate({ place: orderDeatials.place, bookin: formattedBookinoutDate }, { $inc: { count: + no } });
        }

        if (status == 'Cancelled') {
            await Slot.findOneAndUpdate({ place: orderDeatials.place, bookin: formattedBookinoutDate }, { $inc: { count: - no } });
        }

        if (status == 'Success') {
            await Slot.findOneAndUpdate({ place: orderDeatials.place, bookin: formattedBookinoutDate }, { $inc: { count: - no } });
        }

        const orderDoc = await Order.findByIdAndUpdate(id, {
            $set: {
                deliverystatus: status
            }
        })
        res.status(200).json(orderDoc);
    }
    catch (err) {
        next(err);
    }
}


exports.getuserMessages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agentId = req.agentId;

        const messageDoc = await Message.find({
            $or: [
                { sender: id, recipient: agentId },
                { sender: agentId, recipient: id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messageDoc);
    } catch (err) {
        next(err);
    }
};


exports.getuserss= async (req, res) => {
    const userData = await Users.find()
    res.json(userData)
}


exports.getUserMessage=async(req,res)=>{
    try{
        const from = req.params.user1Id;
        const to =req.params.user2Id
        const newMessage=await Message.find({
            Chatusers:{
                $all:[from,to],
            }
        }).sort({updatedAt:1})
        const allmessage = newMessage.map((msg)=>{
            return{
                myself:msg.Sender.toString() === from,
                message : msg.message
            }
        })
        console.log(allmessage,"allmessageallmessageallmessage")
        return res.status(200).json(allmessage)
       
    } catch (error) {

        return res.status(500).json("internal server")
    }
}


exports.createMessages = async(req,res)=>{

    try{
      const {from, to, message}=req.body
      const newMessage =await Message.create({
          message:message,
          Chatusers:[from , to],
          Sender:from
      })
      return res.status(200).json(newMessage)
    } catch (error){
      return res.status(500).json("internal error")
    }
  
  }
  

  exports.updateAgent= async (req, res, next) => {
    try {
        console.log("rrrrrrrrr")
        const { name, email } = req.body;
        const agentDoc = await Agent.findByIdAndUpdate(req.agentId, { $set: { name: name, email: email} });
        res.status(200).json(agentDoc);
        console.log(agentDoc)
    }
    catch (err) {
        next(err);
    }
}



exports.updateAgentPaaword= async (req, res, next) => {
    try {
        console.log("qqqqqqqqqqq")
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

        const agentDoc = await Agent.findById(req.agentId);
        if (agentDoc) {
            const passok = bcrypt.compareSync(oldpassword, agentDoc.password);
            if (passok) {
                const agentDocumts = await Agent.findByIdAndUpdate(req.agentId, { $set: { password: bcrypt.hashSync(newpassword, bcryptSalt) } });
                res.status(200).json( agentDocumts)
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