// pages/_app.js
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../utils/withRedux";
import { Poppins } from "next/font/google";

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
      <style jsx global>{`
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
