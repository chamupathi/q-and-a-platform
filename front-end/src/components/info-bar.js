import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import QuestionModal from './question-modal';


const InfoBar = () => {

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 0, paddingTop: 2 }}>
      <Box sx={{flexGrow: 1}}/>

      <Button variant='outlined' onClick={() => setCreateModalOpen(true)}>Create</Button>
      <QuestionModal open={createModalOpen} onClose={() => setCreateModalOpen(false)}/>
    </Box>
  );
}

export default InfoBar
