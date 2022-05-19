import * as React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatDistance } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import numberWithCommas from '../utils/numberWithCommas';

function createData(name, value, extra, date) {
  return { name, value, extra, date };
}

const getPercentage = (val) =>
  val !== null ? (
    <Typography variant="body2" color={val >= 0 ? 'success.main' : 'error'}>
      {`${val >= 0 ? '+' : ''}${numberWithCommas(val?.toFixed(1))}%`}
    </Typography>
  ) : (
    ''
  );

const formatDate = (input) => {
  if (!input) return '';
  const date = new Date(input);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateStr = `${month}/${day}/${year}`;
  return (
    <Typography variant="body4">{`${dateStr} (${formatDistance(
      Date.parse(date),
      new Date()
    )} ago)`}</Typography>
  );
};

const CurrencyStats = function CurrencyStats({ data, localCurrency }) {
  const rows = [
    createData(
      `${data?.name} Price`,
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.current_price[localCurrency]
      )}`,
      null,
      null
    ),
    createData(
      'Market Cap',
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.market_cap[localCurrency]
      )}`,
      null,
      null
    ),
    createData(
      '24h Trading Volume',
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.total_volume[localCurrency]
      )}`,
      null,
      null
    ),
    /* eslint-disable no-unsafe-optional-chaining */
    createData(
      'Volume / Market Cap',
      (
        data?.market_data?.total_volume[localCurrency] /
        data?.market_data?.market_cap[localCurrency]
      ).toFixed(4),
      null,
      null
    ),
    createData(
      '24h Low / 24h High',
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.low_24h[localCurrency]
      )} / ${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.high_24h[localCurrency]
      )}`,
      null,
      null
    ),
    createData('Market Cap Rank', data?.market_data?.market_cap_rank, null),
    createData(
      'All-Time High',
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.ath[localCurrency]
      )}`,
      data?.market_data?.ath_change_percentage[localCurrency],
      data?.market_data?.ath_date[localCurrency]
    ),
    createData(
      'All-Time Low',
      `${getSymbolFromCurrency(localCurrency)}${numberWithCommas(
        data?.market_data?.atl[localCurrency]
      )}`,
      data?.market_data?.atl_change_percentage[localCurrency],
      data?.market_data?.atl_date[localCurrency]
    ),
  ];

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <TableContainer component={Paper}>
          <Typography
            variant="h5"
            sx={{ paddingLeft: '5px' }}
          >{`${data?.symbol?.toUpperCase()} Price Stats`}</Typography>
          <Table sx={{ minWidth: 650 }} aria-label="currency stats table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="right">
                      <Box mr={1}>{row.value}</Box>
                      <Box>{getPercentage(row.extra)}</Box>
                    </Box>
                    <Box>{formatDate(row.date)}</Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
export default CurrencyStats;
