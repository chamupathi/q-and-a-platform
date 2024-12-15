const express = require('express');
const PropertyController = require('../controllers/property-controller');

const router = express.Router();
const controller = new PropertyController()
// Define routes for /tags
// router.post('/', controller.createProperty); // Create a tags

// for now lets only keep the getters
router.get('/', controller.getAllProperties); // Get all tagss
router.get('/:id', controller.getPropertyById); // Get a tags by ID

// router.put('/:id', controller.updateProperty); // Update a tags
// router.delete('/:id', controller.deleteProperty); // Delete a tags

module.exports = router;
