import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Hero from '../components/hero';
import Page from '../components/page';
import CurrencyCarousel from '../components/currency-carousel';
import Layout from '../layouts/Layout/layout';

const Index = function Index() {
  return (
    <Page title="CryptoMe.io | Home">
      <Container maxWidth="lg">
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
        <CurrencyCarousel />
      </Container>
    </Page>
  );
};

Index.Layout = Layout;

export default Index;
