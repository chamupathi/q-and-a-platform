const QuestionService = require('../../services/question-service');
const AirtableStore = require('../../datastore/air-table-store');

jest.mock('../../datastore/air-table-store');

describe('QuestionService', () => {
  let service;

  beforeEach(() => {
    service = new QuestionService();
    jest.clearAllMocks();
  });

  describe('createQuestion', () => {
    it('should create a question without answer', async () => {
      const question = {
        question: 'Test question?',
        createdBy: 'test@example.com',
      };

      AirtableStore.prototype.create.mockResolvedValue({
        id: '1',
        fields: question,
      });

      const result = await service.createQuestion(question);

      expect(AirtableStore.prototype.create).toHaveBeenCalledWith(question);
      expect(result).toEqual({
        id: '1',
        fields: question,
      });
    });

    it('should create a question with answer', async () => {
      const question = {
        question: 'Test question?',
        answer: 'Test answer',
        createdBy: 'test@example.com',
      };

      AirtableStore.prototype.create.mockResolvedValueOnce({
        id: '1',
        fields: question,
      });

      const result = await service.createQuestion(question);

      expect(AirtableStore.prototype.create).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: '1',
        fields: question,
      });
    });
  });

  describe('getAllQuestions', () => {
    it('should retrieve all questions', async () => {
      const search = [];
      const size = 10;
      const expectedQuestions = [
        {
          id: '1',
          fields: { question: 'Q 1', createdBy: 'user1@example.com' },
        },
        {
          id: '2',
          fields: { question: 'Q 2', createdBy: 'user2@example.com' },
        },
      ];

      AirtableStore.prototype.getAll.mockResolvedValue(expectedQuestions);

      const result = await service.getAllQuestions(search, size);

      expect(AirtableStore.prototype.getAll).toHaveBeenCalledWith(search, size);
      expect(result).toEqual(expectedQuestions);
    });
  });

  describe('getQuestionById', () => {
    it('should retrieve a question by ID', async () => {
      const questionId = '1';
      const expectedQuestion = {
        id: '1',
        fields: { question: 'Q 1', createdBy: 'user1@example.com' },
      };

      AirtableStore.prototype.get.mockResolvedValue(expectedQuestion);

      const result = await service.getQuestionById(questionId);

      expect(AirtableStore.prototype.get).toHaveBeenCalledWith(questionId);
      expect(result).toEqual(expectedQuestion);
    });
  });

  describe('getQuestionAnswersById', () => {
    it('should retrieve answers for a question by ID', async () => {
      const questionId = '1';
      const expectedAnswers = [
        {
          id: '1',
          fields: {
            content: 'Answer 1',
            createdBy: 'user1@example.com',
            questionId: '1',
          },
        },
        {
          id: '2',
          fields: {
            content: 'Answer 2',
            createdBy: 'user2@example.com',
            questionId: '1',
          },
        },
      ];

      AirtableStore.prototype.getAll.mockResolvedValue(expectedAnswers);

      const result = await service.getQuestionAnswersById(questionId);

      expect(AirtableStore.prototype.getAll).toHaveBeenCalledWith([
        { type: 'text', field: 'questionId', term: questionId },
      ]);
      expect(result).toEqual(expectedAnswers);
    });
  });

  describe('updateQuestion', () => {
    it('should update a question without answer', async () => {
      const questionId = '1';
      const updateData = {
        question: 'Updated question?',
        createdBy: 'test@example.com',
      };

      AirtableStore.prototype.update.mockResolvedValue({
        id: questionId,
        fields: updateData,
      });

      const result = await service.updateQuestion(questionId, updateData);

      expect(AirtableStore.prototype.update).toHaveBeenCalledWith(
        questionId,
        updateData
      );
      expect(result).toEqual({
        id: questionId,
        fields: updateData,
      });
    });

    it('should update a question with answer', async () => {
      const questionId = '1';
      const updateData = {
        question: 'Updated question?',
        answer: 'Updated answer',
      };

      AirtableStore.prototype.update.mockResolvedValue({
        id: questionId,
        fields: updateData,
      });

      AirtableStore.prototype.create.mockResolvedValue({
        id: '2',
        fields: {
          content: updateData.answer,
          createdBy: updateData.createdBy,
          questionId: questionId,
        },
      });

      const result = await service.updateQuestion(questionId, updateData);

      expect(AirtableStore.prototype.update).toHaveBeenCalledWith(
        questionId,
        updateData
      );
      expect(AirtableStore.prototype.create).toHaveBeenCalledWith({
        content: updateData.answer,
        createdBy: updateData.createdBy,
        questionId: questionId,
      });
      expect(result).toEqual({
        id: questionId,
        fields: updateData,
      });
    });
  });

  describe('deleteQuestion', () => {
    it('should delete a question', async () => {
      const questionId = '1';

      AirtableStore.prototype.delete.mockResolvedValue(questionId);

      const result = await service.deleteQuestion(questionId);

      expect(AirtableStore.prototype.delete).toHaveBeenCalledWith(questionId);
      expect(result).toEqual(questionId);
    });
  });
});
