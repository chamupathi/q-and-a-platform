import React, { createContext, useContext, useState } from 'react';
import useFilters from '../hooks/useFilters';
import useQuestionData from '../hooks/useQuestionData';

const DashboardContext = createContext();

export const DashboardDataProvider = ({ children }) => {

  const { filters: { searchText, assignee, tags }, setSearchText, setAssignee, setTags } = useFilters();

  const { data, loading, fetchData: fetchQuestions } = useQuestionData({ tags, searchText, assignee, });

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <DashboardContext.Provider value={{
      searchText, assignee, tags, data, loading,
      fetchQuestions, setSearchText, setAssignee, setTags,
      selectedQuestion, setSelectedQuestion,
      singleQuestion : { historyModalOpen, setHistoryModalOpen, editModalOpen, setEditModalOpen }
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
