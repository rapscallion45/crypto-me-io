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
import Meta from '../../components/meta';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import Link from '../../components/link';
import Loader from '../../components/loader';
import MHidden from '../../components/m-hidden';
import conf from '../../utils/particlesConf';
import userActions from '../../redux/actions/actions';

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

  return (
    <>
      <Meta />
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
          <AppBar position="sticky" color="secondary">
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
                  <Typography variant="body2" color="text.primary">
                    Coins:{' '}
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/"
                      sx={{ my: 1, fontWeight: '900' }}
                    >
                      {currencyData.data?.active_cryptocurrencies}
                    </Link>
                  </Typography>
                  <Typography ml={1} variant="body2" color="text.primary">
                    Markets:{' '}
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/"
                      sx={{ my: 1, fontWeight: '900' }}
                    >
                      {currencyData.data?.markets}
                    </Link>
                  </Typography>
                  <Typography ml={1} variant="body2" color="text.primary">
                    Coins:{' '}
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/"
                      sx={{ my: 1, fontWeight: '900' }}
                    >
                      {currencyData.data?.active_cryptocurrencies}
                    </Link>
                  </Typography>
                  <Typography ml={1} mr={6} variant="body2" color="text.primary">
                    Top Market Share:{' '}
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/"
                      sx={{ my: 1, fontWeight: '900' }}
                    >
                      {currencyData.data?.active_cryptocurrencies}
                    </Link>
                  </Typography>
                </Loader>
                <nav>
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/"
                    sx={{ my: 1, mx: 1.5, fontWeight: '900', textTransform: 'uppercase' }}
                  >
                    Markets
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
        {children}
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={conf} />
        <Footer />
      </Box>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
