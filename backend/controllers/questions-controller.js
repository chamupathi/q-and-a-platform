const QuestionService = require('../services/question-service');
const queryToSearch = require('./helpers/query-to-search');
const createQuestionSchema = require('./validators/create-question.schema');
const updateQuestionSchema = require('./validators/update-question.schema');

const DEFAULT_COMP_ID = '1234';
class QuestionController {

    constructor() {
        this.service = new QuestionService();

        this.createQuestion = this.createQuestion.bind(this)
        this.getAllQuestions = this.getAllQuestions.bind(this)
        this.getQuestionById = this.getQuestionById.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.deleteQuestion = this.deleteQuestion.bind(this)
        this.getQuestionAnswersById = this.getQuestionAnswersById.bind(this)
    }

    // Create a new question
    async createQuestion(req, res) {
        const data = req.body;

        data.companyId = DEFAULT_COMP_ID;

        // get user email from authenticated user
        data.createdBy = req._userInfo.email;

        const { error } = createQuestionSchema.validate(data, { abortEarly: false });
        if (error) {
            // Send validation errors to the client
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }

        try {
            const question = await this.service.createQuestion(data);
            res.status(201).json(question);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to create question' });
        }
    }

    // Get all questions
    async getAllQuestions(req, res) {

        const search = queryToSearch(req.query);
        const size = req.query.size;
        
        try {
            const questions = await this.service.getAllQuestions(search, size);
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve questions' });
        }
    }

    // Get a question by ID
    async getQuestionById(req, res) {
        try {
            const id = req.params.id;
            const question = await this.service.getQuestionById(id);
            if (!question) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve question' });
        }
    }

     // Get a question by ID
     async getQuestionAnswersById(req, res) {
        try {
            const id = req.params.id;
            const question = await this.service.getQuestionAnswersById(id);
            if (!question) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json(question);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to retrieve question' });
        }
    }

    // Update a question by ID
    async updateQuestion(req, res) {
        const data = req.body;
        data.updatedBy = req._userInfo.email;

        const { error } = updateQuestionSchema.validate(data, { abortEarly: false });
        if (error) {
            // Send validation errors to the client
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }

        try {
            const id = req.params.id;
            const data = req.body;
            const updatedQuestion = await this.service.updateQuestion(id, data);
            if (!updatedQuestion)
                return res.status(404).json({ error: 'Question not found' });
            res.status(200).json(updatedQuestion);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update question' });
        }
    }

    // Delete a question by ID
    async deleteQuestion(req, res) {
        try {
            const id = req.params.id;
            const deletedQuestion = await this.service.deleteQuestion(id);
            if (!deletedQuestion)
                return res.status(404).json({ error: 'Question not found' });
            res.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete question' });
        }
    }

}

module.exports = QuestionController;