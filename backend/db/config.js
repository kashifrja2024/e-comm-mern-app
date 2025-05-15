// MonoDB connection
// require('dotenv').config();
// const mongoose = require("mongoose")
// // mongoose.connect("mongodb://localhost:27017/e-commerce");
// mongoose.connect(process.env.MONGO_URI);


const mongoose = require("mongoose");
require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect("mongodb+srv://kashifrja105:byJDlRSB0TKR1TLL@mern-appdb.kwggb8y.mongodb.net/?retryWrites=true&w=majority&appName=mern-appdb")
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));





