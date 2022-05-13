import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Page from '../../components/page';
import CurrencyTable from '../../components/currency-table';
import Layout from '../../layouts/Layout/layout';

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.secondary.main,
    padding: 0,
    '& fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const AllCurrencies = function AllCurrencies() {
  return (
    <Page title="CryptoMe.io | All Currencies">
      <Container disableGutters maxWidth="lg">
        <Box mt={5} mb={4}>
          <Typography variant="h2" align="center" color="secondary.main" paragraph>
            All Cryptocurrencies
          </Typography>
          <Typography variant="h5" align="center" color="secondary.main" paragraph>
            Explore all currently trading cryptocurrencies globally
          </Typography>
        </Box>
        <Box mt={6} mb={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{
              textAlign: 'center',
              width: '100%',
              mt: 2,
              mb: 6,
            }}
          >
            <SearchTextField
              fullWidth
              label="Search cryptos..."
              id="fullWidth"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="text" sx={{ border: 'none' }}>
                      <SearchIcon color="secondary" />
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 600 }}
            />
          </Box>
          <CurrencyTable perPage={50} />
        </Box>
      </Container>
    </Page>
  );
};

AllCurrencies.Layout = Layout;

export default AllCurrencies;
