import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import ShareBTN from "./shareBtn/ShareBTN";
import { useDispatch } from "react-redux";
import { sendUserDetails } from "@/redux/slices/oneTapLoginSlice";
import { useCookies } from "react-cookie";
const Layout = (props) => {
  const [cookies] = useCookies(["auth"]);
  const { auth } = cookies;
  const dispatch = useDispatch();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="shortcut  icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Breaking News" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="786" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#07007a" />
        <meta
          name="keywords"
          content="Hindi news, हिंदी न्यूज़ , Hindi Samachar, हिंदी समाचार, Latest News in Hindi, Breaking News in Hindi, ताजा ख़बरें, KP News"
        />
        <meta name="twitter:url" content={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta
          name="google-site-verification"
          content="FoMfRhUffA7vlR8b57xo5kmsRQd5fU50E0Grpkiwk8g"
        />
      </Head>
      <Header />
      <main>
        <div className="container">{props.children}</div>
      </main>
      <ShareBTN />
    </GoogleOAuthProvider>
  );
};

export default Layout;
