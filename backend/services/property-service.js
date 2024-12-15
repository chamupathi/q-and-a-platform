const AirtableStore = require("../datastore/air-table-store");


class PropertiesService {
    constructor() {
        this.propertyValueStore = new AirtableStore('property_value');
    }


    // Create a new tag
    async createProperty(data) {
        const res = this.propertyValueStore.create(data).catch(err => console.log(err))

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    // Retrieve all tags
    async getAllProperties() {
        const data = await this.propertyValueStore.getAll();

        return await new Promise(resolve => {
            resolve([...data])
        })
    }

    // Retrieve a tag by ID
    async getPropertyById(id) {
        const data = await this.propertyValueStore.get(id);

        return await new Promise(resolve => {
            resolve(data)
        })
    }

    // Update a tag by ID
    async updateProperty(id, data) {
        const res = await this.propertyValueStore.update(id, data);

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    // Delete a tag by ID
    async deleteProperty(id) {
        const res = await this.propertyValueStore.delete(id);

        return await new Promise(resolve => {
            resolve(res)
        })
    }
}

module.exports = PropertiesService;
