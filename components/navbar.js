import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './logo';
import Link from './link';
import Loader from './loader';
import MHidden from './m-hidden';
import MobileNav from './mobile-nav';
import SearchDialog from './search-dialog';
import CurrencySwitcher from './currency-switcher';
import currencyActions from '../redux/actions/actions';
import numberWithCommas from '../utils/numberWithCommas';
import getObjMaxProp from '../utils/getObjMaxProp';
import getObjKeyByValue from '../utils/getObjKeyByValue';
import SubscribeDialog from './subscribe-dialog';
import navMenuItems from '../utils/navMenuItems';

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.primary.main,
    padding: 0,
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Navbar = function Navbar() {
  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.globalCurrencyData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileNav = (toggle) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMobileOpen(toggle);
  };

  const toggleSearch = (toggle) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSearchOpen(toggle);
  };

  const handlePopoverOpen = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openSubscribeDialog = () => {
    setSubscribeOpen(true);
  };

  const closeSubscribeDialog = () => {
    setSubscribeOpen(false);
  };

  useEffect(() => {
    dispatch(currencyActions.getGlobalCurrencyData());
  }, []);

  const getDominantCurrency = (currencies) => {
    if (!currencies) return 0;
    const max = getObjMaxProp(currencies);
    const name = getObjKeyByValue(currencies, max);
    return `${name.toUpperCase()} ${max.toFixed(1)}%`;
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm !== '') dispatch(currencyActions.search(searchTerm));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar variant="dense">
        <Box display="flex" sx={{ flexGrow: 1 }}>
          <Link href="/" sx={{ mr: 5 }}>
            <Logo />
          </Link>
        </Box>
        <MHidden width="lgDown">
          <MHidden width="xlDown">
            <Box display="flex" sx={{ flexGrow: 4 }}>
              <Loader
                dataLoaded={currencyData.loaded}
                dataLoading={currencyData.loading}
                dataError={currencyData.error}
              >
                <Box sx={{ position: 'relative', mx: 1 }}>
                  <Typography variant="body3" color="text.primary">
                    Currencies: <br />
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/currencies/all"
                      sx={{ my: 1, fontWeight: '900' }}
                      underline="none"
                    >
                      {currencyData.data?.active_cryptocurrencies}
                    </Link>
                  </Typography>
                  {/* <Typography ml={1} variant="body3" color="text.primary">
                  Markets:{' '}
                  <Link
                    variant="button"
                    color="primary.main"
                    href="/markets/all"
                    sx={{ my: 1, fontWeight: '900' }}
                    underline="none"
                  >
                    {currencyData.data?.markets}
                  </Link>
                </Typography> */}
                </Box>
                <Box sx={{ position: 'relative', mx: 1 }}>
                  <Typography ml={1} variant="body3" color="text.primary">
                    Market Cap: <br />
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/currencies/global-charts"
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
                    sx={{ position: 'absolute', top: 10, right: -10 }}
                  >
                    {currencyData.data?.market_cap_change_percentage_24h_usd >= 0 && '+'}
                    {currencyData.data?.market_cap_change_percentage_24h_usd.toFixed(1)}%
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', mx: 1 }}>
                  <Typography ml={1} variant="body3" color="text.primary">
                    24h Vol: <br />
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/currencies/high-volume"
                      sx={{ my: 1, fontWeight: '900' }}
                      underline="none"
                    >
                      ${numberWithCommas(currencyData.data?.total_volume?.usd.toFixed(0))}
                    </Link>
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', mx: 1 }}>
                  <Typography ml={1} variant="body3" color="text.primary">
                    Dominant: <br />
                    <Link
                      variant="button"
                      color="primary.main"
                      href="/currencies/global-charts"
                      sx={{ my: 1, fontWeight: '900' }}
                      underline="none"
                    >
                      {getDominantCurrency(currencyData.data?.market_cap_percentage)}
                    </Link>
                  </Typography>
                </Box>
              </Loader>
            </Box>
          </MHidden>
          <nav style={{ flexGrow: 4 }}>
            <Typography
              variant="body"
              onClick={handlePopoverOpen}
              onMouseOver={handlePopoverOpen}
              color="primary"
              sx={{
                my: 1,
                mx: 3,
                fontWeight: '900',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Cryptocurrencies
            </Typography>
            <Menu
              id="cryptocurrencies-nav-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handlePopoverClose}
              MenuListProps={{
                onMouseLeave: handlePopoverClose,
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {navMenuItems
                .filter((item) => item.section === 1)
                .map((item) => (
                  <MenuItem component={Link} href={item.href} onClick={handlePopoverClose}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                  </MenuItem>
                ))}
              <Divider />
              {navMenuItems
                .filter((item) => item.section === 2)
                .map((item) => (
                  <MenuItem component={Link} href={item.href} onClick={handlePopoverClose}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
              <Divider />
              {navMenuItems
                .filter((item) => item.section === 3)
                .map((item) => (
                  <MenuItem component={Link} href={item.href} onClick={handlePopoverClose}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
            </Menu>
          </nav>
          <Box sx={{ flexGrow: 4 }}>
            <form onSubmit={handleSearch}>
              <SearchTextField
                fullWidth
                label="Search cryptos..."
                id="fullWidth"
                onChange={handleSearchChange}
                value={searchTerm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        sx={{ border: 'none' }}
                        onClick={handleSearch}
                        disabled={searchTerm === ''}
                      >
                        <SearchIcon color="primary" />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ maxWidth: 300 }}
              />
            </form>
          </Box>
          <Box>
            <CurrencySwitcher />
          </Box>
          <Box>
            <Button variant="contained" onClick={openSubscribeDialog}>
              Subscribe
            </Button>
          </Box>
        </MHidden>
        <MHidden width="lgUp">
          <Box sx={{ flexGrow: 1 }}>
            <CurrencySwitcher />
          </Box>
          <IconButton aria-label="search">
            <SearchIcon
              color="primary"
              sx={{ fontSize: 30, flexGrow: 1 }}
              onClick={toggleSearch(true)}
              fontSize="small"
            />
          </IconButton>
          <IconButton aria-label="open-menu">
            <MenuIcon
              color="primary"
              sx={{ fontSize: 30, flexGrow: 1 }}
              onClick={toggleMobileNav(true)}
              fontSize="small"
            />
          </IconButton>
          <MobileNav
            open={mobileOpen}
            handleToggle={toggleMobileNav}
            searchTerm={searchTerm}
            openSubscribeDialog={openSubscribeDialog}
            handleSearch={handleSearch}
            handleSearchChange={handleSearchChange}
          />
          <SearchDialog
            open={searchOpen}
            handleToggle={toggleSearch}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            handleSearchChange={handleSearchChange}
          />
        </MHidden>
      </Toolbar>
      <SubscribeDialog open={subscribeOpen} handleClose={closeSubscribeDialog} />
    </AppBar>
  );
};

export default Navbar;
