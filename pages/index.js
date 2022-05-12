import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Hero from '../components/hero';
import Page from '../components/page';
import CurrencyCarousel from '../components/currency-carousel';
import CurrencyTable from '../components/currency-table';
import Layout from '../layouts/Layout/layout';

const Index = function Index() {
  return (
    <Page title="CryptoMe.io | Home">
      <Container disableGutters maxWidth="lg">
        <Box
          mt={5}
          mb={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Hero />
        </Box>
        <Box mt={12} mb={12}>
          <CurrencyCarousel />
        </Box>
        <Box mt={12} mb={12}>
          <CurrencyTable />
        </Box>
      </Container>
    </Page>
  );
};

Index.Layout = Layout;

export default Index;
