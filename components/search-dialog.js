import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SearchIcon from '@mui/icons-material/Search';
import { DialogTitle } from '@mui/material';

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

const SearchDialog = function SearchDialog({
  open,
  handleToggle,
  searchTerm,
  handleSearch,
  handleSearchChange,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleToggle(false)}
      aria-labelledby="search-dialog"
      aria-describedby="cryptocurrency-search-dialog"
      maxWidth="xs"
    >
      <DialogTitle color="primary" sx={{ textAlign: 'center' }}>
        Enter the name of a cryptocurrency...
      </DialogTitle>
      <DialogContent mt={2}>
        <Box mt={2}>
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
            />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }}>
          <Button fullWidth onClick={handleToggle(false)}>
            Cancel
          </Button>
        </Box>
        <Box role="button" onClick={handleToggle(false)} sx={{ flexGrow: 4 }}>
          <Button fullWidth variant="contained" onClick={handleSearch} autoFocus>
            Search
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default SearchDialog;
