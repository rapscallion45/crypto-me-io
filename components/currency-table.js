import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Loader from './loader';
import Link from './link';
import currencyActions from '../redux/actions/actions';
import numberWithCommas from '../utils/numberWithCommas';

const CurrencyTableSortLabel = styled(TableSortLabel)(() => ({
  '& .MuiTableSortLabel-iconDirectionDesc': {
    color: 'white !important',
  },
  '& .MuiTableSortLabel-iconDirectionAsc': {
    color: 'white !important',
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Currency',
  },
  {
    id: 'current_price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'price_change_percentage_1h_in_currency',
    numeric: true,
    disablePadding: true,
    label: 'Δ1h',
  },
  {
    id: 'price_change_percentage_24h',
    numeric: true,
    disablePadding: true,
    label: 'Δ24h',
  },
  {
    id: 'price_change_percentage_7d_in_currency',
    numeric: true,
    disablePadding: true,
    label: 'Δ7d',
  },
  {
    id: 'price_change_percentage_30d_in_currency',
    numeric: true,
    disablePadding: true,
    label: 'Δ30d',
  },
  {
    id: 'circulating_supply',
    numeric: true,
    disablePadding: true,
    label: 'Circulating Supply',
  },
  {
    id: 'total_supply',
    numeric: true,
    disablePadding: true,
    label: 'Total Supply',
  },
  {
    id: 'total_volume',
    numeric: true,
    disablePadding: true,
    label: '24h Volume',
  },
  {
    id: 'market_cap',
    numeric: true,
    disablePadding: true,
    label: 'Market Cap',
  },
];

const CurrencyTableHead = function CurrencyTableHead(props) {
  const theme = useTheme();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ padding: '15px' }}
          >
            <CurrencyTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="body" color="secondary.main">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </CurrencyTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

CurrencyTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const CurrencyTableToolbar = function CurrencyTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Currencies
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const TablePaginationActions = function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CurrencyTable = function CurrencyTable({ orderDataBy = 'market_cap_desc', perPage = 10 }) {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.globalCurrencyData);
  const { loading, error, loaded, data } = useSelector((state) => state.allCurrencies);
  const { currency } = useSelector((state) => state.localCurrency);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(orderDataBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);

  useEffect(() => {
    dispatch(currencyActions.getAllCurrencies(page + 1, rowsPerPage, currency, orderDataBy));
  }, [page, rowsPerPage, currency, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          mb: 2,
          minHeight: '300px',
        }}
      >
        <Loader
          dataLoading={loading || globalData.loading}
          dataError={error || globalData.error}
          dataLoaded={loaded && globalData.loaded}
          loadingText="Loading currency data..."
          errorText="Failed to load currency data."
          color="primary"
        >
          <CurrencyTableToolbar />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
              <CurrencyTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(data || [], getComparator(order, orderBy)).map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ width: '250px' }}
                      >
                        <Box
                          component={Link}
                          href={`/currencies/${row.id}`}
                          display="flex"
                          sx={{ width: '180px', px: 1 }}
                          underline="none"
                        >
                          <img
                            loading="lazy"
                            alt={row.name}
                            src={row.image}
                            height={50}
                            width={50}
                            style={{ marginRight: 10 }}
                          />
                          <Box display="flex" flexDirection="column">
                            <Typography noWrap variant="h6" sx={{ width: '170px' }} color="black">
                              {row.name}
                            </Typography>
                            <Typography
                              noWrap
                              variant="body"
                              color="black"
                              sx={{ textTransform: 'uppercase' }}
                            >
                              {row.symbol}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {getSymbolFromCurrency(currency)}
                        {numberWithCommas(row.current_price?.toFixed(2))}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          noWrap
                          color={
                            row.price_change_percentage_1h_in_currency >= 0
                              ? 'success.main'
                              : 'error.main'
                          }
                        >
                          {row.price_change_percentage_1h_in_currency >= 0 && '+'}
                          {row.price_change_percentage_1h_in_currency?.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          noWrap
                          color={
                            row.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'
                          }
                        >
                          {row.price_change_percentage_24h >= 0 && '+'}
                          {row.price_change_percentage_24h?.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          noWrap
                          color={
                            row.price_change_percentage_7d_in_currency >= 0
                              ? 'success.main'
                              : 'error.main'
                          }
                        >
                          {row.price_change_percentage_7d_in_currency >= 0 && '+'}
                          {row.price_change_percentage_7d_in_currency?.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          noWrap
                          color={
                            row.price_change_percentage_30d_in_currency >= 0
                              ? 'success.main'
                              : 'error.main'
                          }
                        >
                          {row.price_change_percentage_30d_in_currency >= 0 && '+'}
                          {row.price_change_percentage_30d_in_currency?.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(row.circulating_supply?.toFixed(0))}
                      </TableCell>
                      <TableCell align="right">
                        {row.total_supply ? numberWithCommas(row.total_supply.toFixed(0)) : '∞'}
                      </TableCell>
                      <TableCell align="right">
                        {getSymbolFromCurrency(currency)}
                        {row.total_volume ? numberWithCommas(row.total_volume.toFixed(0)) : '∞'}
                      </TableCell>
                      <TableCell align="right" sx={{ px: 2 }}>
                        <Box position="relative">
                          {getSymbolFromCurrency(currency)}
                          {numberWithCommas(row.market_cap?.toFixed(0))}
                          <Box position="absolute" sx={{ top: -15, right: -5 }}>
                            <Typography
                              variant="body4"
                              noWrap
                              color={
                                row.market_cap_change_percentage_24h >= 0
                                  ? 'success.main'
                                  : 'error.main'
                              }
                            >
                              {row.market_cap_change_percentage_24h >= 0 && '+'}
                              {row.market_cap_change_percentage_24h?.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={globalData?.data?.active_cryptocurrencies}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Loader>
      </Paper>
    </Box>
  );
};

CurrencyTable.propTypes = {
  orderDataBy: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default CurrencyTable;
