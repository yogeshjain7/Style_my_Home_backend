// routes/furniture.js
const express = require('express');
const Furniture = require('../models/Furniture');
const router = express.Router();

// --- Get all furniture items ---
router.get('/', async (req, res) => {
  try {
    const furnitureItems = await Furniture.find();
    res.json(furnitureItems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;