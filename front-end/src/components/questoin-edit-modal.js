import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDashboardContext } from '../providers/dashboard-data-provider';
import { Button, LinearProgress } from '@mui/material';
import useQuestionAnswerHistory from '../hooks/useQuestionAnswerHistory';
import QuestionFormModal from './question-form-modal';
import useQuestion from '../hooks/useQuestion';
import { useGlobalContext } from '../providers/global-provider';

const QuestionEditModal = () => {
    const { fetchQuestions, singleQuestion: { editModalOpen, setEditModalOpen }, selectedQuestion, setSelectedQuestion } = useDashboardContext();

    const { data, loading } = useQuestion(selectedQuestion);

    const { tags, properties } = useGlobalContext();

    const questionTagIds = data?.fields?.tags || []
    const mappedTags = tags.filter(t => questionTagIds.some(tid => t.id === tid))

    const handleClose = () => {
        setSelectedQuestion(null)
        setEditModalOpen(false)
    }

    return !loading && data?.fields && <QuestionFormModal open={editModalOpen} onClose={handleClose} fetchQuestions={fetchQuestions}
        data={{
            ...data?.fields,
            tags: mappedTags
        }}
        id={data.id}
        isEdit />
}

export default QuestionEditModal;
