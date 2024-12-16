import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useGlobalContext } from '../../providers/global-provider';
import { useAuth0 } from '@auth0/auth0-react';

import config from "../../config.json"


const TagsInput = ({ form, setForm, errors, setSumbitting }) => {
    const { getAccessTokenSilently } = useAuth0();
    const { tags, fetchTags } = useGlobalContext();


    const handleAddTag = async (name) => {
        setSumbitting(true);

        const token = await getAccessTokenSilently();

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`)
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                name,
            }),
        };

        try {
            const response = await fetch(`${config.baseUrl}/tags`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchTags()
            return await response.json()
        } catch (error) {
            console.error(error)
            alert("creating tag failed");
        } finally {
            setSumbitting(false)
        }
    }

    return (
        <Autocomplete
            multiple
            freeSolo
            options={tags}
            
            getOptionLabel={(option) => option.name} // Display value in dropdown
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={async (event, value) => {
                const newItem = value[value.length - 1]

                if (typeof newItem === 'string') {
                    try {
                        const newTag = await handleAddTag(newItem)
                        value[value.length - 1] = { name: newItem, id: newTag.id }
                    } catch (error) {
                        // TODO handle thies error
                    }
                }

                setForm((prev) => ({ ...prev, tags: value }))
            }}
            value={form.tags}
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
    );
}

export default TagsInput;