import Head from "next/head";
import Header from "./header/Header";
import { useEffect, useState } from "react";
const Layout = (props) => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
  return (
    <>
      <Head>
        <link rel="shortcut  icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Breaking News" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="786" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="theme-color" content="#07007a" />
        <meta
          name="keywords"
          content="Hindi news, हिंदी न्यूज़ , Hindi Samachar, हिंदी समाचार, Latest News in Hindi, Breaking News in Hindi, ताजा ख़बरें, KP News"
        />
        <meta name="twitter:url" content={currentUrl} />
        <meta property="og:url" content={currentUrl} />
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
