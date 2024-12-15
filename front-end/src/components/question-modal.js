import React, { useState } from 'react';
import Joi from 'joi';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import { useGlobalContext } from '../providers/global-provider';

const schema = Joi.object({
    question: Joi.string().trim().required().label('Question'),
    answer: Joi.string().trim().optional().label('Answer'),
    assignedTo: Joi.string().email({ tlds: false }).allow(null).optional().label('Assigned To'),
    properties: Joi.array().items(Joi.string().optional()).optional().label('Properties'),
    tags: Joi.array().items(Joi.string().optional()).optional().label('Tags'),
    description: Joi.string().optional().label('Description'),
});

const QuestionModal = ({ open, onClose }) => {
    const { tags, properties } = useGlobalContext();
    const [form, setForm] = useState({
        question: '',
        answer: '',
        assignedTo: '',
        properties: [],
        tags: [],
        description: '',
    });

    const [errors, setErrors] = useState({});

    //   const [errors, setErrors] = useState({});



    const validate = () => {
        const { error } = schema.validate(form, { abortEarly: false });
        if (!error) return null;

        const validationErrors = {};
        for (let item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }
        return validationErrors;
    };

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        console.log('Form submitted:', form);
        onClose();
    };


    const theme = useTheme();

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Create Question
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Question"
                    required
                    value={form.question}
                    onChange={handleChange('question')}
                    error={!!errors.question}
                    helperText={errors.question}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Answer"
                    value={form.answer}
                    onChange={handleChange('answer')}
                    error={!!errors.answer}
                    helperText={errors.answer}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Assigned To"
                    value={form.assignedTo}
                    onChange={handleChange('assignedTo')}
                    error={!!errors.assignedTo}
                    helperText={errors.assignedTo}
                />
                <Autocomplete
                disabled
                    multiple
                    options={properties}
                    getOptionLabel={(option) => `${option.property_key_text}-${option.property_value}`} // Display value in dropdown
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, value) => {
                        setForm((prev) => ({ ...prev, tags: value.map(v => v.id) }))}
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Properties"
                            margin="normal"
                            error={!!errors.properties}
                            helperText={errors.properties}
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option.name} // Display value in dropdown
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, value) => {
                        
                        setForm((prev) => ({ ...prev, tags: value.map(v => v.id) }))}
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            margin="normal"
                            error={!!errors.tags}
                            helperText={errors.tags}
                        />
                    )}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={handleChange('description')}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button onClick={onClose} color="secondary" sx={{ marginRight: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default QuestionModal;