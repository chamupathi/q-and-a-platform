const questionService = require('../services/questionService');

// Create a new question
async function createQuestion(req, res) {
  try {
    const data = req.body;
    const question = await questionService.createQuestion(data);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
}

// Get all questions
async function getAllQuestions(req, res) {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
}

// Get a question by ID
async function getQuestionById(req, res) {
  try {
    const id = req.params.id;
    const question = await questionService.getQuestionById(id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve question' });
  }
}

// Update a question by ID
async function updateQuestion(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedQuestion = await questionService.updateQuestion(id, data);
    if (!updatedQuestion)
      return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
}

// Delete a question by ID
async function deleteQuestion(req, res) {
  try {
    const id = req.params.id;
    const deletedQuestion = await questionService.deleteQuestion(id);
    if (!deletedQuestion)
      return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
