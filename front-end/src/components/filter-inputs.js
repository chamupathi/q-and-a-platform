import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useGlobalContext } from '../providers/global-provider';

const FilterInputs = ({setSearchText, setAssignee, onTagsChange}) => {
  const { tags } = useGlobalContext();

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 0, paddingTop: 2 }}>
      {/* Tags Filter */}
      <Autocomplete
        multiple
        options={tags}
        getOptionLabel={(option) => option.name} // Display value in dropdown
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} label="Tags" variant="outlined" />
        )}
        sx={{ minWidth: 200, flex: 3 }}
        onChange={(event, newInputValue) => {
          onTagsChange(newInputValue)
        }}
      />

      {/* Text Filter */}
      <TextField
        label="Search.."
        variant="outlined"
        sx={{ flexGrow: 2 }}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Assignee Filter */}
      <TextField
        label="Assignee"
        variant="outlined"
        sx={{ minWidth: 200, flexGrow: 1 }}
        onChange={(e) => setAssignee(e.target.value)}
      />

    </Box>
  );
}

export default FilterInputs
