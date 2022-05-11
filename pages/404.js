import { Box, Button, Typography, Container } from '@mui/material';
import Link from '../components/link';
import Layout from '../layouts/Layout/layout';

const Page404 = function Page404() {
  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', mt: 10 }}>
        <Typography variant="h3" paragraph sx={{ color: 'secondary.main' }}>
          Sorry, page not found!
        </Typography>
        <Typography sx={{ color: 'secondary.main' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>

        <Box sx={{ padding: '50px' }}>
          <Typography sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'secondary.main' }}>
            404
          </Typography>
        </Box>

        <Box sx={{ padding: '0 50px 100px 50px' }}>
          <Button href="/" size="large" variant="contained" component={Link}>
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

Page404.Layout = Layout;

export default Page404;
