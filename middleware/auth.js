require("dotenv").config({ path: ".env.local" });

const jwt = require("jsonwebtoken");


function verifyAdmin(req){


    const authHeader = req.headers.authorization;


    console.log("AUTH SECRET CHECK:", process.env.JWT_SECRET);
    console.log("AUTH HEADER:", authHeader);



    if(!authHeader){

        return false;

    }



    const token = authHeader.split(" ")[1];



    if(!token){

        return false;

    }



    try{


        jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        return true;


    }
    catch(error){


        console.log("JWT ERROR:", error.message);


        return false;

    }

}



module.exports = verifyAdmin;;