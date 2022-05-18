import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button, DialogContent } from '@mui/material';

const TagsDialogTitle = function TagsDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

TagsDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const TagsDialog = function TagsDialog(props) {
  const { tags, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <TagsDialogTitle onClose={onClose}>Currency&apos;s Tags:</TagsDialogTitle>
      <DialogContent>
        <Box mt={1} display="flex" sx={{ flexWrap: 'wrap' }}>
          {tags.map(
            (tag) =>
              tag !== null && (
                <Box mb={1} mr={1}>
                  <Chip color="primary" label={tag} />
                </Box>
              )
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

TagsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const CurrencyCategoryTags = function CurrencyCategoryTags({ data }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" sx={{ width: '100%' }}>
      <Box display="flex" flexDirection="column" justifyContent="left" alignContent="middle">
        <Typography variant="body4" align="left" color="secondary.main" sx={{ maxWidth: 200 }}>
          Tags:
        </Typography>
      </Box>
      {data?.categories.length > 0 && data?.categories[0] !== null && (
        <>
          <Box mt={1} display="flex" sx={{ flexWrap: 'wrap' }}>
            {data?.categories.slice(0, 3).map(
              (category) =>
                category !== null && (
                  <Box mb={1} mr={1}>
                    <Chip
                      color="secondary"
                      label={
                        <Typography variant="body" noWrap sx={{ maxWidth: 160 }}>
                          {category}
                        </Typography>
                      }
                      size="small"
                    />
                  </Box>
                )
            )}
          </Box>
          <Box>
            <Button variant="contained" size="small" color="info" onClick={handleOpen}>
              View All
            </Button>
          </Box>
        </>
      )}
      {(!data?.categories.length || data?.categories[0] === null) && (
        <Box my={2}>
          <Typography variant="body" color="secondary">
            N/A
          </Typography>
        </Box>
      )}
      <TagsDialog tags={data?.categories} open={open} onClose={handleClose} />
    </Box>
  );
};

export default CurrencyCategoryTags;
