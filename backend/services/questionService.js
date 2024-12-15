// const Question = require('../models/Question');

const base = require("../datastore/airtablebase");

const tempQ = {
    name: 'sam'
};
// Create a new question
async function createQuestion(data) {
    base('Questions').create([{
        "fields": {
            "Question Text": "What are the best materials to use for building a homemade drone?",
            "Submission Date": "2024-12-14",
            "User": [
                "recdkCjPd1ZlTqANZ"
            ],
            "Custom Tags": [
                "Tag1", "tag 2"
            ]
        }
    }]).then().catch(err => console.log(err))

    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

// Retrieve all questions
async function getAllQuestions() {
    return await new Promise(resolve => {
        resolve([tempQ])
    })
}

// Retrieve a question by ID
async function getQuestionById(id) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

// Update a question by ID
async function updateQuestion(id, data) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

// Delete a question by ID
async function deleteQuestion(id) {
    return await new Promise(resolve => {
        resolve(tempQ)
    })
}

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
