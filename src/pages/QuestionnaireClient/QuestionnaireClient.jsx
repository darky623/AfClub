import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import { toast } from "react-toastify";
import s from "./QuestionnaireClient.module.scss";
import {
  useGetQuestionnaireQuery,
  useGetQuestionnaireStartClientQuery,
  useEditMemberProfileClientMutation,
} from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import { useRouter } from "next/router";
import NoInform from "../../shared/ui/NoInform";
import SaveBtn from "../../shared/ui/SaveBtn";
import { Select } from "antd";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";

const Questionnaire = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [formChanged, setFormChanged] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [savedFormData, setSavedFormData] = useState({});
  const { token } = router.query;
  const isKeyboardOpen = useKeyboardStatus();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      setTokens(token);
    } else if (localToken) {
      setTokens(localToken);
    }
  }, [token]);

  useEffect(() => {
    if (isKeyboardOpen) {
      const height = window.innerHeight * 0.35;
      setKeyboardHeight(height);
    } else {
      setKeyboardHeight(0);
    }
  }, [isKeyboardOpen]);

  const {
    data: resultData,
    isError,
    refetch,
  } = useGetQuestionnaireQuery(tokens, {
    skip: !tokens,
  });

  const { data: resultDataStart, isErrorStart } =
    useGetQuestionnaireStartClientQuery(
      { token: tokens },
      {
        skip: !tokens,
      }
    );

  const [editMemberProfileMutation] = useEditMemberProfileClientMutation();

  const handleSaveClick = async () => {
    try {
      await editMemberProfileMutation({
        token: tokens,
        formData,
      });
      setSavedFormData({ ...formData });
      setFormChanged(false);
      toast.success("Успешно изменено");
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
    setFormChanged(true);
  };

  useEffect(() => {
    if (resultDataStart && !isErrorStart) {
      setFormData(resultDataStart[0]);
    }
  }, [resultDataStart, isErrorStart]);

  useEffect(() => {
    if (resultData) {
      refetch();
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

  if (loading || data === null) {
    return <Loader />;
  }

  return (
    <div className={s.group_detail} style={{ paddingBottom: keyboardHeight }}>
      <BackLink menuTitle="назад" currentPage="Анкета" disabled={formChanged} />
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
                    className={s.questionnaire__input}
                    maxLength="100"
                    type="text"
                    onChange={(e) =>
                      handleInputChange(question.field_id, e.target.value)
                    }
                    value={formData[question.field_id] || ""}
                  />
                ) : question.input_type === "number" ? (
                  <input
                    className={s.questionnaire__input}
                    maxLength="100"
                    type="text"
                    onChange={(e) =>
                      handleInputChange(
                        question.field_id,
                        Math.max(0, e.target.value)
                      )
                    }
                    value={formData[question.field_id] || ""}
                  />
                ) : (
                  <Select
                    className={s.questionnaire__select}
                    onChange={(value) =>
                      handleInputChange(question.field_id, value)
                    }
                    value={formData[question.field_id] || undefined}
                  >
                    {question.input_options.map((option) => (
                      <Select.Option
                        className={s.questionnaire__option}
                        key={option}
                        value={option}
                      >
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </div>
            ))}
            <SaveBtn nameBtn={"Сохранить"} onClick={handleSaveClick} />
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
