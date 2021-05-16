require("dotenv").config();
const express = require ('express')
const app = express()
const cors = require('cors');
const path = require('path');


app.use(
    cors({
        origin : ['http://localhost:3000'],
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        credentials : true,
    })
    );
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/images', 
express.static(path.join(__dirname,
    'images')));


const userRoute = require('./routes/User');
app.use('/user', userRoute);
const uploadRoute = require("./routes/Upload");
app.use("/upload", uploadRoute);

app.listen(3001, (req, res) => {
    console.log("server running");
});