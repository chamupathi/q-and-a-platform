const AirtableStore = require("../datastore/airtableStore");
const base = require("../datastore/airtablebase");

class QuestionService {
    constructor() {
        this.questionsStore = new AirtableStore('Questions');
        this.answersStore = new AirtableStore('answer_history');
    }

    async createQuestion(data) {
        if(data.answer) {
            const answerRes = await this.answersStore.create({
                content: data.answer
            })

            data.answer_history =  [answerRes.id];
        }
        const res = await this.questionsStore.create(data);

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    async getAllQuestions() {
        const data = await this.questionsStore.getAll();

        return await new Promise(resolve => {
            resolve([...data])
        })
    }

    // Retrieve a question by ID
    async getQuestionById(id) {
        const data = await this.questionsStore.get(id);

        return await new Promise(resolve => {
            resolve(data)
        })
    }

    // Update a question by ID
    async updateQuestion(id, data) {
        if(data.answer) {
            const answerRes = await this.answersStore.create({
                content: data.answer
            })

            const q = await this.getQuestionById(id);
            data.answer_history = [...(q.fields.answer_history ?? []), answerRes.id] 
        }

        const res = await this.questionsStore.update(id, data);

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    // Delete a question by ID
    async deleteQuestion(id) {
        const res = await this.questionsStore.delete(id);

        return await new Promise(resolve => {
            resolve(res)
        })
    }
}
// // Create a new question
// async function createQuestion(data) {
//     const a = new AirtableStore('Questions');
//     const res = await a.create(data);

//     return await new Promise(resolve => {
//         resolve([...Object.keys(res)])
//     })

// }

// Retrieve all questions


module.exports = QuestionService;
