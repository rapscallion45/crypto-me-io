import Head from 'next/head';

const Meta = function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#009EE3" />
      <link rel="icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#009EE3" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#009EE3" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@600&display=swap"
        rel="stylesheet"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  );
};
export default Meta;
