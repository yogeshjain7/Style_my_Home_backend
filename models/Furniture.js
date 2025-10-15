// models/Furniture.js
const mongoose = require('mongoose');

const FurnitureSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  dimensions: { type: String, required: true },
  imagePath: { type: String, required: true },
  modelPath: { type: String, required: true },
});

module.exports = mongoose.model('Furniture', FurnitureSchema);