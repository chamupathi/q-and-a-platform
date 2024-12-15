import React from 'react';
import Layout from '../components/layout';
import QuestionsTable from '../components/questions-table';
import { Box } from '@mui/material';
import FilterInputs from '../components/filter-inputs';
import useFilters from '../hooks/useFilters';
import useQuestionData from '../hooks/useQuestionData';
import InfoBar from '../components/info-bar';

function Dashboard() {
    const { filters: { searchText, assignee, tags }, setSearchText, setAssignee, setTags } = useFilters();

    const { data, loading } = useQuestionData({ tags, searchText, assignee })
    return (
        <Layout>
            <Box sx={{ pl: 5, pr: 5, maxWidth: 1600, margin: '0 auto', mt: 2 }}>
                <InfoBar />
                <FilterInputs setSearchText={setSearchText} setAssignee={setAssignee} onTagsChange={setTags} />
                <QuestionsTable rows={[
                    ...data,
                ]} loading={loading} />
            </Box>
        </Layout>
    );
}

export default Dashboard;
