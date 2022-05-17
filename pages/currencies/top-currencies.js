import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const TopCurrencies = function TopCurrencies() {
  return (
    <Page title="CryptoMe.io | Top Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            CryptoMe Top Currencies
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Explore the highest ranked trading crypto currencies currently
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <CurrencyTable orderDataBy="gecko_desc" perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

TopCurrencies.Layout = Layout;

export default TopCurrencies;
