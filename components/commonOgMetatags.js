export const ogMetaTags = (otherdata) => {
    return (
      <>
        <title>{otherdata.title}</title>
        <meta name="description" content={otherdata.title} />
        <link rel="icon" type="image/png" href={otherdata.image_url} />
        <link rel="apple-touch-icon" href={otherdata.image_url} />
        <meta property="og:image" content={otherdata.image_url} />
        <meta
          name="twitter:image"
          property="og:image"
          content={otherdata.image_url}
        />
        <meta property="og:title" content={otherdata.title} />
        <meta property="og:description" content={otherdata.title} />
        <meta name="twitter:title" content={otherdata.title} />
        <meta name="twitter:description" content={otherdata.title} />
        <meta property="og:title" content={otherdata.title} />
        <meta name="twitter:title" content={otherdata.title} />
        <meta property="og:description" content={otherdata.title} />
        <meta name="twitter:description" content={otherdata.title} />
      </>
    );
  };
  