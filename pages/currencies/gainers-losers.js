import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const GainersLosers = function GainersLosers() {
  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            Biggest Gainers and Losers
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Largest gainers and losers in the crypto world
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <CurrencyTable orderDataBy="market_cap_desc" perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

GainersLosers.Layout = Layout;

export default GainersLosers;
