import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main,
  },
}));

const LinearProgressWithLabel = function LinearProgressWithLabel(props) {
  const { minLabelText, maxLabelText } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Box sx={{ minWidth: 35, position: 'absolute', bottom: -30, left: 0 }}>
        <Typography variant="body2" color="secondary">{`${minLabelText}`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" color="error" {...props} />
      </Box>
      <Box sx={{ minWidth: 35, position: 'absolute', bottom: -30, right: 0 }}>
        <Typography variant="body2" color="secondary">{`${maxLabelText}`}</Typography>
      </Box>
    </Box>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const LinearWithValueLabel = function LinearWithValueLabel({
  progress,
  minLabelText,
  maxLabelText,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={progress}
        minLabelText={minLabelText}
        maxLabelText={maxLabelText}
      />
    </Box>
  );
};

LinearWithValueLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  progress: PropTypes.number.isRequired,
  minLabelText: PropTypes.string.isRequired,
  maxLabelText: PropTypes.string.isRequired,
};

export default LinearWithValueLabel;
