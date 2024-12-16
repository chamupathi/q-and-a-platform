const QuestionController = require('../../controllers/questions-controller');
const QuestionService = require('../../services/question-service');

jest.mock('../../services/question-service');

describe('QuestionController', () => {
  let controller;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    controller = new QuestionController();
    mockReq = {
      body: {},
      params: {},
      query: {},
      _userInfo: { email: 'test@example.com' },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createQuestion', () => {
    it('should create a question successfully', async () => {
      const questionData = {
        companyId: 1234,
        question: 'Test question?',
        answer: 'Test answer',
        createdBy: 'test@example.com',
      };

      mockReq.body = questionData;

      QuestionService.prototype.createQuestion.mockResolvedValue({
        id: '1',
        fields: questionData,
      });

      await controller.createQuestion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          fields: expect.objectContaining(questionData),
        })
      );
    });

    it('should return 400 for invalid input', async () => {
      mockReq.body = {
        answer: 'Test answer',
      };

      await controller.createQuestion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      });
    });
  });

  describe('getQuestionById', () => {
    it('should get a question by id successfully', async () => {
      const questionId = '1';
      const questionData = {
        id: questionId,
        fields: {
          question: 'Test question?',
          answer: 'Test answer',
        },
      };

      mockReq.params = { id: questionId };

      QuestionService.prototype.getQuestionById.mockResolvedValue(questionData);

      await controller.getQuestionById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(questionData);
    });

    it('should return 404 when question not found', async () => {
      mockReq.params = { id: '999' };

      QuestionService.prototype.getQuestionById.mockResolvedValue(null);

      await controller.getQuestionById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Question not found',
      });
    });
  });

  describe('getQuestionAnswersById', () => {
    it('should get question answers by id successfully', async () => {
      const questionId = '1';
      const answersData = [
        {
          id: '1',
          fields: {
            content: 'Answer 1',
            questionId: questionId,
          },
        },
      ];

      mockReq.params = { id: questionId };

      QuestionService.prototype.getQuestionAnswersById.mockResolvedValue(
        answersData
      );

      await controller.getQuestionAnswersById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(answersData);
    });

    it('should return 404 when question not found', async () => {
      mockReq.params = { id: '999' };

      QuestionService.prototype.getQuestionAnswersById.mockResolvedValue(null);

      await controller.getQuestionAnswersById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Question not found',
      });
    });
  });

  describe('updateQuestion', () => {
    it('should update a question successfully', async () => {
      const questionId = '1';
      const updateData = {
        question: 'Updated question?',
        answer: 'Updated answer',
        updatedBy: 'test@example.com',
      };

      mockReq.params = { id: questionId };
      mockReq.body = updateData;

      QuestionService.prototype.updateQuestion.mockResolvedValue({
        id: questionId,
        fields: updateData,
      });

      await controller.updateQuestion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: questionId,
        fields: updateData,
      });
    });

    it('should return 400 for invalid input', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = {
        question: '',
      };

      await controller.updateQuestion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      });
    });

    it('should return 404 when question not found', async () => {
      mockReq.params = { id: '999' };
      mockReq.body = {
        question: 'Valid question',
        updatedBy: 'test@example.com',
      };

      QuestionService.prototype.updateQuestion.mockResolvedValue(null);

      await controller.updateQuestion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Question not found',
      });
    });
  });
});
