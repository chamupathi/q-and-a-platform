import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import QuestionFormModal from './question-form-modal';
import { useDashboardContext } from '../providers/dashboard-data-provider';


const SecondaryHeader = () => {

  const { fetchQuestions } = useDashboardContext();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 0, paddingTop: 2 }}>
      <Box sx={{flexGrow: 1}}/>

      <Button variant='outlined' onClick={() => setCreateModalOpen(true)}>Create</Button>
      <QuestionFormModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} fetchQuestions={fetchQuestions} />
    </Box>
  );
}

export default SecondaryHeader
