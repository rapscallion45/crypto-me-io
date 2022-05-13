import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const CurrencyDetails = function CurrencyDetails() {
  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            All Cryptocurrencies
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Explore all currently trading cryptocurrencies globally
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <CurrencyTable perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

CurrencyDetails.Layout = Layout;

export default CurrencyDetails;
