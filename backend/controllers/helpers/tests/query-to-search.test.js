const queryToSearch = require('../query-to-search');

describe('queryToSearch', () => {
  it('should convert searchText into search queries for question, answer, and description fields', () => {
    const query = { searchText: 'test' };
    const expected = [
      { type: 'text', field: 'question', term: 'test' },
      { type: 'text', field: 'answer', term: 'test' },
      { type: 'text', field: 'description', term: 'test' },
    ];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert assignee into a search query', () => {
    const query = { assignee: 'user@example.com' };
    const expected = [{ type: 'text', field: 'assignee', term: 'user@example.com' }];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert question into a search query', () => {
    const query = { question: 'What is Docker?' };
    const expected = [{ type: 'text', field: 'question', term: 'What is Docker?' }];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert answer into a search query', () => {
    const query = { answer: 'Docker is a containerization platform.' };
    const expected = [{ type: 'text', field: 'answer', term: 'Docker is a containerization platform.' }];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert tags into multiple search queries for tags_list field', () => {
    const query = { tags: 'node,docker,express' };
    const expected = [
      { type: 'array', field: 'tags_list', term: 'node' },
      { type: 'array', field: 'tags_list', term: 'docker' },
      { type: 'array', field: 'tags_list', term: 'express' },
    ];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert property_key into a search query', () => {
    const query = { property_key: 'difficulty' };
    const expected = [{ type: 'array', field: 'property_key', term: 'difficulty' }];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should convert property_value into a search query', () => {
    const query = { property_value: 'easy' };
    const expected = [{ type: 'array', field: 'property_value', term: 'easy' }];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should handle multiple keys in the query', () => {
    const query = {
      searchText: 'test',
      assignee: 'user@example.com',
      tags: 'node,docker',
    };
    const expected = [
      { type: 'text', field: 'question', term: 'test' },
      { type: 'text', field: 'answer', term: 'test' },
      { type: 'text', field: 'description', term: 'test' },
      { type: 'text', field: 'assignee', term: 'user@example.com' },
      { type: 'array', field: 'tags_list', term: 'node' },
      { type: 'array', field: 'tags_list', term: 'docker' },
    ];
    expect(queryToSearch(query)).toEqual(expected);
  });

  it('should return an empty array for unsupported keys', () => {
    const query = { unsupportedKey: 'value' };
    expect(queryToSearch(query)).toEqual([]);
  });

  it('should return an empty array for an empty query', () => {
    const query = {};
    expect(queryToSearch(query)).toEqual([]);
  });
});
