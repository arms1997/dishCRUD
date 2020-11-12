const router = require('express').Router()
const Dish = require('../models/dish')

router.get('/', (req, res) =>{
  Dish.find()
    .then(dishes => res.json(dishes))
    .catch(err => res.status(400).json('Error' + err))
})


module.exports = router