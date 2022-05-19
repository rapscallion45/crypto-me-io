import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const GlobalCharts = function GlobalCharts() {
  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            Cryptocurrency Global Data
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Global market data for all trading cryptocurrencies
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <CurrencyTable orderDataBy="market_cap_desc" perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

GlobalCharts.Layout = Layout;

export default GlobalCharts;
