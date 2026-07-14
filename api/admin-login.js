require("dotenv").config({ path: ".env.local" });

const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = async (req, res) => {


    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    if(req.method === "OPTIONS"){
        return res.status(200).end();
    }



    try{


        await connectDB();



        if(req.method !== "POST"){

            return res.status(405).json({
                message:"Method Not Allowed"
            });

        }



        const {
            email,
            password
        } = req.body;



        const admin =
        await Admin.findOne({email});



        if(!admin){

            return res.status(401).json({
                message:"Admin not found"
            });

        }



        const passwordMatch =
        await bcrypt.compare(
            password,
            admin.password
        );



        if(!passwordMatch){

            return res.status(401).json({
                message:"Invalid Password"
            });

        }


console.log("JWT SECRET CHECK:", process.env.JWT_SECRET);
        const token =
        jwt.sign(

            {
                id:admin._id,
                role:admin.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );



        return res.status(200).json({

            message:"Login Successful",

            token,

            admin:{
                username:admin.username,
                email:admin.email
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