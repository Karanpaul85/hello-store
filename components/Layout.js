/* google google */
import Head from "next/head";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import ShareBTN from "./shareBtn/ShareBTN";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/slices/oneTapLoginSlice";
import { useCookies } from "react-cookie";
const Layout = (props) => {
  const [cookies] = useCookies(["auth"]);
  const { auth } = cookies;
  const dispatch = useDispatch();
  const [currentUrl, setCurrentUrl] = useState("");
  //decode the one tap login token
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const onTapLogin = (response) => {
    const decodedData = parseJwt(response.credential);
    dispatch(setUserDetails(decodedData));
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  useEffect(() => {
    if (!auth) {
      checkWindow();
    }else{
      dispatch(setUserDetails(auth));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkWindow() {
    const checkGoogle = setInterval(() => {
      if (window && window.google) {
        // // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
          client_id:
            "454659208397-33luu09om2cg5e62tna7uvfipqufh9lj.apps.googleusercontent.com",
          callback: onTapLogin,
        });
        // eslint-disable-next-line no-undef
        google.accounts.id.prompt((notification) => {
          // console.log("Notification", notification);
        });
        clearInterval(checkGoogle);
      }
    }, 100);
  }
  return (
    <>
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
        <meta name="google-site-verification" content="FoMfRhUffA7vlR8b57xo5kmsRQd5fU50E0Grpkiwk8g" />
      </Head>
      <Header />
      <main>
        <div className="container">{props.children}</div>
      </main>
      <ShareBTN />
    </>
  );
};

export default Layout;
