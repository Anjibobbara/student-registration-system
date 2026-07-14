const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

async function connectDB() {

    console.log("Mongo URL:", process.env.MONGODB_URI);

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {

        cached.promise = mongoose.connect(
            process.env.MONGODB_URI,
            {
                bufferCommands:false,
                family:4
            }
        );

    }

    cached.conn = await cached.promise;

    return cached.conn;
}

module.exports = connectDB;