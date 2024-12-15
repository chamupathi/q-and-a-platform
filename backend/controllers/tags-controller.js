const TagsService = require('../services/tags-service');
const createTagSchema = require('./validators/create-tag.schema');

class TagsController {
    constructor() {
        this.service = new TagsService();

        this.createTag = this.createTag.bind(this)
        this.getAllTags = this.getAllTags.bind(this)
        this.getTagById = this.getTagById.bind(this)
        this.updateTag = this.updateTag.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
    }


    // Create a new tag
    async createTag(req, res) {
        const data = req.body;

        const { error } = createTagSchema.validate(data, { abortEarly: false });
        if (error) {
            // Send validation errors to the client
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }

        try {
            const tag = await this.service.createTag(data);
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create tag' });
        }
    }

    // Get all tags
    async getAllTags(req, res) {
        try {
            const tags = await this.service.getAllTags();
            res.status(200).json(tags);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to retrieve tags' });
        }
    }

    // Get a tag by ID
    async getTagById(req, res) {
        try {
            const id = req.params.id;
            const tag = await this.service.getTagById(id);
            if (!tag) return res.status(404).json({ error: 'Tag not found' });
            res.status(200).json(tag);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve tag' });
        }
    }

    // Update a tag by ID
    async updateTag(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedTag = await this.service.updateTag(id, data);
            if (!updatedTag)
                return res.status(404).json({ error: 'Tag not found' });
            res.status(200).json(updatedTag);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update tag' });
        }
    }

    // Delete a tag by ID
    async deleteTag(req, res) {
        try {
            const id = req.params.id;
            const deletedTag = await this.service.deleteTag(id);
            if (!deletedTag)
                return res.status(404).json({ error: 'Tag not found' });
            res.status(200).json({ message: 'Tag deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete tag' });
        }
    }
}

module.exports = TagsController;
