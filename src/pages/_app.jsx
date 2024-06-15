import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isQuestionnaireClientPage =
    router.pathname === "/QuestionnaireClient/QuestionnaireClient";

  return (
    <Provider store={store}>
      <div
        className={
          isQuestionnaireClientPage ? "questionnaire-client-background" : "#fff"
        }
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
