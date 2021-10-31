//Modules
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require('./routes/api');

//access-control-allow-credentials:true
const corsOptions ={
    origin: "*"
}

//The middleware for parsing and configuring
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(routes);

const PORT = process.env.port || 3001;

app.listen(PORT, function(){
    console.log("Server is running on port " + PORT +".");
});