import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import Link from '../../components/link';
import Loader from '../../components/loader';
import MHidden from '../../components/m-hidden';
import conf from '../../utils/particlesConf';
import userActions from '../../redux/actions/actions';
import numberWithCommas from '../../utils/numberWithCommas';
import getObjMaxProp from '../../utils/getObjMaxProp';
import getObjKeyByValue from '../../utils/getObjKeyByValue';

const Layout = function Layout({ children }) {
  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.globalCurrencyData);

  useEffect(() => {
    dispatch(userActions.getGlobalCurrencyData());
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = () => {};

  const getDominantCurrency = (currencies) => {
    if (!currencies) return 0;
    const max = getObjMaxProp(currencies);
    const name = getObjKeyByValue(currencies, max);
    return `${name.toUpperCase()} ${max.toFixed(1)}%`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,25,180,1) 0%, rgba(31,31,212,1) 45%, rgba(0,212,255,1) 100%)',
      }}
    >
      <CssBaseline />
      <Box sx={{ flexGrow: 1, maxHeight: 80 }}>
        <AppBar position="fixed" color="secondary">
          <Toolbar variant="dense">
            <Link href="/" sx={{ mr: 5 }}>
              <Logo />
            </Link>
            <MHidden width="lgDown">
              <Loader
                dataLoaded={currencyData.loaded}
                dataLoading={currencyData.loading}
                dataError={currencyData.error}
              >
                <Typography variant="body3" color="text.primary">
                  Coins:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    {currencyData.data?.active_cryptocurrencies}
                  </Link>
                </Typography>
                <Typography ml={1} variant="body3" color="text.primary">
                  Markets:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    {currencyData.data?.markets}
                  </Link>
                </Typography>
                <Typography ml={1} variant="body3" color="text.primary">
                  Market Cap:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    ${numberWithCommas(currencyData.data?.total_market_cap?.usd.toFixed(0))}
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    currencyData.data?.market_cap_change_percentage_24h_usd >= 0
                      ? 'success.main'
                      : 'error'
                  }
                  sx={{ marginLeft: '5px' }}
                >
                  {currencyData.data?.market_cap_change_percentage_24h_usd >= 0 && '+'}
                  {currencyData.data?.market_cap_change_percentage_24h_usd.toFixed(1)}%
                </Typography>
                <Typography ml={1} variant="body3" color="text.primary">
                  24h Vol:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    ${numberWithCommas(currencyData.data?.total_volume?.usd.toFixed(0))}
                  </Link>
                </Typography>
                <Typography ml={1} mr={6} variant="body3" color="text.primary">
                  Dominant:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    {getDominantCurrency(currencyData.data?.market_cap_percentage)}
                  </Link>
                </Typography>
              </Loader>
              <nav>
                <Link
                  variant="button"
                  color="primary.main"
                  href="/currencies/all"
                  sx={{ my: 1, mx: 1.5, fontWeight: '900', textTransform: 'uppercase' }}
                  underline="none"
                >
                  Currencies
                </Link>
              </nav>
            </MHidden>
            <MHidden width="lgUp">
              <IconButton aria-label="open-menu">
                <MenuIcon color="primary" sx={{ fontSize: 30 }} />
              </IconButton>
            </MHidden>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: 8 }}>{children}</Box>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={conf} />
      <Footer />
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
