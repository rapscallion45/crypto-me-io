import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import numberWithCommas from '../utils/numberWithCommas';

const CircSupplyDetails = function CircSupplyDetails({ data }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" justifyContent="left" alignContent="middle">
            <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
            <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
          <Box>
            <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
              {`${numberWithCommas(data?.market_data?.total_supply?.toFixed(0)) || 'N/A'}`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CircSupplyDetails;
