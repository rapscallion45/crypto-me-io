import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const HighVolume = function HighVolume() {
  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            Highest Trading Volume Currencies
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Top currencies by trading volume over the last 24 hours
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <CurrencyTable orderDataBy="volume_desc" perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

HighVolume.Layout = Layout;

export default HighVolume;
