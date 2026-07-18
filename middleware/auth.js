const jwt = require("jsonwebtoken");


function verifyAdmin(req){


    try{


        const authHeader =
        req.headers.authorization;



        if(!authHeader){

            return false;

        }



        const parts =
        authHeader.split(" ");



        if(
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ){

            return false;

        }



        const token = parts[1];



        jwt.verify(

            token,

            process.env.JWT_SECRET

        );



        return true;



    }

    catch(error){


        console.log(
            "JWT ERROR:",
            error.message
        );


        return false;


    }


}



module.exports = verifyAdmin;
