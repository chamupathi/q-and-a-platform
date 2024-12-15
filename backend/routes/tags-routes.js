const express = require('express');
const tagsController = require('../controllers/tags-controller');

const router = express.Router();

// Define routes for /tags
router.post('/', tagsController.createTag); // Create a tags
router.get('/', tagsController.getAllTags); // Get all tagss
router.get('/:id', tagsController.getTagById); // Get a tags by ID
router.put('/:id', tagsController.updateTag); // Update a tags
router.delete('/:id', tagsController.deleteTag); // Delete a tags

module.exports = router;
