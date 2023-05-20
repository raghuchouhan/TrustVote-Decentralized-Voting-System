const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/Auth");
const contractapi = require("./routes/contract")

dotenv.config();
// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>console.log("Connected to DB"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/contract",contractapi); 

app.listen(5500,()=>{
    console.log("Backened server is running at port 5500")
})
