import getSymbolFromCurrency from 'currency-symbol-map';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import numberWithCommas from '../utils/numberWithCommas';

const VolumeDetails = function VolumeDetails({ data, currency }) {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
      <Box display="flex" flexDirection="column" justifyContent="left" alignContent="middle">
        <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
        <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
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
              data?.market_data?.total_volume[currency] / data?.market_data?.market_cap[currency]
            )?.toFixed(2)
          )}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default VolumeDetails;
