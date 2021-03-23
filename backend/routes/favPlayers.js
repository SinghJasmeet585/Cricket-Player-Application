const router = require('express').Router();
let FavPlayer = require('../models/favPlayers.model');



router.route('/').post(async(req, res) => {

    const username = req.body.username
    // console.log("Username Inside Allllll route : ",username)
    const favPlayerUser = await FavPlayer.findOne({username})
    const favPlayers = favPlayerUser.fav;
    res.send(favPlayers)
    
});

router.route('/delete').post(async(req, res) => {

    const username = req.body.username
    const pid = req.body.pid
    // console.log("Username Inside delete route : ",username)
    const favPlayerUser = await FavPlayer.findOneAndUpdate( {username}, { $pull: {fav : {pid : pid } } }, {new:true})
    const favPlayers = favPlayerUser.fav;
    // console.log("Deleted Array : ",favPlayers)
    res.send(favPlayers)
    
});

router.route('/add').post(async (req, res) => {

    const fav = req.body.fav;
    const username = req.body.username
    // console.log("Pid : ",pid)
    // console.log("Username Inside Add route : ",username)

    // const foundUser = await this.findOne({username});
    // const isValid = await bcrypt.compare(password,foundUser.password);
    
    const favPlayerUser = await FavPlayer.findOne({username})

    // console.log('favPlayerUser',favPlayerUser)

    favPlayerUser.fav.push(fav);

    favPlayerUser.save()
        .then(data =>{
            // console.log(data)
            res.json(data)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// router.route('/add').post((req, res) => {
//   const username = req.body.username;

//   const newUser = new User({username});

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;