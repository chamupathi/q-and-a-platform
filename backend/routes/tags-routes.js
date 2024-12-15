const express = require('express');
const TagsController = require('../controllers/tags-controller');

const router = express.Router();
const controller = new TagsController()
// Define routes for /tags
router.post('/', controller.createTag); // Create a tags
router.get('/', controller.getAllTags); // Get all tagss
router.get('/:id', controller.getTagById); // Get a tags by ID
router.put('/:id', controller.updateTag); // Update a tags
router.delete('/:id', controller.deleteTag); // Delete a tags

module.exports = router;
