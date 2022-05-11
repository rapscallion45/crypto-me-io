import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import userActions from '../redux/actions/actions';

const Currencies = function Currencies() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencyTicker);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(userActions.getTrendingCurrencies());
  }, [currentPage]);

  return (
    <Box mt={5} mb={4}>
      <Grid container spacing={3} role="list" aria-label="user list" />

      {currencies.loaded && (
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination page={currencies.data.page} onChange={pageChange} count={10} size="large" />
        </Box>
      )}
    </Box>
  );
};

export default Currencies;
