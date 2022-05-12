import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';

const Loader = function Loader({
  dataLoading,
  dataError,
  dataLoaded,
  loadingText,
  errorText,
  children,
  color = 'primary',
}) {
  return (
    <>
      {dataLoading && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color={color} size={30} />
          </Box>
          <Typography variant="h6" align="center" mt={1} color={color}>
            {loadingText}
          </Typography>
        </>
      )}
      {dataError && !dataLoaded && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <WarningIcon color="error" size={30} />
          </Box>
          <Typography variant="h6" align="center" mt={1} color={color}>
            {errorText}
          </Typography>
        </>
      )}
      {dataLoaded && children}
    </>
  );
};

Loader.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  dataError: PropTypes.bool.isRequired,
  dataLoaded: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  errorText: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Loader;
