const router = require("express").Router();
const Dish = require("../models/dish");

router.get("/", (req, res) => {
  Dish.find()
    .then((dishes) => res.json(dishes))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/", (req, res) => {
  const dish = new Dish({
    name: req.body.name,
  });

  dish
    .save()
    .then(() => res.json("New Dish Added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.delete("/", (req, res) => {
  Dish.findOneAndDelete({
    name: req.body.name,
  })
    .then(() => res.json("Dish with given ID has been deleted"))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
