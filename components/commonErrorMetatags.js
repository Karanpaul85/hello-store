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
    </>
  );
};
