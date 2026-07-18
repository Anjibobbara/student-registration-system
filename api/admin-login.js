const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = async (req,res)=>{


    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );


    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );


    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );



    if(req.method==="OPTIONS"){

        return res.status(200).end();

    }



    if(req.method !== "POST"){

        return res.status(405).json({

            message:"Method Not Allowed"

        });

    }




    try{


        await connectDB();



        const {
            email,
            password
        } = req.body;



        if(!email || !password){

            return res.status(400).json({

                message:"Email and Password required"

            });

        }




        const admin =
        await Admin.findOne({

            email:email.toLowerCase()

        });

        console.log("ADMIN DATA:", admin);



        if(!admin){

            return res.status(401).json({

                message:"Invalid Email or Password"

            });

        }





        const match =
        await bcrypt.compare(

            password,

            admin.password

        );




        if(!match){

            return res.status(401).json({

                message:"Invalid Email or Password"

            });

        }





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
