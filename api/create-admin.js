const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");


module.exports = async (req,res)=>{


    try{


        await connectDB();



        const password =
        await bcrypt.hash(
            req.body.password,
            10
        );



        const admin =
        await Admin.create({

            username:req.body.username,

            email:req.body.email,

            password,

            role:"admin"

        });



        res.status(201).json({

            message:"Admin Created Successfully",

            admin

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};

























