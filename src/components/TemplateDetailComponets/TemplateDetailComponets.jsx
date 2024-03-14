import React from "react";
import { toast } from "react-toastify";
import BackLink from "../BackLink/BackLink";
import UiModal from "../../shared/ui/UiModal";
import AddButton from "../../shared/ui/AddButton";
import s from "./Template.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import paint from "../../../public/paint.svg";
import {
  useGetMethodQuery,
  useCreateExerciseMutation,
  useCreateTrainingMutation,
  useEditTrainingMutation,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
  useGetExercisesQuery,
} from "../../redux/api";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";
import EditingBtn from "../../shared/ui/EditingBtn";
import DeletBtn from "../../shared/ui/DeletBtn";
import { Select, Space } from "antd";
import UiButton from "../../shared/ui/UiButton";

const TemplateDetailComponets = ({ id }) => {
  const router = useRouter();
  // const { id } = router.query;
  const [trainingId, setTrainingId] = useState(null);
  const [exerciseId, setExerciseId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Выберите тренировку");
  const [selectedOptionExercises, setSelectedOptionExercises] = useState(
    "Выберите группу мышц"
  );
  const [selectedOptionEx, setSelectedOptionEx] = useState(
    "Выберите Упражнение"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpenCreateTraining, setIsOpenCreateTraining] = useState(false);
  const [isOpenEditTraining, setIsOpenEditTraining] = useState(false);
  const [isOpenCreateExercise, setIsOpenCreateExercise] = useState(false);
  const [isOpenEditExercise, setIsOpenEditExercise] = useState(false);
  const [isOpenDeleteExercise, setIsOpenDeleteExercise] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [data, setData] = useState([]);
  const [exsType, setExsType] = useState("");
  const [exsTypeId, setExsTypeId] = useState("");
  const [newTrainingName, setNewtrainingName] = useState("");
  const [muscleName, setMuscleName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [approaches, setApproaches] = useState("");
  const [musle, setMusle] = useState("");
  const [musleFunc, setMusleFun] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const {
    data: resultData,
    isError,
    refetch,
  } = useGetMethodQuery(
    { token, id },
    {
      skip: !token,
    }
  );
  useGetExercisesQuery;

  const { data: resultExercises, isErrorExercises } = useGetExercisesQuery(
    { token },
    {
      skip: !token,
    }
  );

  const [createTraining] = useCreateTrainingMutation();
  const [editTraining] = useEditTrainingMutation();
  const [createExercise] = useCreateExerciseMutation();
  const [editExercise] = useEditExerciseMutation();
  const [deleteExercise] = useDeleteExerciseMutation();

  /* //////////////////////////////////Функция добавления тренировки//////////////////////////////// */

  const sendCreateTraining = async () => {
    if (!trainingName) {
      alert("Заполните пожалуйста поле");
      return;
    }

    const formData = {
      title: trainingName,
    };

    try {
      await createTraining({
        token,
        formData,
        method_id: id,
      });
      setTrainingName("");
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  /* ////////////////////////////////Функция изменение название тренировки//////////////////////////// */

  const sendEditTraining = async () => {
    if (newTrainingName === "") {
      alert("Заполните пожалуйста поле");
      return;
    }

    const formData = {
      title: newTrainingName,
    };

    try {
      await editTraining({
        token,
        formData,
        method_id: id,
        training_id: trainingId,
      });
      setTrainingName("");
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  /* ////////////////////////////////Функция добавления подхода//////////////////////////// */

  const sendСreateExercise = async () => {
    if (muscleName === "" || exerciseName === "" || approaches === "") {
      alert("Заполните пожалуйста заполните поля");
      return;
    }

    const formData = {
      type: muscleName,
      title: exerciseName,
      feel: approaches,
      type: exsType,
    };

    try {
      await createExercise({
        token,
        formData,
        method_id: id,
        training_id: trainingId,
      });
      setApproaches("");
      setExerciseName("");
      setMuscleName("");
      setExsType("");
      setExsTypeId("");
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    } finally {
      setSelectedOptionExercises("Выберите группу мышц");
      setSelectedOptionEx("Выберите Упражнение");
    }
  };

  /* ////////////////////////////////Функция изменение подхода//////////////////////////// */

  const sendEditExercise = async () => {
    if (muscleName === "" || exerciseName === "" || approaches === "") {
      alert("Заполните пожалуйста заполните поля");
      return;
    }

    const formData = {
      type: muscleName,
      title: exerciseName,
      feel: approaches,
      type: exsType,
    };

    try {
      await editExercise({
        token,
        formData,
        method_id: id,
        training_id: trainingId,
        exercise_id: exerciseId,
      });
      setApproaches("");
      setExerciseName("");
      setMuscleName("");
      setExsType("");
      setExsTypeId("");
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    } finally {
      setSelectedOptionExercises("Выберите группу мышц");
      setSelectedOptionEx("Выберите Упражнение");
    }
  };

  /* ////////////////////////////////Функция удаления подхода//////////////////////////// */

  const sendDeleteExercise = async () => {
    try {
      await deleteExercise({
        token,
        method_id: id,
        training_id: trainingId,
        exercise_id: exerciseId,
      });
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData, id]);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setTrainingId(value);
  };

  const handleSelectChangeExercises = (value) => {
    setSelectedOptionExercises(value);
  };

  const handleSelectChangeEx = (value) => {
    setSelectedOptionEx(value);
  };

  if (isError || error) {
    return (
      <>
        <BackLink menuTitle="Методики" currentPage="Программа" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading || id === undefined || data === null) {
    return <Loader />;
  }

  return (
    <div className={s.template_detail}>
      {/* <BackLink menuTitle="Методики" currentPage="Программы" /> */}

      {data.map((titles) => (
        <div key={titles.title}>
          <h1>{titles.title}</h1>
          <h4>{titles.description}</h4>
        </div>
      ))}

      {/* ///////////////////Модалка добавления тренировки//////////////////////////////// */}

      <UiModal
        nameModal={"создайте тренировку"}
        handleOk={() => {
          sendCreateTraining(), setIsOpenCreateTraining(false);
        }}
        handleCancel={() => {
          setIsOpenCreateTraining(false);
        }}
        isModalOpen={isOpenCreateTraining}
      >
        <input
          type="text"
          placeholder="Напишите название тренировки"
          maxLength={100}
          value={trainingName}
          onChange={(e) => setTrainingName(e.target.value)}
        />
      </UiModal>

      {/* ////////////////////////////////Модалка изменение название тренировки//////////////////////////// */}

      <UiModal
        nameModal={"измените имя тренировки"}
        handleOk={() => {
          sendEditTraining(), setIsOpenEditTraining(false);
        }}
        handleCancel={() => {
          setIsOpenEditTraining(false);
        }}
        isModalOpen={isOpenEditTraining}
      >
        <input
          type="text"
          placeholder="Напишите новое название тренировки"
          maxLength={100}
          value={newTrainingName}
          onChange={(e) => setNewtrainingName(e.target.value)}
        />
      </UiModal>

      {/* ////////////////////////////////Модалка сооздания подхода//////////////////////////// */}

      <UiModal
        nameModal={"Упражнения"}
        handleOk={() => {
          sendСreateExercise(), setIsOpenCreateExercise(false);
        }}
        handleCancel={() => {
          setIsOpenCreateExercise(false);
        }}
        isModalOpen={isOpenCreateExercise}
      >
        <Space>
          <Select
            value={selectedOptionExercises}
            onChange={(value) => {
              const [type, id] = value.split(",");
              handleSelectChangeExercises(type),
                setMuscleName(type),
                setExsTypeId(type);
              setExsType(id);
            }}
          >
            {resultExercises === undefined
              ? null
              : resultExercises[0]?.map((result) => (
                  <Select.Option
                    key={result.exs_type_id}
                    value={`${result.exs_type},${result.exs_type_id}`}
                  >
                    <p>
                      <span>Группа мышц: </span>
                      {result.exs_type}
                    </p>
                  </Select.Option>
                ))}
          </Select>
        </Space>

        <Space>
          <Select
            value={selectedOptionEx}
            onChange={(value) => {
              handleSelectChangeEx(value), setExerciseName(value);
            }}
          >
            {/* {dropDown && ( */}
            <Select.Option value={""}>
              <p onClick={() => setMusleFun(true)}>
                <span>
                  <Image
                    src={paint}
                    alt="paint"
                    width={12}
                    height={12}
                    style={{ marginRight: "6px" }}
                  />
                  Свое yпражнение
                </span>
              </p>
            </Select.Option>
            {/* )} */}
            {resultExercises === undefined
              ? null
              : resultExercises[0]?.map((result) =>
                  result.exs_type === exsTypeId
                    ? result.exercises.map((ex) => (
                        <Select.Option key={ex.index} value={ex}>
                          <p
                            onMouseEnter={() => setDropDown(true)}
                            onClick={() => setMusleFun(false)}
                          >
                            <span>Упражнение: </span>
                            {ex}
                          </p>
                        </Select.Option>
                      ))
                    : null
                )}
            {exsTypeId === "" ? (
              <Select.Option key="1" disabled>
                <p>
                  <span>Выберите группу мышц</span>
                </p>
              </Select.Option>
            ) : null}
            )
          </Select>
        </Space>
        {musleFunc === true ? (
          <input
            type="text"
            placeholder="Название"
            maxLength={100}
            value={musle}
            onChange={(e) => {
              handleSelectChangeEx(e.target.value),
                setExerciseName(e.target.value),
                setMusle(e.target.value);
            }}
          />
        ) : (
          " "
        )}

        <input
          type="text"
          placeholder="Комментарий"
          maxLength={100}
          value={approaches}
          onChange={(e) => setApproaches(e.target.value)}
        />
      </UiModal>

      {/* ////////////////////////////////Модалка изменения подхода//////////////////////////// */}
      <UiModal
        nameModal={"Упражнения"}
        handleOk={() => {
          sendEditExercise(), setIsOpenEditExercise(false);
        }}
        handleCancel={() => {
          setIsOpenEditExercise(false);
        }}
        isModalOpen={isOpenEditExercise}
      >
        <Space>
          <Select
            value={selectedOptionExercises}
            onChange={(value) => {
              handleSelectChangeExercises(value),
                setMuscleName(value),
                setExsTypeId(value);
            }}
          >
            {resultExercises === undefined
              ? null
              : resultExercises[0]?.map((result) => (
                  <Select.Option
                    key={result.exs_type_id}
                    value={result.exs_type}
                  >
                    <p>
                      <span>Группа мышц: </span>
                      {result.exs_type}
                    </p>
                  </Select.Option>
                ))}
          </Select>
        </Space>

        <Space>
          <Select
            value={selectedOptionEx}
            onChange={(value) => {
              handleSelectChangeEx(value), setExerciseName(value);
            }}
          >
            {/* {dropDown && ( */}
            <Select.Option value={""}>
              <p onClick={() => setMusleFun(true)}>
                <span>
                  <Image
                    src={paint}
                    alt="paint"
                    width={12}
                    height={12}
                    style={{ marginRight: "6px" }}
                  />
                  Cвое yпражнение
                </span>
              </p>
            </Select.Option>
            {/* )} */}
            {resultExercises === undefined
              ? null
              : resultExercises[0]?.map((result) =>
                  result.exs_type === exsTypeId
                    ? result.exercises.map((ex) => (
                        <Select.Option key={ex.index} value={ex}>
                          <p
                            onMouseEnter={() => setDropDown(true)}
                            onClick={() => setMusleFun(false)}
                          >
                            <span>Упражнение: </span>
                            {ex}
                          </p>
                        </Select.Option>
                      ))
                    : null
                )}
            (
            {exsTypeId === "" ? (
              <Select.Option key="1" disabled>
                <p>
                  <span>Выберите группу мышц</span>
                </p>
              </Select.Option>
            ) : null}
            )
          </Select>
        </Space>
        {musleFunc === true ? (
          <input
            type="text"
            placeholder="Название"
            maxLength={100}
            value={musle}
            onChange={(e) => {
              handleSelectChangeEx(e.target.value),
                setExerciseName(e.target.value),
                setMusle(e.target.value);
            }}
          />
        ) : (
          " "
        )}
        <input
          type="text"
          placeholder="Комментарий"
          maxLength={100}
          value={approaches}
          onChange={(e) => setApproaches(e.target.value)}
        />
      </UiModal>

      {/* ////////////////////////////////Удаление подхода//////////////////////////// */}

      <UiModal
        nameModal={"Упражнения"}
        handleOk={() => {
          sendDeleteExercise(), setIsOpenDeleteExercise(false);
        }}
        handleCancel={() => {
          setIsOpenDeleteExercise(false);
        }}
        isModalOpen={isOpenDeleteExercise}
      >
        <p>Вы уверены, что хотите удалить подход?</p>
      </UiModal>

      {data.length !== 0 ? (
        <>
          {data[0]?.program.length !== 0 ? (
            <>
              <div className={s.wrepper__btnTrai}>
                <div className={s.wrepper__editingBtn}>
                  <UiButton
                    onClick={() => {
                      setIsOpenEditTraining(true);
                    }}
                    nameBtn={"Изменить название тренировки"}
                  />
                </div>
                <div className={s.wrepper__addButton}>
                  <UiButton
                    onClick={() => {
                      setIsOpenCreateTraining(true);
                    }}
                    nameBtn={"Добавить тренировку"}
                  />
                </div>
              </div>
              <div className={s.template_detail_select}>
                <Space>
                  <Select value={selectedOption} onChange={handleSelectChange}>
                    {data[0]?.program.map((training) => (
                      <Select.Option
                        key={training.title}
                        value={training.training_id}
                      >
                        <p>
                          <span>Тренировка: </span>
                          {training.title}
                        </p>
                      </Select.Option>
                    ))}
                  </Select>
                </Space>
              </div>
            </>
          ) : (
            <div className={s.template_detail_select}>
              <p>На данный момент, нет ни одной тренировки</p>
              <div className={s.template_detail_wrapper__error}>
                <UiButton
                  onClick={() => {
                    setIsOpenCreateTraining(true);
                  }}
                  nameBtn={"Создайте тренировку прямо сейчас"}
                />
              </div>
            </div>
          )}
          {data[0].program.length === 0 ? (
            <div className={s.template_detail_quantity}>
              <p>
                Упражнений:<span>0</span>
              </p>
              <AddButton
                onClick={() => {
                  setIsOpenCreateExercise(true);
                }}
              />
            </div>
          ) : (
            <>
              {data[0]?.program.map((training) =>
                training.training_id === selectedOption ? (
                  <React.Fragment key={training.title}>
                    <div className={s.template_detail_quantity}>
                      <p>
                        Упражнений:<span> {training.exercises.length}</span>
                      </p>
                      <AddButton
                        onClick={() => {
                          setIsOpenCreateExercise(true);
                        }}
                      />
                    </div>
                    {training.exercises.map((exercis) => (
                      <React.Fragment key={exercis.exercise_id}>
                        <div className={s.template_detail_exercises}>
                          <div className={s.template_detail_exercises_desc}>
                            <h3>
                              Группа мышц : <span>{exercis.type_title}</span>
                            </h3>
                            <h3>
                              Название: <span>{exercis.title}</span>
                            </h3>
                            <h3>
                              Комментарий : <span>{exercis.feel}</span>
                            </h3>
                          </div>
                          <div className={s.template_detail_exercises_btns}>
                            <EditingBtn
                              onClick={() => {
                                setIsOpenEditExercise(true),
                                  setExerciseId(exercis.exercise_id);
                              }}
                            />
                            <DeletBtn
                              onClick={() => {
                                setIsOpenDeleteExercise(true),
                                  setExerciseId(exercis.exercise_id);
                              }}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ) : null
              )}
            </>
          )}
        </>
      ) : (
        <>
          <BackLink menuTitle="Группы" currentPage="О группе" />
          <NoInform text="empty" />
        </>
      )}
    </div>
  );
};

export default TemplateDetailComponets;
