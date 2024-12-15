import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';

const QuestionsTable = ({ rows, loading }) => {
    return <TableContainer component={Paper} sx={{ marginTop: 2, flexGrow: 1 }}>
        {loading && <LinearProgress />}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                <TableRow>
                    <TableCell>
                        <Checkbox inputProps={{ 'aria-label': 'select all rows' }} />
                    </TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell align="left">Answer</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Tags</TableCell>
                    <TableCell align="left">Assigned To</TableCell>
                    <TableCell align="left"></TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>
                            <Checkbox inputProps={{ 'aria-label': `select row ${row.id}` }} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.question}
                        </TableCell>
                        <TableCell>{row.answer}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.tags_list.map(t => <Chip
                            sx={{ mr: 2, mt: 1 }}
                            key={t} label={t} />)}</TableCell>

                        
                        <TableCell>{row.assignee}</TableCell>
                        <TableCell>
                            <IconButton color="primary" aria-label="view record">
                                <VisibilityIcon />
                            </IconButton>
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

    </TableContainer>

}

export default QuestionsTable;