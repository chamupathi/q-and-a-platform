const AirtableStore = require('../datastore/air-table-store');

class TagsService {
  constructor() {
    this.tagsStore = new AirtableStore('Tags');
  }

  // Create a new tag
  async createTag(data) {
    return this.tagsStore.create(data);
  }

  // Retrieve all tags
  async getAllTags() {
    // Set a higher limit when listing tags
    return await this.tagsStore.getAll(null, 100);
  }

  // Retrieve a tag by ID
  async getTagById(id) {
    return await this.tagsStore.get(id);
  }

  // Update a tag by ID
  async updateTag(id, data) {
    return await this.tagsStore.update(id, data);
  }

  // Delete a tag by ID
  async deleteTag(id) {
    return await this.tagsStore.delete(id);
  }
}

module.exports = TagsService;
