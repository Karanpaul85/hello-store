export const ogErrorMetaTags = (errorData) => {
  return (
    <>
      <title>{errorData}</title>
      <meta name="description" content={errorData} />
      <meta property="og:title" content={errorData} />
      <meta property="og:description" content={errorData} />
      <meta name="twitter:title" content={errorData} />
      <meta name="twitter:description" content={errorData} />
      <meta property="og:title" content={errorData} />
      <meta name="twitter:title" content={errorData} />
      <meta property="og:description" content={errorData} />
      <meta name="twitter:description" content={errorData} />
      <link rel="icon" type="image/png" href="/assets/images/logo.webp" />
        <link rel="apple-touch-icon" href="/assets/images/logo.webp" />
        <meta property="og:image" content="/assets/images/logo.webp" />
        <meta
          name="twitter:image"
          property="og:image"
          content="/assets/images/logo.webp"
        />
    </>
  );
};
