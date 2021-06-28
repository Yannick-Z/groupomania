require('dotenv').config();
const helmet = require('helmet');
const express = require ('express'); 

const cors = require('cors');
const path = require('path');
const app = express();




// Permet d'autoriser le CRUD
app.use(
    cors({
        origin : ['http://localhost:3000'],
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        credentials : true,   
    })
);


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:5000}));
app.use(helmet());
app.use('/images', 
    express.static(path.join(__dirname,
        'images'))); //Autorise multer



//Routes pour les user et uploads
const userRoute = require('./routes/User');
app.use('/user', userRoute);
const uploadRoute = require('./routes/Upload');
app.use('/upload', uploadRoute);

app.listen(3001, () => {
    console.log('server running');
    
});