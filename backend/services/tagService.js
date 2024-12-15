// const Tag = require('../models/Tag');

const base = require("../datastore/airtablebase");

const tempQ = {
    name: 'sam'
};
// Create a new tag
async function createTag(data) {
    const res = await base('Tags').create([{
        "fields": {
            ...data
        }
    }]).catch(err => console.log(err))

    return await new Promise(resolve => {
        resolve({ ...res[0]._rawJson })
    })
}

// Retrieve all tags
async function getAllTags() {

    const data = await new Promise((resolve, reject) => {
        const d = []
        base('Tags').select({
            // Selecting the first 3 records in Grid view:
            // maxRecords: 1,
            view: "Grid view",
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function (record, i) {
                // console.log('Retrieved',i, record.get('Question Text'));
                console.log('Retrieved', i, record.fields);
                d.push({...record.fields, id: record.id})
                // console.log('Retrieved',i, record.get('Tags'));
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { 
                console.error(err); 
                reject(err); 
                return;
            }
            resolve(d)
        });
    })

    return await new Promise(resolve => {
        resolve([...data])
    })
}

// Retrieve a tag by ID
async function getTagById(id) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

// Update a tag by ID
async function updateTag(id, data) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

// Delete a tag by ID
async function deleteTag(id) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};
