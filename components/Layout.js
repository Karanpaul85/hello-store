import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import parse from "html-react-parser";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./header/Header";
import imgDataURLs from "@/utils/imageUtil";

const BottomBar = dynamic(() => import("./bottomBar/BottomBar"));

const Layout = ({ topright = true, children, showBottomBar = true }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Head>
        <link
          rel="preload"
          as="image"
          href={imgDataURLs.placeholderImg}
          fetchpriority="high"
        />
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
        {parse(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NSZM77B3');</script>`)}
        ;
      </Head>
      <Header topright={topright} />
      <main>
        <div className="container">{children}</div>
        {parse(`<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSZM77B3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`)}
      </main>

      {showBottomBar && <BottomBar />}
      <SpeedInsights />
    </GoogleOAuthProvider>
  );
};

export default Layout;
