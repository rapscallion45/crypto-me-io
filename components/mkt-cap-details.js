import getSymbolFromCurrency from 'currency-symbol-map';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import numberWithCommas from '../utils/numberWithCommas';

const MarketCapDetails = function MarketCapDetails({ data, currency }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" justifyContent="left" alignContent="middle">
            <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
              color={data?.market_data?.market_cap_change_percentage_24h >= 0 ? 'success' : 'error'}
              size="small"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" justifyContent="left" alignContent="middle">
            <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
                ) || '--'
              }`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MarketCapDetails;
