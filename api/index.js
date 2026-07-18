const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// API ROUTES

app.use("/api/students", require("./students"));

app.use("/api/admin-login", require("./admin-login"));

app.use("/api/create-admin", require("./create-admin"));


// FRONTEND

app.use(express.static("public"));


const PORT = 3000;


app.listen(PORT, ()=>{

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});