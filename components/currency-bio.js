import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScrollBar from "./scrollbar";

const CurrencyBio = function CurrencyBio({ data }) {
  return (
    <>
      <Typography variant="h4" color="secondary.main" paragraph>
        Bio:
      </Typography>
      <Box sx={{ height: '80px' }}>
        <ScrollBar
          sx={{
            height: '100%',
            overflowY: 'auto',
            overflowX: 'auto',
            '& .simplebar-content': {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Typography variant="body" color="secondary.main" paragraph>
            {data && parse(data?.description?.en)}
          </Typography>
        </ScrollBar>
      </Box>
    </>
  );
};

export default CurrencyBio;
