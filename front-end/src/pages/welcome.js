import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../components/layout';

const Welome = ({ hideSubTitle }) => (
  <Layout>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3">Welcome to "Answer Mate"!</Typography>
      {!hideSubTitle ? (
        <Typography variant="h5" sx={{ mt: 2 }}>
          Sign in to continue!
        </Typography>
      ) : null}
    </Box>
  </Layout>
);

export default Welome;
