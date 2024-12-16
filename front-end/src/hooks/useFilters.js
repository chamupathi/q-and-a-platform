import { useState } from "react";
import useDebouncedValue from "./useDebouncedValue";

const useFilters = () => {
    const [searchText, setSearchText] = useState('');
    const [assignee, setAssignee] = useState('');
    const [tags, setTags] = useState([]);
    const debouncedText = useDebouncedValue(searchText);
    const debouncedAssignee = useDebouncedValue(assignee);


    return {
        filters: {
            searchText: debouncedText,
            assignee: debouncedAssignee,
            tags,
        }, setSearchText, setAssignee, setTags
    }
}

export default useFilters;