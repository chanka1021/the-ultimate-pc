const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const is_admin = Boolean(req.body.is_admin) ;
    const photo = req.body.photo;

    const newUser = new User({username,password,email,is_admin,photo})

    newUser.save()
        .then(()=> res.json('user added !'))
        .catch(err => res.status(400).json('error : '+ err));
});

module.exports = router;
