import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Page from '../../components/page';
import Loader from '../../components/loader';
import ScrollBar from '../../components/scrollbar';
import Layout from '../../layouts/Layout/layout';
import currencyActions from '../../redux/actions/actions';

const CurrencyDetails = function CurrencyDetails() {
  const dispatch = useDispatch();
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
            <Box display="flex" justifyContent="left" flexDirection="column">
              <Box display="flex" justifyContent="left">
                <img src={data?.image.large} alt={data?.name} height={150} width={150} />
                <Box display="flex" justifyContent="center" flexDirection="column" ml={3}>
                  <Chip
                    label={`CryptoMe Rank #${data?.coingecko_rank}`}
                    color="secondary"
                    size="small"
                    sx={{ width: 180, mb: 3 }}
                  />
                  <Typography variant="h2" align="left" color="secondary.main" paragraph>
                    {data?.name}
                  </Typography>
                  <Typography variant="h3" align="left" color="secondary.main" paragraph>
                    <span style={{ textTransform: 'uppercase' }}>{data?.symbol}</span>
                  </Typography>
                </Box>
              </Box>
              <Box mt={4}>
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
              </Box>
            </Box>
          </Loader>
        </Box>
      </Container>
    </Page>
  );
};

CurrencyDetails.Layout = Layout;

export default CurrencyDetails;
