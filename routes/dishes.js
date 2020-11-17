const router = require("express").Router();
const Dish = require("../models/dish");
const multer = require("multer");
const upload = multer({
  dest: "C:/Users/Arms/Desktop/code/dishCRUD/foodImages",
});
const fs = require("fs");

router.get("/", (req, res) => {
  Dish.find()
    .then((dishes) => res.render("pages/index", { dishes: dishes }))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/add", (req, res) => {
  res.render("pages/addDish", { success: false });
});

router.post("/", upload.single("dishImage"), (req, res) => {
  let newPath = "";
  if (req.file !== undefined) {
    newPath = `../foodImages/${req.file.originalname}`;

    console.log(newPath);

    fs.rename(req.file.path, newPath, (err) => {
      if (err) return handleError(err, res);
    });
  }

  const dish = new Dish({
    name: req.body.dishName,
    dishImage: newPath,
  });

  dish
    .save()
    .then(() => res.render("pages/addDish", { success: true }))
    .catch((err) => res.status(400).json("Error " + err));
});

router.get("/delete", (req, res) => {
  Dish.find()
    .then((dishes) => {
      console.log(dishes);
      res.render("pages/deleteDish", { dishes: dishes });
    })
    .catch((err) => res.status(400).json("Error" + err));
});

router.delete("/:id", (req, res) => {
  Dish.findByIdAndDelete(req.params.id)
    .then(() => res.json("Dish with given ID has been deleted"))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
