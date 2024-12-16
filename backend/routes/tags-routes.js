const express = require('express');
const TagsController = require('../controllers/tags-controller');

const router = express.Router();
const controller = new TagsController();
// Define routes for /tags
router.post('/', controller.createTag); // Create a tag
router.get('/', controller.getAllTags); // Get all tags
router.get('/:id', controller.getTagById); // Get a tags by ID
router.put('/:id', controller.updateTag); // Update a tag
router.delete('/:id', controller.deleteTag); // Delete a tag

module.exports = router;
