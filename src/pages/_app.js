// pages/_app.js
import { Provider } from "react-redux";
import { wrapper } from "../utils/withRedux";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MyApp;
