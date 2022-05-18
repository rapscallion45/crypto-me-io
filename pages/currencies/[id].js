import { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import getSymbolFromCurrency from 'currency-symbol-map';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import MuiAlert from '@mui/material/Alert';
import Page from '../../components/page';
import Loader from '../../components/loader';
import CurrencyLinks from '../../components/currency-links';
import MarketCapDetails from '../../components/mkt-cap-details';
import CircSupplyDetails from '../../components/circ-supply-details';
import VolumeDetails from '../../components/volume-details';
import CurrencyCategoryTags from '../../components/currency-category-tags';
import CurrencyBio from '../../components/currency-bio';
import Layout from '../../layouts/Layout/layout';
import currencyActions from '../../redux/actions/actions';
import numberWithCommas from '../../utils/numberWithCommas';
import LinearWithValueLabel from '../../components/linear-with-label';
import getHiLoPercentageDiff from '../../utils/getHiLoPercentageDiff';

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CurrencyDetails = function CurrencyDetails() {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.localCurrency);
  const { loading, loaded, error, data } = useSelector((state) => state.currencyData);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(currencyActions.getCurrencyById(id));
  }, []);

  return (
    <Page title={`CryptoMe.io | ${data?.name} Data`}>
      <Container maxWidth="lg">
        <Box mt={5} mb={4}>
          <Loader
            dataLoading={loading}
            dataError={error}
            dataLoaded={loaded}
            loadingText="Loading currency data..."
            errorText="Failed to load currency data."
            color="secondary"
          >
            <Grid container spacing={4}>
              {data?.public_notice && (
                <Grid item xs={12}>
                  <Alert severity="error">{parse(data?.public_notice)}</Alert>
                </Grid>
              )}
              <Grid item xs={12} md={6} lg={4}>
                <Box display="flex" justifyContent="center">
                  <img src={data?.image.large} alt={data?.name} height={100} width={100} />
                  <Box display="flex" justifyContent="center" flexDirection="column" ml={3}>
                    <Box display="flex" justifyContent="left">
                      <Typography
                        variant="h3"
                        align="left"
                        color="secondary.main"
                        paragraph
                        sx={{ maxWidth: 200 }}
                      >
                        {data?.name}
                      </Typography>
                      <Box py={1} ml={2}>
                        <Chip
                          label={`${data?.symbol?.toUpperCase()}`}
                          color="secondary"
                          size="large"
                          sx={{ fontSize: 'large' }}
                        />
                      </Box>
                    </Box>
                    <Chip
                      label={`CryptoMe Rank #${data?.coingecko_rank}`}
                      color="info"
                      size="small"
                      sx={{ width: 180, mb: 3 }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box display="flex" justifyContent="center" flexDirection="column">
                  <Typography variant="h7" align="center" color="secondary.main" mb={0}>
                    {`${data?.name} Price (${data?.symbol.toUpperCase()})`}
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h3" align="left" color="secondary.main" paragraph mr={1}>
                      {`${getSymbolFromCurrency(currency)}${numberWithCommas(
                        data?.market_data?.current_price[currency]
                      )}`}
                    </Typography>
                    <Box my={1}>
                      <Chip
                        label={`${
                          data?.market_data?.price_change_percentage_24h >= 0 ? '+' : ''
                        }${data?.market_data?.price_change_percentage_24h.toFixed(1)}%`}
                        color={
                          data?.market_data?.price_change_percentage_24h >= 0 ? 'success' : 'error'
                        }
                        sx={{ fontSize: 'large' }}
                      />
                    </Box>
                  </Box>
                  <Box mb={4}>
                    <LinearWithValueLabel
                      progress={getHiLoPercentageDiff(
                        data?.market_data?.high_24h[currency],
                        data?.market_data?.low_24h[currency],
                        data?.market_data?.current_price[currency]
                      )}
                      minLabelText={`24h Low: ${getSymbolFromCurrency(currency)}${numberWithCommas(
                        data?.market_data?.low_24h[currency]
                      )}`}
                      maxLabelText={`24h High: ${getSymbolFromCurrency(currency)}${numberWithCommas(
                        data?.market_data?.high_24h[currency]
                      )}`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CurrencyLinks data={data} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MarketCapDetails data={data} currency={currency} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CircSupplyDetails data={data} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <VolumeDetails data={data} currency={currency} />
                  </Grid>
                  <Grid item xs={6}>
                    <CurrencyCategoryTags data={data} />
                  </Grid>
                </Grid>
              </Grid>
              {data?.description?.en && (
                <Grid item xs={12}>
                  <CurrencyBio data={data} />
                </Grid>
              )}
            </Grid>
          </Loader>
        </Box>
      </Container>
    </Page>
  );
};

CurrencyDetails.Layout = Layout;

export default CurrencyDetails;
