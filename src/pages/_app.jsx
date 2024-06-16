import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { store } from "../redux/store";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isQuestionnaireClientPage =
      router.pathname === "/QuestionnaireClient/QuestionnaireClient";

    if (isQuestionnaireClientPage) {
      document.body.classList.add("questionnaire-client-background");
      document.body.classList.remove("questionnaire-client-background-white");
    } else {
      document.body.classList.add("questionnaire-client-background-white");
      document.body.classList.remove("questionnaire-client-background");
    }
    return () => {
      document.body.classList.remove("questionnaire-client-background");
      document.body.classList.remove("questionnaire-client-background-white");
    };
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
