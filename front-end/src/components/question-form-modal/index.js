import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useAuth0 } from '@auth0/auth0-react';

import config from '../../config.json';

import ModalOverlay from '../loading-modal-overlay';
import VTextInput from '../inputs/VTextinput';
import { questionSchema } from '../../schemas/question.schema';
import TagsInput from './tags-input';
import modalBase from '../styles/modal-styles';

const initFormState = {
  question: '',
  answer: '',
  assignee: '',
  properties: [],
  tags: [],
  description: '',
};

const QuestionFormModal = ({
  open,
  onClose,
  fetchQuestions,
  data = initFormState,
  isEdit = false,
  id,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [form, setForm] = useState(data);

  const [errors, setErrors] = useState({});
  const [sumbitting, setSumbitting] = useState(false);

  const validate = () => {
    const d = {
      question: form.question,
      properties: form.properties,
      answer: form.answer,
      description: form.description,
      assignee: form.assignee,
    };

    d.tags = form.tags.map(t => t.id);
    const { error } = questionSchema.validate(d, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleChange = field => event => {
    const value = event.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
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
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const body = {
        question: form.question,
        properties: form.properties,
        tags: form.tags.map(t => t.id),
        answer: form.answer,
        description: form.description,
        assignee: form.assignee,
      };

      if (isEdit) {
        // do not need to submit the keys that aren't changed
        config.questionKeys.forEach(k => {
          if (data[k] === body[k]) {
            delete body[k];
          }
        });
      }

      const requestOptions = {
        method: isEdit ? 'PATCH' : 'POST',
        headers: headers,
        body: JSON.stringify(body),
      };

      const path = isEdit ? `/${id}` : '';

      const response = await fetch(
        `${config.baseUrl}/questions${path}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchQuestions();
      if (!isEdit) setForm(initFormState);
      alert('submit success');
      onClose();
    } catch (error) {
      alert('submit failed');
    } finally {
      setSumbitting(false);
    }

    setErrors({});
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalBase,
          width: 400,
        }}
      >
        {sumbitting && <ModalOverlay />}
        <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit' : 'Create'} Question
        </Typography>

        <VTextInput
          label="Question"
          fieldName="question"
          handleChange={handleChange}
          errors={errors}
          form={form}
          multiline
          rows={3}
        />
        <VTextInput
          label="Answer"
          fieldName="answer"
          handleChange={handleChange}
          errors={errors}
          form={form}
          multiline
          rows={3}
        />
        <VTextInput
          label="Assigned To"
          fieldName="assignee"
          handleChange={handleChange}
          errors={errors}
          form={form}
        />

        {/* TODO Implement multy properties input */}

        <TagsInput
          form={form}
          setForm={setForm}
          errors={errors}
          setSumbitting={setSumbitting}
        />

        <VTextInput
          label="Description"
          fieldName="description"
          handleChange={handleChange}
          errors={errors}
          form={form}
          multiline
          rows={2}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={onClose} variant="outlined" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default QuestionFormModal;
