export const ogMetaTags = (otherdata, pageType, query) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;
  return (
    <>
      <title>{`${pageType ? `${pageType} -` : ""} ${otherdata.title}`}</title>
      <meta name="description" content={otherdata.title} />
      <link rel="icon" type="image/png" href={otherdata.image_url} />
      <link rel="apple-touch-icon" href={otherdata.image_url} />
      <meta property="og:image" content={otherdata.image_url} />
      <meta name="twitter:image" content={otherdata.image_url} />
      <meta property="og:description" content={otherdata.title} />
      <meta name="twitter:title" content={otherdata.title} />
      <meta name="twitter:description" content={otherdata.title} />
      <meta property="og:title" content={otherdata.title} />
      <meta name="twitter:title" content={otherdata.title} />
      <meta name="twitter:description" content={otherdata.title} />
      <meta
        name="twitter:url"
        content={
          pageType === "Home"
            ? baseUrl
            : pageType === "Search"
            ? `${baseUrl}/search?q=${query.category}&lang=${query?.lang}`
            : `${baseUrl}/${query?.lang}/${query.category}`
        }
      />
      <meta
        property="og:url"
        content={
          pageType === "Home"
            ? baseUrl
            : pageType === "Search"
            ? `${baseUrl}/search?q=${query.category}&lang=${query?.lang}`
            : `${baseUrl}/${query?.lang}/${query.category}`
        }
      />
    </>
  );
};
