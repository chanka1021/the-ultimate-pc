const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const is_admin = Boolean(req.body.is_admin);
  const photo = req.body.photo;

  const newUser = new User({ username, password, email, is_admin, photo });

  newUser
    .save()
    .then(() => res.json("user added !"))
    .catch((err) => res.status(400).json("error : " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("error : " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch((err) => res.status(400).json("error : " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.is_admin = Boolean(req.body.is_admin);
    user.photo = req.body.photo;

    user.save()
    .then(() => res.json("user updated !"))
    .catch((err) => res.status(400).json("error : " + err));
})
.catch((err) => res.status(400).json("error : " + err));
});

module.exports = router;
