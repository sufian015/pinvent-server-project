const { readdirSync } = require('fs');
const path=require('path');
const express=require('express');
const app=express();
const helmet=require('helmet');
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const errorHandler=require("./middlewars/errorHandler");

//middleware

app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cors());


//routes middleware

readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`))) 

//server 
 const port=process.env.PORT||6000;





// error Middleware
app.use(errorHandler);

// Connect to DB and start server

mongoose.connect(process.env.DATABASE)
   .then(
     app.listen(port,()=>{
          console.log(`server is running at port:${port}`)
     })
   )
   .catch((err)=>console.log(err))



