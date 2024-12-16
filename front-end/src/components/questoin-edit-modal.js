import React from 'react';
import { useDashboardContext } from '../providers/dashboard-data-provider';
import QuestionFormModal from './question-form-modal';
import useQuestion from '../hooks/useQuestion';
import { useGlobalContext } from '../providers/global-provider';

const QuestionEditModal = () => {
  const {
    fetchQuestions,
    singleQuestion: { editModalOpen, setEditModalOpen },
    selectedQuestion,
    setSelectedQuestion,
  } = useDashboardContext();

  const { data, loading } = useQuestion(
    editModalOpen ? selectedQuestion : null
  );

  const { tags, properties } = useGlobalContext();

  const questionTagIds = data?.fields?.tags || [];
  const mappedTags = tags.filter(t => questionTagIds.some(tid => t.id === tid));

  const handleClose = () => {
    setSelectedQuestion(null);
    setEditModalOpen(false);
  };

  return (
    !loading &&
    data?.fields && (
      <QuestionFormModal
        open={editModalOpen}
        onClose={handleClose}
        fetchQuestions={fetchQuestions}
        data={{
          ...data?.fields,
          tags: mappedTags,
        }}
        id={data.id}
        isEdit
      />
    )
  );
};

export default QuestionEditModal;
