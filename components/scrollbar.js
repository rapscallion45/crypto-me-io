import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { alpha, styled } from '@mui/material/styles';

const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[100], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

const ScrollBar = function ScrollBar({ children, sx, ...other }) {
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};

ScrollBar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};

export default ScrollBar;
