import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditAttributesIcon from '@mui/icons-material/Edit';

import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { useDashboardContext } from '../providers/dashboard-data-provider';
import { memo, useState } from 'react';
import { Button } from '@mui/material';
import MultiAssignModal from './multi-assign-form-modal';


const MemoizedQuestionsTable = memo(({ rows, loading, onHistoryButtonClick, onEditButtonClick }) => {

    const [selectedIds, setSelectedIds] = useState(new Set());
    const [openMutiAssignModal, setOpenMutiAssignModal] = useState(false);

    const handleCheckBoxChange = (id) => (e) => {
        const checked = e.target.checked;

        const ids = new Set([...selectedIds]);

        if (checked) {
            ids.add(id);
        } else {
            ids.delete(id)
        }

        setSelectedIds(ids)
    }

    const handleAllCheckBoxChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedIds(new Set(rows.map(r => r.id)))
        } else {
            setSelectedIds(new Set())
        }
    }

    return <TableContainer component={Paper} sx={{ marginTop: 2, flexGrow: 1, }}>
        {loading && <LinearProgress />}
        <Table sx={{ minWidth: 650,  }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                <TableRow>
                    <TableCell >
                        <Checkbox inputProps={{ 'aria-label': 'select all rows' }} onChange={handleAllCheckBoxChange} />
                    </TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell align="left">Answer</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Tags</TableCell>
                    <TableCell align="left">Assigned To</TableCell>
                    <TableCell align="left">{selectedIds.size ? <Button variant='outlined' onClick={() => setOpenMutiAssignModal(true)}>Assign</Button> : null}</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>
                            <Checkbox checked={selectedIds.has(row.id)} inputProps={{ 'aria-label': `select row ${row.id}` }} onChange={handleCheckBoxChange(row.id)} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.question}
                        </TableCell>
                        <TableCell>{row.answer}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row?.tags_list?.map(t => <Chip
                            sx={{ mr: 2, mt: 1 }}
                            key={t} label={t} />)}</TableCell>
                        <TableCell>{row.assignee}</TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <IconButton color="primary" aria-label="view record" onClick={() => {
                                    onHistoryButtonClick(row.id)
                                }}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="view record" onClick={() => {
                                    onEditButtonClick(row.id)
                                }}>
                                    <EditAttributesIcon />
                                </IconButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {!loading && rows.length == 0 ? <Box sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 4
        }}>
            <Typography variant='body1'>No data found for the selection</Typography>
        </Box> : null}
        <MultiAssignModal open={openMutiAssignModal} onClose={() => { setOpenMutiAssignModal(false) }} ids={[...selectedIds]}/>
    </TableContainer>
})

const QuestionsTable = () => {
    const { data: rows, loading, setSelectedQuestion, singleQuestion: { setHistoryModalOpen, setEditModalOpen } } = useDashboardContext();

    const handleHistoryButtonClick = (id) => {
        setSelectedQuestion(id)
        setHistoryModalOpen(true)
    }

    const handleEditButtonClick = (id) => {
        setSelectedQuestion(id)
        setEditModalOpen(true)
    }

    return <MemoizedQuestionsTable rows={rows} loading={loading} onHistoryButtonClick={handleHistoryButtonClick} onEditButtonClick={handleEditButtonClick} />
};

export default QuestionsTable;