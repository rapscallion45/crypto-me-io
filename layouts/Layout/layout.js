import PropTypes from 'prop-types';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import useNotifier from '../../hooks/useNotifier';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import conf from '../../utils/particlesConf';

const Layout = function Layout({ children }) {
  useNotifier();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = () => {};

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
        <Navbar />
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
