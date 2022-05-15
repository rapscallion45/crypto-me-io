import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import Logo from './logo';
import currencyActions from '../redux/actions/actions';

const SubscribeDialog = function SubscribeDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const { subscribing, subscribed } = useSelector((state) => state.subscribeMailingList) || false;
  const validationSchema = Yup.object().shape({
    email: Yup.string('Enter your FPL email')
      .email('Email is invalid')
      .required('Email is required'),
    terms: Yup.bool().oneOf([true], 'Please agree to the terms'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      terms: false,
    },
    validationSchema,
    onSubmit: (fields) => {
      dispatch(currencyActions.subscribeMailingList(fields.email));
    },
  });

  useEffect(() => {
    if (subscribed) handleClose();
  }, [subscribed]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="subscribe-form"
    >
      <DialogTitle
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        <Box sx={{ marginBottom: '10px', alignSelf: 'center' }}>
          <Logo />
        </Box>
        Subscribe to the Crypto Me mailing list!
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Typography
          variant="body"
          component="p"
          sx={{ textAlign: 'center', padding: '10px 0 20px 0' }}
        >
          By entering your email below, you can keep up to date with all our lastest news and
          updates.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            label="Enter your email..."
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box display="flex" flexDirection="column">
            <FormControlLabel
              control={<Checkbox checked={formik.values.terms} />}
              label="I agree to the terms and conditions"
              id="terms"
              name="terms"
              type="checkbox"
              value={formik.values.terms}
              onChange={formik.handleChange}
              error={formik.touched.terms && Boolean(formik.errors.terms)}
              helperText={formik.touched.terms && formik.errors.terms}
            />
            {formik.touched.terms && Boolean(formik.errors.terms) && (
              <Typography variant="body3" color="error">
                {formik.touched.terms && formik.errors.terms}
              </Typography>
            )}
          </Box>
          <DialogActions>
            <Button
              type="button"
              fullWidth
              color="primary"
              onClick={handleClose}
              disabled={subscribing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={subscribing}
            >
              {!subscribing && 'Submit'}
              {subscribing && <CircularProgress size={25} color="inherit" />}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default SubscribeDialog;
