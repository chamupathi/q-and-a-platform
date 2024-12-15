const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

// Define routes for /questions
router.post('/', questionController.createQuestion); // Create a question
router.get('/', questionController.getAllQuestions); // Get all questions
router.get('/:id', questionController.getQuestionById); // Get a question by ID
router.put('/:id', questionController.updateQuestion); // Update a question
router.delete('/:id', questionController.deleteQuestion); // Delete a question

module.exports = router;
