import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import RedditIcon from '@mui/icons-material/Reddit';
import Link from "./link";

const CurrencyLinks = function CurrencyLinks({ data }) {
  return (
    <Box display="flex" sx={{ flexWrap: 'wrap' }}>
      {data?.links?.homepage[0] && (
        <Box mb={1} mr={1}>
          <Chip
            color="secondary"
            label={
              <Box display="flex">
                <Box display="flex" mr={1}>
                  <LinkIcon fontSize="small" />
                </Box>
                <Link
                  href={data?.links?.homepage[0]}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography variant="body4">{data?.links?.homepage[0]}</Typography>
                </Link>
                <Box display="flex" ml={1}>
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </Box>
      )}
      {data?.links?.repos_url.github[0] && (
        <Box mr={1} mb={1}>
          <Chip
            color="secondary"
            label={
              <Box display="flex">
                <Box display="flex" mr={1}>
                  <CodeIcon fontSize="small" />
                </Box>
                <Link
                  href={data?.links?.repos_url.github[0]}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography variant="body4">Source Code</Typography>
                </Link>
                <Box display="flex" ml={1}>
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </Box>
      )}
      {data?.links?.chat_url[0] && (
        <Box mr={1} mb={1}>
          <Chip
            color="secondary"
            label={
              <Box display="flex">
                <Box display="flex" mr={1}>
                  <ChatIcon fontSize="small" />
                </Box>
                <Link
                  href={data?.links?.chat_url[0]}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography variant="body4">Chat</Typography>
                </Link>
                <Box display="flex" ml={1}>
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </Box>
      )}
      {data?.links?.subreddit_url && (
        <Box mr={1} mb={1}>
          <Chip
            color="secondary"
            label={
              <Box display="flex">
                <Box display="flex" mr={1}>
                  <RedditIcon fontSize="small" />
                </Box>
                <Link
                  href={data?.links?.subreddit_url}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography variant="body4">Subreddit</Typography>
                </Link>
                <Box display="flex" ml={1}>
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default CurrencyLinks;
