const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");


module.exports = async (req,res)=>{


    if(req.method !== "POST"){

        return res.status(405).json({

            message:"Method Not Allowed"

        });

    }



    try{


        await connectDB();



        const {
            username,
            email,
            password
        } = req.body;



        if(!username || !email || !password){

            return res.status(400).json({

                message:"All fields required"

            });

        }




        const existingAdmin =
        await Admin.findOne({

            email:email.toLowerCase()

        });



        if(existingAdmin){

            return res.status(400).json({

                message:"Admin already exists"

            });

        }




        const hashedPassword =
        await bcrypt.hash(

            password,

            10

        );





        const admin =
        await Admin.create({

            username,

            email:email.toLowerCase(),

            password:hashedPassword,

            role:"admin"

        });





        return res.status(201).json({

            message:"Admin Created Successfully",

            admin:{
                username:admin.username,
                email:admin.email,
                role:admin.role
            }

        });



    }

    catch(error){


        console.log(error);


        return res.status(500).json({

            message:error.message

        });


    }


};

























