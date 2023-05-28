const { Schema, model } = require("mongoose");

const collection = "products";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  thumbnail: String,
  code: {
    type: String,
    unique: true,
    required: true,
  },
  stock: Number,
  category: String
});
const productModel = model(collection, productSchema);

module.exports = {
  productModel,
};
