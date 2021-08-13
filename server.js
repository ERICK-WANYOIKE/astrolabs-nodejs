
// Import the express function.
const express = require('express');
// Import CORS (Cross-Origin Resource Sharing) to allow external 
// HTTP requests to Express
const cors = require('cors');
// This will make 'server' an object with methods 
// for server operations

// dotenv will allow Express to read Environment Variables
require('dotenv').config();
// Cloudinary is the CDN (Content Delivery Network) service
const cloudinary = require('cloudinary').v2;
// express-form-data will allow files to be sent
const expressFormData = require('express-form-data');



const server = express();


// Parse urlencoded bodies and where the Content-Type header matches the type option
server.use( express.urlencoded({ extended: false }) );
// Tell express to parse JSON data
server.use( express.json() );
// Tell express to allow external HTTP requests
server.use(cors());
// Tell Express about express-form-data
server.use( expressFormData.parse() );

// Import mongoose to connect to MongoDB Atlas
const mongoose = require('mongoose');

// Import the Model
const userRoutes = require('./routes/user-routes.js');
const productRoutes = require('./routes/product-routes.js');


// NOTE: Make sure to enter your connection string.
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
.connect(connectionString, connectionConfig)  // returns Promise
.then(
    () => {
        console.log('DB is connected');
    }
)
.catch(
    (dbError) => {
        console.log('error occurred', dbError);
    }
);




    // Configure cloudinary
// Cloudinary needs to know our credentials 
// before accepting any HTTP request
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    }
);






// A method to process a GET HTTP request.
// server.get(path, callbackFunction)
server.get(
    '/',                        // http://localhost:3001/
    (req, res) => { 
        res.send("<html><head><title>Home</title></head><body><h1>Welcome to ERICKS Website</h1></body></html>")
    }
);


server.use(
    '/users', userRoutes
);

server.use(
    '/products', productRoutes
);


// The .listen() will connect the server
// to an available Port
// server.listen(portNumber, callbackFunction)
server.listen(
    // Check the Environment Variable for PORT otherwise use 3001
    process.env.PORT || 3001,
    () => {
        console.log('Server is running on http://localhost:3001/');
    }
)