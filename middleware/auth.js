const jwt = require("jsonwebtoken");


function verifyAdmin(req){


    const authHeader = req.headers.authorization;


    if(!authHeader){
        return false;
    }


    const token = authHeader.split(" ")[1];


    try{

        jwt.verify(
            token,
            process.env.JWT_SECRET || "mySuperSecretKey12345"
        );


        return true;


    }catch(error){

        console.log("JWT ERROR:", error.message);

        return false;

    }


}


module.exports = verifyAdmin;