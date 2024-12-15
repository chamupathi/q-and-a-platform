import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../components/layout';

const Welome = () => <Layout>
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            height: '100%',
            flexDirection: 'column'
        }}
    >
        <Typography variant="h3">
            Welcome to "Answer Mate"!
        </Typography>
    </Box>
</Layout>

export default Welome;