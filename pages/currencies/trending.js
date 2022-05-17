import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/page';
import CurrencyList from '../../components/currency-list';
import Loader from '../../components/loader';
import Layout from '../../layouts/Layout/layout';
import currencyActions from '../../redux/actions/actions';

const Trending = function Trending() {
  const dispatch = useDispatch();
  const { data, loading, loaded, error } = useSelector((state) => state.trendingCurrencies);

  useEffect(() => {
    dispatch(currencyActions.getTrendingCurrencies());
  }, []);

  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            Trending Currencies
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Currently trending currencies based on user searches over the past 24 hours
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <Loader
            dataLoading={loading}
            dataLoaded={loaded}
            dataError={error}
            loadingText="Loading trending currencies"
            errorText="Failed to load trending currencies."
            color="secondary"
          >
            <CurrencyList items={data?.coins} />
          </Loader>
        </Box>
      </Container>
    </Page>
  );
};

Trending.Layout = Layout;

export default Trending;
