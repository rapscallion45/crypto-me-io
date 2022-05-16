import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from './link';

const CurrencyList = function CurrencyList({ items }) {
  return (
    <>
      {items.length > 0 && (
        <Box display="flex" justifyContent="center">
          <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {items.length > 0 &&
              items?.map((item) => (
                <>
                  <ListItem alignItems="middle" justifyContent="center">
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.large} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.symbol}
                        </Typography>
                      }
                    />
                    <Box mx={2}>
                      <Chip label={`Rank #${item.market_cap_rank}`} />
                    </Box>
                    <Button component={Link} href={`/currencies/${item.id}`} variant="contained">
                      View
                    </Button>
                  </ListItem>
                  {items.length > 1 && <Divider variant="inset" component="li" />}
                </>
              ))}
          </List>
        </Box>
      )}
      {!items && !items.length && (
        <Box display="flex" justifyContent="center">
          <Typography variant="h4" color="secondary.main">
            No results found.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CurrencyList;
