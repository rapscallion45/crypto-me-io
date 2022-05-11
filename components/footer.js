import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright = function Copyright() {
  const today = new Date();
  const date = today.getFullYear();

  return (
    <Typography variant="body2" color="text.primary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/carlscrivener/">
        Carl Scrivener
      </Link>{' '}
      <span>{date}</span>.
    </Typography>
  );
};

const Footer = function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        zIndex: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" color="text.primary">
          This is a test application intended for demonstration purposes only.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
