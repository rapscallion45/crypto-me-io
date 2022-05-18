import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { merge } from 'lodash';
import dynamic from 'next/dynamic';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import getSymbolFromCurrency from 'currency-symbol-map';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { BaseOptionChart } from './charts';
import PriceChartTypeSelect from './price-chart-type-select';
import PriceChartRangeSelect from './price-chart-range-select';
import currencyActions from '../redux/actions/actions';
import Loader from './loader';
import numberWithCommas from '../utils/numberWithCommas';

/* Dynamic import - do not render charts on server */
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getInterval = (rangeVal) => {
  switch (rangeVal) {
    case '1':
      return 'minutely';
    case '4':
    case '7':
      return 'hourly';
    case '30':
    case '90':
      return 'daily';
    default:
      return 'weekly';
  }
};

const getChartTypeName = (chartType) => {
  switch (chartType) {
    case 'market_caps':
      return 'Market Cap';
    case 'total_volumes':
      return 'Total Volume';
    default:
      return 'Price';
  }
};

const PriceChart = function PriceChart({ currencyData, localCurrency }) {
  const dispatch = useDispatch();
  const [chartRange, setChartRange] = useState('365');
  const [chartType, setChartType] = useState('prices');
  const { loading, loaded, error, data } = useSelector((state) => state.marketChartData);
  const chartData = [
    {
      name: getChartTypeName(chartType),
      type: 'area',
      data: data ? data[chartType].map((price) => price[1]) : [],
    },
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['gradient', 'solid'] },
    labels: data ? data[chartType].map((price) => price[0]) : [],
    xaxis: {
      labels: {
        formatter: (value) => `${timeFormat('%c')(value)}`,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) =>
          `${getSymbolFromCurrency(localCurrency)}${
            value > 0.001 ? format('~s')(value) : value.toFixed(7)
          }`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${getSymbolFromCurrency(localCurrency)}${
              y > 0.01 ? numberWithCommas(y.toFixed(2)) : y.toFixed(7)
            }`;
          }
          return y;
        },
      },
    },
  });

  useEffect(() => {
    if (currencyData?.id)
      dispatch(
        currencyActions.getMarketChartData(
          currencyData?.id,
          localCurrency,
          chartRange,
          getInterval(chartRange)
        )
      );
  }, [chartRange, currencyData, localCurrency]);

  const handleChartTypeUpdate = (value) => {
    setChartType(value);
  };

  const handleChartRangeUpdate = (value) => {
    setChartRange(value);
  };

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={`${
                currencyData?.name
              } to ${localCurrency?.toUpperCase()} Chart (${currencyData?.symbol?.toUpperCase()})`}
            />
            <Box display="flex" sx={{ flexWrap: 'wrap' }}>
              <Box display="flex" my={1} mx={3} sx={{ flexGrow: 1 }}>
                <PriceChartTypeSelect initialValue={chartType} onUpdate={handleChartTypeUpdate} />
              </Box>
              <Box display="flex" justifyContent="end" my={1} mx={3} sx={{ flexGrow: 1 }}>
                <PriceChartRangeSelect
                  initialValue={chartRange}
                  onUpdate={handleChartRangeUpdate}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: 410 }}>
              <Loader
                dataLoading={loading}
                dataLoaded={loaded}
                dataError={error}
                loadingText="Loading market data..."
                errorText="Failed to load market data."
              >
                {chartData?.length !== 0 && (
                  <Box sx={{ width: '100%', p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart
                      type="line"
                      series={chartData}
                      options={chartOptions}
                      height={364}
                    />
                  </Box>
                )}
                {!chartData?.length && (
                  <Box sx={{ padding: '25px' }}>
                    <Typography variant="body" component="p">
                      No data to show yet - check back once the season is underway.
                    </Typography>
                  </Box>
                )}
              </Loader>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PriceChart;
