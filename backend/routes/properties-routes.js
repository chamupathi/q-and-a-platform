const express = require('express');
const PropertyController = require('../controllers/property-controller');

const router = express.Router();
const controller = new PropertyController();

// for now lets only implement the getters
router.get('/', controller.getAllProperties); // Get all
router.get('/:id', controller.getPropertyById); // Get by ID

// router.post('/', controller.createProperty); // Create
// router.put('/:id', controller.updateProperty); // Update
// router.delete('/:id', controller.deleteProperty); // Delete

module.exports = router;
