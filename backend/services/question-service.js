const AirtableStore = require("../datastore/air-table-store");
const base = require("../datastore/airtable-base");

class QuestionService {
    constructor() {
        this.questionsStore = new AirtableStore('Questions');
        this.answersStore = new AirtableStore('answer_history');
    }

    async createQuestion(data) {
        
        const res = await this.questionsStore.create(data);

        if (data.answer) {
            const answerRes = await this.answersStore.create({
                content: data.answer,
                createdBy: data.createdBy,
                questionId : res.id
            })

            // data.answer_history = [answerRes.id];
        }

        return await new Promise(resolve => {
            resolve(res)
        })
    }

    async getAllQuestions(search = [], size) {
        const data = await this.questionsStore.getAll(
            search, size
        );

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

    async getQuestionAnswersById(id) {
        return await this.answersStore.getAll(
            [{ type:'text', field: 'questionId', term: id}]
        );
    }

    // Update a question by ID
    async updateQuestion(id, data) {
        if (data.answer) {
            const answerRes = await this.answersStore.create({
                content: data.answer,
                createdBy : data.updatedBy,
                questionId : id,
            })

            const q = await this.getQuestionById(id);
            data.answer_history = [...(q.fields.answer_history ?? []), answerRes.id]
        }

        return await this.questionsStore.update(id, data);
    }

    // Delete a question by ID
    async deleteQuestion(id) {
        return await this.questionsStore.delete(id);
    }
}

module.exports = QuestionService;
