const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  dishImage: {
    type: String,
  },
  ingredients: {
    type: Array,
    required: true
  },
  dishInformation:{
    type: Map,

  }
})

const Dish = mongoose.model('Dish', dishSchema)

module.exports = Dish