const connectDB = require("../config/db");
const Student = require("../models/Student");
const verifyAdmin = require("../middleware/auth");


module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    try {

        await connectDB();


        // GET ALL STUDENTS
        if (req.method === "GET") {
            if(!verifyAdmin(req)){

    return res.status(401).json({
        message:"Unauthorized Access"
    });

}

            const students = await Student.find()
                .sort({ createdAt: -1 });

            return res.status(200).json(students);
        }



        // ADD STUDENT
        if (req.method === "POST") {

            const {
                name,
                regNo,
                fatherName,
                motherName,
                dob,
                mobile,
                alternativeMobile,
                email,
                password,
                gender,
                courses,
                address,
                programmingLanguage,
                photo
            } = req.body;


            const student = await Student.create({

                name,
                regNo,
                fatherName,
                motherName,
                dob,
                mobile,
                alternativeMobile,
                email,
                password,
                gender,
                courses,
                address,
                programmingLanguage,
                photo

            });


            return res.status(201).json({
                message: "Student Registered Successfully",
                student
            });

        }



        // UPDATE STUDENT
        if (req.method === "PUT") {
            if(!verifyAdmin(req)){

    return res.status(401).json({
        message:"Unauthorized Access"
    });

}

            const {
                id,
                name,
                regNo,
                fatherName,
                motherName,
                dob,
                mobile,
                alternativeMobile,
                email,
                password,
                gender,
                courses,
                address,
                programmingLanguage,
                photo
            } = req.body;


            const student =
                await Student.findByIdAndUpdate(
                    id,
                    {
                        name,
                        regNo,
                        fatherName,
                        motherName,
                        dob,
                        mobile,
                        alternativeMobile,
                        email,
                        password,
                        gender,
                        courses,
                        address,
                        programmingLanguage,
                        photo
                    },
                    {
                        new: true
                    }
                );


            return res.status(200).json({
                message: "Student Updated Successfully",
                student
            });

        }




        // DELETE STUDENT
        if (req.method === "DELETE") {
            if(!verifyAdmin(req)){

    return res.status(401).json({
        message:"Unauthorized Access"
    });

}

            const { id } = req.body;


            await Student.findByIdAndDelete(id);


            return res.status(200).json({
                message: "Student Deleted Successfully"
            });

        }



        return res.status(405).json({
            message: "Method Not Allowed"
        });


    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }

};