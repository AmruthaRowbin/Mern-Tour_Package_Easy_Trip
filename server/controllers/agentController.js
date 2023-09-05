const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';
const Agent = require('../modelsss/agent');
const Tour=require('../modelsss/tour');
const { default: mongoose } = require('mongoose');
const Category = require('../modelsss/category');

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