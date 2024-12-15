const express = require('express');

const QuestionController = require('../controllers/questions-controller');

const router = express.Router();

const controller = new QuestionController();

// Define routes for /questions
router.post('/', controller.createQuestion); // Create a question
router.get('/', controller.getAllQuestions); // Get all questions
router.get('/:id', controller.getQuestionById); // Get a question by ID
router.get('/:id/_answers', controller.getQuestionAnswersById); // Get a question by ID
router.patch('/:id', controller.updateQuestion); // Update a question
router.delete('/:id', controller.deleteQuestion); // Delete a question

module.exports = router;
