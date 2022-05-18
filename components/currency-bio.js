import { useState } from 'react';
import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { Button } from '@mui/material';

const CurrencyBio = function CurrencyBio({ data }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Typography variant="h4" color="secondary.main" paragraph>
        Bio:
      </Typography>
      <Collapse in={expanded} timeout="auto" collapsedSize="80px">
        <Typography variant="body" color="secondary.main" paragraph>
          {data && parse(data?.description?.en)}
        </Typography>
      </Collapse>
      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          color="secondary"
          onClick={handleExpandClick}
          sx={{ border: 'none' }}
        >
          {expanded ? 'Show Less' : 'Show More...'}
        </Button>
      </Box>
    </>
  );
};

export default CurrencyBio;
