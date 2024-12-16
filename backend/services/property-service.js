const AirtableStore = require('../datastore/air-table-store');

class PropertiesService {
  constructor() {
    this.propertyValueStore = new AirtableStore('property_value');
  }

  // Create a new property
  async createProperty(data) {
    return this.propertyValueStore.create(data).catch(err => console.log(err));
  }

  // Retrieve all propertys
  async getAllProperties() {
    return await this.propertyValueStore.getAll();
  }

  // Retrieve a property by ID
  async getPropertyById(id) {
    return await this.propertyValueStore.get(id);
  }

  // Update a property by ID
  async updateProperty(id, data) {
    return await this.propertyValueStore.update(id, data);
  }

  // Delete a property by ID
  async deleteProperty(id) {
    return await this.propertyValueStore.delete(id);
  }
}

module.exports = PropertiesService;
