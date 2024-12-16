import React from 'react';
import Layout from '../components/layout';
import QuestionsTable from '../components/questions-table';
import { Box } from '@mui/material';
import FilterInputs from '../components/filter-inputs';
import SecondaryHeader from '../components/secondary-header';
import QuestionHistoryModal from '../components/questoin-history-modal';
import { DashboardDataProvider } from '../providers/dashboard-data-provider';
import QuestionEditModal from '../components/questoin-edit-modal';

function Dashboard() {
  return (
    <DashboardDataProvider>
      <Layout>
        <Box sx={{ pl: 5, pr: 5, maxWidth: 1600, margin: '0 auto', mt: 2 }}>
          <SecondaryHeader />
          <FilterInputs />

          <QuestionsTable />
          <QuestionHistoryModal />
          <QuestionEditModal />
        </Box>
      </Layout>
    </DashboardDataProvider>
  );
}

export default Dashboard;
