// const Tag = require('../models/Tag');

const AirtableStore = require("../datastore/air-table-store");

const tempQ = {
    name: 'sam'
};

class TagsService {
    constructor() {
        this.tagsStore = new AirtableStore('Tags');
    }


    // Create a new tag
    async createTag(data) {
        const res = this.tagsStore.create(data).catch(err => console.log(err))

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    // Retrieve all tags
    async getAllTags() {
        // Set a higher limit when listing tags
        const data = await this.tagsStore.getAll(null, 100);

        return await new Promise(resolve => {
            resolve([...data])
        })
    }

    // Retrieve a tag by ID
    async getTagById(id) {
        const data = await this.tagsStore.get(id);

        return await new Promise(resolve => {
            resolve(data)
        })
    }

    // Update a tag by ID
    async updateTag(id, data) {
        const res = await this.tagsStore.update(id, data);

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    // Delete a tag by ID
    async deleteTag(id) {
        const res = await this.tagsStore.delete(id);

        return await new Promise(resolve => {
            resolve(res)
        })
    }
}

module.exports = TagsService;
