import { useState } from 'react';
import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { Button, Card, CardContent } from '@mui/material';

const CurrencyBio = function CurrencyBio({ data }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.main" paragraph>
          {`About ${data?.name}`}
        </Typography>
        <Collapse in={expanded} timeout="auto" collapsedSize="80px">
          <Typography variant="body2" paragraph color="text.main">
            {data && parse(data?.description?.en)}
          </Typography>
        </Collapse>
        <Box display="flex" justifyContent="center">
          <Button
            variant="text"
            color="primary"
            onClick={handleExpandClick}
            sx={{ border: 'none' }}
          >
            {expanded ? 'Show Less' : 'Show More...'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrencyBio;
