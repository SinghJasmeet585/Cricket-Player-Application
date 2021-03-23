const mongoose = require('mongoose');

const DashPlayer = require('./models/dashPlayers.model');


mongoose.connect('mongodb://localhost:27017/cdPlay', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        // console.log("Mongo connection open")
    })
    .catch(err=>{
        // console.log("Error")
        // console.log(err)
    })

const seedProducts = [
    {
        pid: 237095,
        name: "M Vijay"
      },
      {
        pid: 28763,
        name: "G Gambhir"
      },
      {
        pid: 32540,
        name: "CA Pujara"
      },
      {
        pid: 253802,
        name: "V Kohli"
      },
      {
        pid: 31107,
        name: "A Mishra"
      },
      {
        pid: 277916,
        name: "AM Rahane"
      },
      {
        pid: 26421,
        name: "R Ashwin"
      },
      {
        pid: 279810,
        name: "WP Saha"
      },
      {
        pid: 234675,
        name: "RA Jadeja"
      },
      {
        pid: 376116,
        name: "UT Yadav"
      },
      {
        pid: 481896,
        name: "Mohammed Shami"
      },
      
      {
        pid: 11728,
        name: "AN Cook"
      },
      {
        pid: 632172,
        name: "H Hameed"
      },
      {
        pid: 303669,
        name: "JE Root"
      },
      {
        pid: 521637,
        name: "BM Duckett"
      },
      {
        pid: 8917,
        name: "MM Ali"
      },
      {
        pid: 311158,
        name: "BA Stokes"
      },
      {
        pid: 297433,
        name: "JM Bairstow"
      },
      {
        pid: 247235,
        name: "CR Woakes"
      },
      {
        pid: 244497,
        name: "AU Rashid"
      },
      {
        pid: 349853,
        name: "ZS Ansari"
      },
      {
        pid: 10617,
        name: "SCJ Broad"
      }
  ]


  DashPlayer.insertMany(seedProducts)
    .then(res => {
        // console.log(res)
    })
    .catch(e => {
        // console.log(e)
    })