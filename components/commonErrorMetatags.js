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
      <link rel="icon" type="image/png" href="https://breakingnewsapp.netlify.app/assets/images/logo.jpg" />
        <link rel="apple-touch-icon" href="https://breakingnewsapp.netlify.app/assets/images/logo.jpg" />
        <meta property="og:image" content="https://breakingnewsapp.netlify.app/assets/images/logo.jpg" />
        <meta
          name="twitter:image"
          property="og:image"
          content="https://breakingnewsapp.netlify.app/assets/images/logo.jpg"
        />
    </>
  );
};
