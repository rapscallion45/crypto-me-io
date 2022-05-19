import { createRef, forwardRef } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Layout from '../layouts/Layout/layout';
import { useStore } from '../utils/store';
import ThemeConfig from '../theme/ThemeConfig';
import createEmotionCache from '../utils/createEmotionCache';
import Meta from '../components/meta';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'simplebar/dist/simplebar.min.css';

/* eslint-disable react/no-unstable-nested-components */

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const App = function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const store = useStore(pageProps?.initialReduxState);
  const PageLayout = Component?.Layout || Layout;
  const notistackRef = createRef();

  return (
    <Provider store={store}>
      <ThemeConfig emotionCache={emotionCache}>
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          TransitionComponent={Slide}
          content={(key, message) => <Alert id={key}>{message}</Alert>}
        >
          <Meta />
          <PageLayout>{Component && <Component {...pageProps} />}</PageLayout>
        </SnackbarProvider>
      </ThemeConfig>
    </Provider>
  );
};
export default App;
