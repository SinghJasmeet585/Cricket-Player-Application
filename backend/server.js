const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const session = require('express-session')
let User = require('./models/users.model');
// const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//{origin:'localhost:3000',credentials:false}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'notagoodsecret' }))

// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'sdlfjljrowuroweu',
//   cookie: { 
//       httpOnly: true,
//       maxAge:360000 
//     }
// }));

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

mongoose.connect('mongodb://localhost:27017/cdPlay', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // console.log("Mongo connection open")
    })
    .catch(err => {
        // console.log("Error")
        // console.log(err)
    })


const dashPlayersRouter = require('./routes/dashPlayers');
const usersRouter = require('./routes/users');
const favPlayersRouter = require('./routes/favPlayers');



app.use('/dashPlayers', dashPlayersRouter);
app.use('/users', usersRouter);
app.use('/favPlayers', favPlayersRouter);

// axios.get('http://localhost:5000/dashPlayers/')
//       .then((res) => {
//         console.log("Hell")
//         console.log(res.data)
//         // setTrending(res.data);
//       })
//       .catch(err=>{
//         console.log(err)
//       })


// app.get('/dashPlayers',async (req, res) => {
//   console.log("dashhhhhhreq.session.user_id",req.session)
//   await DashPlayer.find()
//   .then(data =>{
//       console.log(data)
//       res.json(data)
//   })
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// app.post('/users/login',async (req, res) => {

//   const username = req.body.username;
//   const password = req.body.password;

//   console.log("Inside Login")

//   const foundUser = await User.findAndValidate(username,password)
//   if(foundUser){
//        req.session.user_id = foundUser._id;
//        console.log("Logged in")
//   }else{
//      console.log("False Login")
//   }
//   console.log("req.session.user_id",req.session)
//   console.log("req.session.user_id",req.session.user_id)
// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
