import "../styles/globals.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../store/index";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
