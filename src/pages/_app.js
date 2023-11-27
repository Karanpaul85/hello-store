// pages/_app.js
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { wrapper } from "../utils/withRedux";
import { useEffect } from "react";
import { initGA, logPageView } from "@/utils/ga";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return (
    <>
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
