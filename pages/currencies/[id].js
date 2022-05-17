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
import ScrollBar from '../../components/scrollbar';
import Layout from '../../layouts/Layout/layout';
import currencyActions from '../../redux/actions/actions';
import numberWithCommas from '../../utils/numberWithCommas';
import LinearWithValueLabel from '../../components/linear-with-label';

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
                <Box display="flex">
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
                      progress={50}
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
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  ml={3}
                  sx={{ width: '100%' }}
                >
                  <Box display="flex" justifyContent="left" alignContent="middle">
                    <Typography
                      variant="h4"
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
              </Grid>
              {data?.description?.en && (
                <Grid item xs={12}>
                  <Box sx={{ height: '80px' }}>
                    <ScrollBar
                      sx={{
                        height: '100%',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        '& .simplebar-content': {
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        },
                      }}
                    >
                      <Typography variant="body" color="secondary.main" paragraph>
                        {data && parse(data?.description?.en)}
                      </Typography>
                    </ScrollBar>
                  </Box>
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
