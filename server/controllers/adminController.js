const jwt = require('jsonwebtoken');
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';
const Admin = require('../modelsss/admin')
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const Users = require('../modelsss/user');

const Agent = require('../modelsss/agent')
const Tour = require('../modelsss/tour')

const Category = require('../modelsss/category')
const Order = require('../modelsss/order');
const Slot = require('../modelsss/slot');






exports.adminRegister = async (req, res) => {
    console.log('heeeeeeeeeeeeeeeeeeeee')
    const { name, email, number, password } = req.body;
    try {
        const AdminDoc = await Admin.create({
            name,
            email,
            number,
            password: bcrypt.hashSync(password, bcryptSalt)

        })
        res.json(AdminDoc);
        console.log('jjjjjjjjjjjjjjjjjj')
    }
    catch (e) {
        res.status(422).json(e)
    }
}

exports.adminLogin = async (req, res) => {
    console.log("hai111");
    const { email, password } = req.body;
    console.log(email);

    try {
        const AdminDoc = await Admin.findOne({ email });
        console.log(AdminDoc);

        if (AdminDoc) {
            const passok = bcrypt.compareSync(password, AdminDoc.password);

            if (passok) {
                jwt.sign({ email: AdminDoc.email, id: AdminDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    console.log("done");
                    res.cookie('token', token).json(AdminDoc);
                });
                console.log("ok");
            } else {
                res.status(401).json({ message: 'Invalid credentials' }); // Send a JSON response for invalid password
            }
        } else {
            res.status(404).json({ message: 'Admin not found' }); // Send a JSON response for admin not found
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' }); // Send a JSON response for general error
    }
};


exports.getUsers = async (req, res) => {
    const userData = await Users.find()
    res.json(userData)
}

exports.getAgents = async (req, res) => {
    const agentData = await Agent.find()
    res.json(agentData)
}


exports.listPackage = async (req, res) => {
    try {
        const packageData = await Tour.find();
        res.json(packageData);
    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching package data" })
    }
}


exports.addCategory = async (req, res, next) => {
    try {
        const { title, description,
        } = req.body;
        const categoryDoc = await Category.create({
            title,
            description,
        })
        console.log(categoryDoc, "jsdjjfjhsdhh")
        res.json(categoryDoc);
    }
    catch (err) {
        next(err);
    }
}

exports.listCategory = async (req, res) => {
    const categoryData = await Category.find()
    res.json(categoryData)
}



exports.blockUser = async (req, res, next) => {
    try {
        const { email } = req.body;


        const user = await Users.findOne({ email }); // Find the user by email

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.status = false; // Set the status to false to block the user
        await user.save(); // Save the updated user

        res.status(200).json({ success: true, message: 'User blocked successfully' });
    } catch (err) {
        next(err);
    }
};

exports.unBlockuser = async (req, res, next) => {
    try {
        const { email } = req.body;
        await Users.updateOne({ email: email }, { status: true });
        res.json({ success: true, message: 'User unblocked successfully' });
    } catch (err) {
        next(err);
    }
};



exports.blockAgent = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log("email...." + req.body.email)

        const user = await Agent.findOne({ email }); // Find the user by email

        if (!user) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        user.status = false; // Set the status to false to block the user
        await user.save(); // Save the updated user

        res.status(200).json({ success: true, message: 'Agent blocked successfully' });
    } catch (err) {
        next(err);
    }
};



exports.unBlockAgent = async (req, res, next) => {
    try {
        const { email } = req.body;
        await Agent.updateOne({ email: email }, { status: true });
        res.json({ success: true, message: 'Agent unblocked successfully' });
    } catch (err) {
        next(err);
    }
};



// exports.deleteCategory = async (req, res) => {
//     const { id } = req.params;
//     console.log(id); // Access the id parameter from the URL

//     try {


//         const category = await Category.findByIdAndDelete(
//             id,
//             { deleted: true }, // Set the 'deleted' field to true for soft delete
//             { new: true } // Get the updated category after the update
//         );

//         if (!category) {
//             return res.status(404).json({ message: `No category found with id: ${id}` });
//         }

//         res.json({ message: 'Category soft deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };



// exports.deletePackage = async (req, res) => {
//     const { id } = req.params;
//     console.log(id); // Access the id parameter from the URL

//     try {


//         const tour = await Tour.findByIdAndDelete(
//             id,
//             { deleted: true }, // Set the 'deleted' field to true for soft delete
//             { new: true } // Get the updated category after the update
//         );

//         if (!tour) {
//             return res.status(404).json({ message: `No package found with id: ${id}` });
//         }

//         res.json({ message: 'package soft deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };



exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const tour = await Tour.findByIdAndUpdate(
            id,
            { status: false }, // Set the 'status' field to false for soft delete
            { new: true } // Get the updated package after the update
        );

        if (!tour) {
            return res.status(404).json({ message: `No package found with id: ${id}` });
        }

        res.json({ message: 'Package soft deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { status: false }, // Set the 'status' field to false for soft delete
            { new: true } // Get the updated package after the update
        );

        if (! category) {
            return res.status(404).json({ message: `No  category found with id: ${id}` });
        }

        res.json({ message:  'category soft deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};



exports.approveAgent = async (req, res) => {
  const {email} = req.body;

  try {
    const agent = await Agent.findOne({email});
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    agent.approved = true;
    await agent.save();

    res.status(200).json({ message: 'Agent approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.notapproveAgent= async (req, res) => {
    const {email} = req.body;
  
    try {
      const agent = await Agent.findOne({email});
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
  
      agent.approved = false;
      await agent.save();
  
      res.status(200).json({ message: 'Agent approval status set to Not Approved' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


  exports.allOrders = async (req, res, next) => {
    try {
        const allBookings = await Order.find().populate({
            path: 'place',
            model: 'Tour',
        });
        res.status(200).json(allBookings)
    }
    catch (err) {
        next(err);
    }
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