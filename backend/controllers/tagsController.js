const tagService = require('../services/tagService');
const createTagSchema = require('./validators/createTag');

// Create a new tag
async function createTag(req, res) {
    const data = req.body;

    const { error } = createTagSchema.validate(data, { abortEarly: false });
    if (error) {
        // Send validation errors to the client
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }

    try {
        const tag = await tagService.createTag(data);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tag' });
    }
}

// Get all tags
async function getAllTags(req, res) {
    try {
        const tags = await tagService.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tags' });
    }
}

// Get a tag by ID
async function getTagById(req, res) {
    try {
        const id = req.params.id;
        const tag = await tagService.getTagById(id);
        if (!tag) return res.status(404).json({ error: 'Tag not found' });
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tag' });
    }
}

// Update a tag by ID
async function updateTag(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedTag = await tagService.updateTag(id, data);
        if (!updatedTag)
            return res.status(404).json({ error: 'Tag not found' });
        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tag' });
    }
}

// Delete a tag by ID
async function deleteTag(req, res) {
    try {
        const id = req.params.id;
        const deletedTag = await tagService.deleteTag(id);
        if (!deletedTag)
            return res.status(404).json({ error: 'Tag not found' });
        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tag' });
    }
}

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};
