require("dotenv").config();
const express = require ('express')
const app = express()
const cors = require('cors')

app.use(
    cors({
        origin : ['http://localhost:3000'],
        methods : ['GET', 'POST', 'DELETE'],
        credentials : true,
    })
    );
app.use(express.json());

const userRoute = require('./routes/User');
app.use('/user', userRoute);
const uploadRoute = require("./routes/Upload");
app.use("/upload", uploadRoute);

app.listen(3001, (req, res) => {
    console.log("server running");
});