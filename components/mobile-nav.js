import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Link from './link';
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

const MobileNav = function MobileNav({
  open,
  handleToggle,
  searchTerm,
  openSubscribeDialog,
  handleSearch,
  handleSearchChange,
}) {
  const handleSearchClick = (event) => {
    event.preventDefault();

    if (searchTerm !== '') {
      handleSearch(event);
      handleToggle(false, event);
    }
  };

  const list = () => (
    <Box sx={{ width: 300 }} role="presentation">
      <Box my={2} mx={3} display="flex" justifyContent="center">
        <Box sx={{ flexGrow: 4 }}>
          <Link href="/">
            <Box
              alt="logo-image"
              component="img"
              src="/static/logo-white.png"
              sx={{ width: 150 }}
              onClick={handleToggle(false)}
            />
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ flexGrow: 1 }}>
          <IconButton aria-label="delete" onClick={handleToggle(false)}>
            <CloseIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box my={2} mx={3}>
        <form onSubmit={handleSearchClick}>
          <SearchTextField
            fullWidth
            label="Search cryptos..."
            id="fullWidth"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="text"
                    sx={{ border: 'none' }}
                    onClick={handleToggle(false)}
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
      <List>
        {navMenuItems
          .filter((item) => item.section === 1)
          .map((item) => (
            <ListItem disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={handleToggle(false)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {navMenuItems
          .filter((item) => item.section === 2)
          .map((item) => (
            <ListItem disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={handleToggle(false)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {navMenuItems
          .filter((item) => item.section === 3)
          .map((item) => (
            <ListItem disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={handleToggle(false)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Box
        role="button"
        display="flex"
        justifyContent="center"
        my={2}
        mx={5}
        onClick={handleToggle(false)}
      >
        <Button fullWidth variant="contained" onClick={openSubscribeDialog}>
          Subscribe
        </Button>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={handleToggle(false)}
      onOpen={handleToggle(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
};

export default MobileNav;
