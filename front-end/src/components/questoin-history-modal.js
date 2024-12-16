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

const QuestionHistoryModal = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        minHeight: '50vh'
    };

    const { singleQuestion: { historyModalOpen, setHistoryModalOpen }, selectedQuestion, setSelectedQuestion } = useDashboardContext();

    const { data, loading } = useQuestionAnswerHistory(selectedQuestion);

    const onClose = () => {
        setHistoryModalOpen(false)
        setSelectedQuestion(null)
    }

    return (
        <Modal open={historyModalOpen} onClose={onClose}>
            <Box sx={style}>

                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ flexGrow: 1 }}>
                        Question History
                    </Typography>
                    <Button
                        variant="outlined"
                        color="text.secondary"
                        onClick={onClose}
                        sx={{ cursor: 'pointer' }}
                    >
                        Close
                    </Button>
                </Box>
                {loading && <LinearProgress />}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Answer</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Updated At</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Updated By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((answer) => (
                                <TableRow key={answer.id}>
                                    <TableCell>{answer.content}</TableCell>
                                    <TableCell>{new Date(answer.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{answer.createdBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
}

export default QuestionHistoryModal;
