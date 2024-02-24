import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Questionnaire.module.scss";
import {
  useGetQuestionnaireQuery,
  useGetQuestionnaireStartQuery,
} from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import { useRouter } from "next/router";
import NoInform from "../../shared/ui/NoInform";

const Questionnaire = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const { data: resultData, isError } = useGetQuestionnaireQuery(token, {
    skip: !token,
  });

  const { data: resultDataStart, isErrorStart } = useGetQuestionnaireStartQuery(
    { token, id },
    {
      skip: !token,
    }
  );

  useEffect(() => {
    if (resultDataStart && !isErrorStart) {
      setFormData(resultDataStart[0]);
    }
  }, [resultDataStart, isErrorStart]);

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData, id]);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Группы" currentPage="О группе" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading || id === undefined || data === null) {
    return <Loader />;
  }

  return (
    <div className={s.group_detail}>
      <BackLink menuTitle="назад" currentPage="Анкета" />
      <div className={s.group_detail_desc}>
        {data?.length !== 0 ? (
          <>
            {data.map((question) => (
              <div
                className={s.questionnaire__wrapper__input}
                key={question.field_id}
              >
                <p className={s.questionnaire__input__name}>
                  {question.question}
                </p>
                {question.input_type === "text" ? (
                  <input
                    readOnly
                    className={s.questionnaire__input}
                    type="text"
                    value={formData[question.field_id] || ""}
                  />
                ) : question.input_type === "number" ? (
                  <input
                    readOnly
                    className={s.questionnaire__input}
                    type="text"
                    value={formData[question.field_id] || ""}
                  />
                ) : (
                  <input
                    readOnly
                    type="text"
                    className={s.questionnaire__input}
                    value={formData[question.field_id] || ""}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <BackLink menuTitle="Группы" currentPage="О группе" />
            <NoInform text="empty" />
          </>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
