import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout.jsx";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
