const PropertyService = require('../services/property-service');
const createPropertySchema = require('./validators/create-property.schema');

class PropertyController {
    constructor() {
        this.service = new PropertyService();

        this.createProperty = this.createProperty.bind(this)
        this.getAllProperties = this.getAllProperties.bind(this)
        this.getPropertyById = this.getPropertyById.bind(this)
        this.updateProperty = this.updateProperty.bind(this)
        this.deleteProperty = this.deleteProperty.bind(this)
    }


    // Create a new tag
    async createProperty(req, res) {
        const data = req.body;

        const { error } = createPropertySchema.validate(data, { abortEarly: false });
        if (error) {
            // Send validation errors to the client
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }

        try {
            const tag = await this.service.createProperty(data);
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create tag' });
        }
    }

    // Get all tags
    async getAllProperties(req, res) {
        try {
            const tags = await this.service.getAllProperties();
            res.status(200).json(tags);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to retrieve tags' });
        }
    }

    // Get a tag by ID
    async getPropertyById(req, res) {
        try {
            const id = req.params.id;
            const tag = await this.service.getPropertyById(id);
            if (!tag) return res.status(404).json({ error: 'Property not found' });
            res.status(200).json(tag);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve tag' });
        }
    }

    // Update a tag by ID
    async updateProperty(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedProperty = await this.service.updateProperty(id, data);
            if (!updatedProperty)
                return res.status(404).json({ error: 'Property not found' });
            res.status(200).json(updatedProperty);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update tag' });
        }
    }

    // Delete a tag by ID
    async deleteProperty(req, res) {
        try {
            const id = req.params.id;
            const deletedProperty = await this.service.deleteProperty(id);
            if (!deletedProperty)
                return res.status(404).json({ error: 'Property not found' });
            res.status(200).json({ message: 'Property deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete tag' });
        }
    }
}

module.exports = PropertyController;
