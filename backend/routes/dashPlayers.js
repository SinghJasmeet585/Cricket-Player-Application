const router = require('express').Router();
let DashPlayer = require('../models/dashPlayers.model');

router.route('/').get((req, res) => {
    DashPlayer.find()
    .then(data =>{
        // console.log(data)
        res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;