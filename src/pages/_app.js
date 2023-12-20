// pages/_app.js
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { wrapper } from "../utils/withRedux";
import Script from "next/script";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      {process.env.NODE_ENV !== "development" && (
        <>
          <Script src="https://accounts.google.com/gsi/client" async defer />
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-HDTNMT20N4`}
          />
          <Script id="GA4" strategy="lazyOnload">
            {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-HDTNMT20N4', {
         page_path: window.location.pathname,
         });
   `}
          </Script>
        </>
      )}

      <style jsx global>{`
        *,
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
