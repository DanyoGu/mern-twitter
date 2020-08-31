//This creates a new Express server.
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
//import body parser to app.js so that we can parse the JSON we send to our frontend:
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');
const path = require('path');



mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}  
//setup a basic route so that we can render some information on our page
app.get("/", (req, res) => {
  const user = new User({
      handle: "jim",
      email: "jim@jim.com",
      password: "password123"
    })
    user.save();
    res.send("hello world");
  });
    
  
app.use(passport.initialize());
require("./config/passport")(passport);

//setup some middleware for body parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//ROUTES
app.use("/api/users", users);
app.use("/api/tweets", tweets);


//we need to tell our app which port to run on. Keeping in mind that we will later be deploying our app to Heroku, 
//which requires us to run our server on process.env.PORT
const port = process.env.PORT || 5000;

//tell Express to start a socket and listen for connections on the path
//This will also log a success message to the console when our server is running successfully.
app.listen(port, () => console.log(`Server is running on port ${port}`));
