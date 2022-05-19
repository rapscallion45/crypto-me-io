import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import WarningIcon from '@mui/icons-material/Warning';
import MHidden from './m-hidden';

const Copyright = function Copyright() {
  const today = new Date();
  const date = today.getFullYear();

  return (
    <Typography variant="body2" color="text.primary" align="center">
      {'Copyright © '}
      <Link color="primary.main" href="/" underline="none">
        CryptoMe.io
      </Link>
      <span>
        {` `}
        {date}
      </span>
      .
    </Typography>
  );
};

const Footer = function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        zIndex: 2,
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.grey[800],
      }}
    >
      <MHidden width="mdDown">
        <Box
          sx={{
            py: 3,
            mt: 'auto',
            zIndex: 2,
            backgroundColor: theme.palette.grey[900],
          }}
        >
          <Container maxWidth="lg">
            <Box display="flex">
              <WarningIcon color="error" size={30} />
              <Typography variant="body2" align="center" color="secondary.main">
                <span style={{ color: theme.palette.error.main }}>IMPORTANT DISCLAIMER:</span> All
                content provided herein our website, hyperlinked sites, associated applications,
                forums, blogs, social media accounts and other platforms (“Site”) is for your
                general information only, procured from third party sources. We make no warranties
                of any kind in relation to our content, including but not limited to accuracy and
                updatedness. No part of the content that we provide constitutes financial advice,
                legal advice or any other form of advice meant for your specific reliance for any
                purpose. Any use or reliance on our content is solely at your own risk and
                discretion. You should conduct your own research, review, analyse and verify our
                content before relying on them. Trading is a highly risky activity that can lead to
                major losses, please therefore consult your financial advisor before making any
                decision. No content on our Site is meant to be a solicitation or offer.
              </Typography>
            </Box>
          </Container>
        </Box>
      </MHidden>
      <Box
        sx={{
          py: 3,
          mt: 'auto',
          zIndex: 2,
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
