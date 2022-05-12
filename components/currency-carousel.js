import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from './link';
import Loader from './loader';
import currencyActions from '../redux/actions/actions';
import numberWithCommas from '../utils/numberWithCommas';

const CarouselItem = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  color: 'white',
});

const CurrencyCarousel = function CurrencyCarousel() {
  const dispatch = useDispatch();
  const trendingCurrencies = useSelector((state) => state.trendingCurrencies);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = trendingCurrencies.data?.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <CarouselItem href="/">
        <img src={coin?.image} alt={coin?.name} height="80" style={{ marginBottom: '10px' }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <Typography variant="body" color={profit ? 'success' : 'error'}>
            {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </Typography>
        </span>
        <Typography variant="h4">${numberWithCommas(coin?.current_price?.toFixed(2))}</Typography>
      </CarouselItem>
    );
  });

  useEffect(() => {
    dispatch(currencyActions.getTrendingCurrencies());
  }, []);

  return (
    <Loader
      dataLoading={trendingCurrencies.loading}
      dataLoaded={trendingCurrencies.loaded}
      dataError={trendingCurrencies.error}
      loadingText="Loading currencies..."
      errorText="Failed to load curreny data."
      color="secondary"
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </Loader>
  );
};

export default CurrencyCarousel;
