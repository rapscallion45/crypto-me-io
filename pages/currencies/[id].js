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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import RedditIcon from '@mui/icons-material/Reddit';
import Page from '../../components/page';
import Loader from '../../components/loader';
import Link from '../../components/link';
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
                <Box display="flex" sx={{ flexWrap: 'wrap' }}>
                  {data?.links?.homepage[0] && (
                    <Box mb={1}>
                      <Chip
                        color="secondary"
                        label={
                          <Box display="flex">
                            <Box display="flex" mr={1}>
                              <LinkIcon fontSize="small" />
                            </Box>
                            <Link
                              href={data?.links?.homepage[0]}
                              target="_blank"
                              sx={{ textDecoration: 'none' }}
                            >
                              <Typography variant="body4">{data?.links?.homepage[0]}</Typography>
                            </Link>
                            <Box display="flex" ml={1}>
                              <OpenInNewIcon fontSize="small" />
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  {data?.links?.repos_url.github[0] && (
                    <Box ml={1} mb={1}>
                      <Chip
                        color="secondary"
                        label={
                          <Box display="flex">
                            <Box display="flex" mr={1}>
                              <CodeIcon fontSize="small" />
                            </Box>
                            <Link
                              href={data?.links?.repos_url.github[0]}
                              target="_blank"
                              sx={{ textDecoration: 'none' }}
                            >
                              <Typography variant="body4">Source Code</Typography>
                            </Link>
                            <Box display="flex" ml={1}>
                              <OpenInNewIcon fontSize="small" />
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  {data?.links?.chat_url[0] && (
                    <Box ml={1} mb={1}>
                      <Chip
                        color="secondary"
                        label={
                          <Box display="flex">
                            <Box display="flex" mr={1}>
                              <ChatIcon fontSize="small" />
                            </Box>
                            <Link
                              href={data?.links?.chat_url[0]}
                              target="_blank"
                              sx={{ textDecoration: 'none' }}
                            >
                              <Typography variant="body4">Chat</Typography>
                            </Link>
                            <Box display="flex" ml={1}>
                              <OpenInNewIcon fontSize="small" />
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  {data?.links?.subreddit_url && (
                    <Box ml={1} mb={1}>
                      <Chip
                        color="secondary"
                        label={
                          <Box display="flex">
                            <Box display="flex" mr={1}>
                              <RedditIcon fontSize="small" />
                            </Box>
                            <Link
                              href={data?.links?.subreddit_url}
                              target="_blank"
                              sx={{ textDecoration: 'none' }}
                            >
                              <Typography variant="body4">Subreddit</Typography>
                            </Link>
                            <Box display="flex" ml={1}>
                              <OpenInNewIcon fontSize="small" />
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="left"
                        alignContent="middle"
                      >
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Market Cap:
                          <Tooltip title="Refers to the total market value of a cryptocurrency’s circulating supply. It is similar to the stock market’s measurement of multiplying price per share by shares readily available in the market (not held & locked by insiders, governments)">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${getSymbolFromCurrency(currency)}${numberWithCommas(
                            data?.market_data?.market_cap[currency].toFixed(0)
                          )}`}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip
                          label={`${
                            data?.market_data?.market_cap_change_percentage_24h >= 0 ? '+' : ''
                          }${data?.market_data?.market_cap_change_percentage_24h.toFixed(1)}%`}
                          color={
                            data?.market_data?.market_cap_change_percentage_24h >= 0
                              ? 'success'
                              : 'error'
                          }
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="left"
                        alignContent="middle"
                      >
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Full Dil. Mkt. Cap:
                          <Tooltip title="A fully diluted market cap in crypto is the total value of crypto at today's token price if the total supply of cryptocurrency were in circulation. To determine the fully diluted market cap, multiply the token's current value by the total supply of cryptocurrency.">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${getSymbolFromCurrency(currency)}${
                            numberWithCommas(
                              data?.market_data?.fully_diluted_valuation[currency]?.toFixed(0)
                            ) || 'N/A'
                          }`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="left"
                        alignContent="middle"
                      >
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Circ. Supply:
                          <Tooltip title="The amount of coins that are circulating in the market and are tradeable by the public. It is comparable to looking at shares readily available in the market (not held & locked by insiders, governments).">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${numberWithCommas(data?.market_data?.circulating_supply.toFixed(0))}`}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Max Supply:
                          <Tooltip title="The maximum number of coins coded to exist in the lifetime of the cryptocurrency. It is comparable to the maximum number of issuable shares in the stock market.">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${numberWithCommas(data?.market_data?.max_supply?.toFixed(0)) || '∞'}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Box>
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Total Supply:
                          <Tooltip title="The amount of coins that have already been created, minus any coins that have been burned (removed from circulation). It is comparable to outstanding shares in the stock market.">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${
                            numberWithCommas(data?.market_data?.total_supply?.toFixed(0)) || 'N/A'
                          }`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="left"
                        alignContent="middle"
                      >
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          24h Volume:
                          <Tooltip title="A measure of a cryptocurrency trading volume across all tracked platforms in the last 24 hours. This is tracked on a rolling 24-hour basis with no open/closing times.">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h7"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {`${getSymbolFromCurrency(currency)}${numberWithCommas(
                            data?.market_data?.total_volume[currency].toFixed(0)
                          )}`}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body4"
                          align="left"
                          color="secondary.main"
                          sx={{ maxWidth: 200 }}
                        >
                          Volume/Mkt. Cap:
                          <Tooltip title="Ratio of trading volume in the past 24 hours to total market capitilization. A figure below 1.0 is considered sub-optimal.">
                            <IconButton>
                              <HelpIcon fontSize="small" color="info" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <Typography
                          variant="h6"
                          align="left"
                          color="secondary.main"
                          paragraph
                          sx={{ maxWidth: 200 }}
                        >
                          {/* eslint-disable no-unsafe-optional-chaining */}
                          {`${numberWithCommas(
                            (
                              data?.market_data?.total_volume[currency] /
                              data?.market_data?.market_cap[currency]
                            )?.toFixed(2)
                          )}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              {data?.description?.en && (
                <Grid item xs={12}>
                  <Typography variant="h4" color="secondary.main" paragraph>
                    Bio:
                  </Typography>
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
