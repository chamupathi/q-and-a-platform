import TextField from '@mui/material/TextField';

const VTextInput = ({ label, form, errors, fieldName, handleChange, ...rest }) => {
    return <TextField
        {...rest}
        fullWidth
        margin="normal"
        label={label}
        value={form[fieldName]}
        onChange={handleChange(fieldName)}
        error={!!errors[fieldName]}
        helperText={errors[fieldName]}
    />
}

export default VTextInput;