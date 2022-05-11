import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from './link';

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: '7px',
  maxWidth: 300,
  height: 160,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 500,
    height: 210,
  },
}));

const Hero = function Hero() {
  return (
    <Container maxWidth="sm">
      <Box mb={1} display="flex" justifyContent="center">
        <BoxStyle alt="logo-image" component="img" src="/static/logo-text.png" />
      </Box>

      <Typography variant="h3" align="center" color="secondary.main" paragraph>
        Track, buy and sell your crypto with ease!
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" component={Link} href="/register">
          Create Account
        </Button>
      </Stack>
    </Container>
  );
};

export default Hero;
