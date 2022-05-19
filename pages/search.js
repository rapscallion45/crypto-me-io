import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Page from '../components/page';
import CurrencyList from '../components/currency-list';
import Loader from '../components/loader';
import Layout from '../layouts/Layout/layout';

const Search = function Search() {
  const router = useRouter();
  const { searching, complete, error, term, data } = useSelector((state) => state.search);

  return (
    <Page title="CryptoMe.io | Search Results">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4} mx={2}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            Search Results
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            {`Cryptocurrency results matching: "${term || ''}"`}
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <Loader
            dataLoading={searching}
            dataLoaded={complete}
            dataError={error}
            loadingText="Searching currencies..."
            errorText="Could not load results."
            color="secondary"
          >
            <CurrencyList items={data?.coins} />
          </Loader>
        </Box>
        <Box display="flex" justifyContent="center" mt={2} mb={12}>
          <Button variant="contained" onClick={() => router.back()}>
            Go Back
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

Search.Layout = Layout;

export default Search;
