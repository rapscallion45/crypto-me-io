import { Provider } from 'react-redux';
import Layout from '../layouts/Layout/layout';
import { useStore } from '../utils/store';
import ThemeConfig from '../theme/ThemeConfig';
import createEmotionCache from '../utils/createEmotionCache';
import Meta from '../components/meta';
import 'react-alice-carousel/lib/alice-carousel.css';

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const App = function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const store = useStore(pageProps?.initialReduxState);
  const PageLayout = Component?.Layout || Layout;

  return (
    <Provider store={store}>
      <ThemeConfig emotionCache={emotionCache}>
        <Meta />
        <PageLayout>{Component && <Component {...pageProps} />}</PageLayout>
      </ThemeConfig>
    </Provider>
  );
};
export default App;
