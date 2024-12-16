import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { questionAssignSchema } from '../schemas/question-assign.schema';
import { useAuth0 } from '@auth0/auth0-react';

import config from '../config.json'
import { useDashboardContext } from '../providers/dashboard-data-provider';
import { CircularProgress } from '@mui/material';
import modalBase from './styles/modal-styles';


const MultiAssignModal = ({ open, onClose, ids = [] }) => {
  const [assignee, setAssignee] = useState('');
  const [errors, setErrors] = useState({});
  const [sumbitting, setSumbitting] = useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const { fetchQuestions } = useDashboardContext();


  const validate = () => {
    const d = {
      assignee: assignee
    }

    const { error } = questionAssignSchema.validate(d, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setSumbitting(true);

    try {
      const token = await getAccessTokenSilently();

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`)
      headers.append("Content-Type", "application/json");

      const body = {
        assignee: assignee
      }

      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const response = await fetch(`${config.baseUrl}/questions/${id}`, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }

      
      setAssignee('')

      alert("submit success");
      onClose();
    } catch (error) {
      alert("submit failed");
    } finally {
      setSumbitting(false)
      fetchQuestions();
    }

    setErrors({});
  };

  return (
    <Modal open={open} onClose={onClose}>
  
      <Box sx={{...modalBase, width: 400}}>
        <Typography variant="h6" gutterBottom>
          Assign question(s)
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Assignee email"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          error={!!errors.assignee}
          helperText={errors.assignee}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={onClose} variant="outlined" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={sumbitting}>
            Submit {sumbitting ? <CircularProgress size={16} color='white' sx={{ ml: 2 }} /> : null}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default MultiAssignModal;
