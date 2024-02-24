import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackLink from "../../components/BackLink/BackLink";
import EditingBtn from "../../shared/ui/EditingBtn";
import AddButton from "../../shared/ui/AddButton";
import s from "./Templates.module.scss";
import Image from "next/image";
import Link from "next/link";
import NoInform from "../../shared/ui/NoInform";
import DeletBtn from "../../shared/ui/DeletBtn";
import {
  useGetTrainQuery,
  useCreateMethodMutation,
  useEditMethodMutation,
  useDeleteMethodMutation,
} from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import UiModal from "../../shared/ui/UiModal";

const Templates = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteExercise, setIsOpenDeleteExercise] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [methodName, setMethodName] = useState("");
  const [methodDescription, setMethodDescription] = useState("");
  const [newMethodName, setNewMethodName] = useState("");
  const [methodId, setNewMethodId] = useState("");
  const [token, setToken] = useState(null);
  const [modalStates, setModalStates] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const {
    data: resultData,
    isError,
    refetch,
  } = useGetTrainQuery(token, {
    skip: !token,
  });

  const [createService] = useCreateMethodMutation();
  const [editMethod] = useEditMethodMutation();
  const [deleteMethod] = useDeleteMethodMutation();

  const sendEditNewMethod = async () => {
    if (!newMethodName) {
      alert("Заполните пожалуйста поле");
      return;
    }
    const createData = {
      title: newMethodName,
      description: methodDescription,
    };
    try {
      await editMethod({
        token,
        createData,
        method_id: methodId,
      });
      toast.success("Успешно изменено");
      setNewMethodId("");
      refetch();
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      setError(true);
    }
    setNewMethodName("");
    setMethodDescription("");
  };

  const sendEditMethod = async () => {
    if (!methodName || !methodDescription) {
      alert("Заполните пожалуйста оба поля");
      return;
    }

    const createData = {
      title: methodName,
      description: methodDescription,
    };
    try {
      await createService({
        token,
        createData,
      });
      setMethodDescription("");
      toast.success("Успешно изменено");
      refetch();
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      setError(true);
    }
    setMethodDescription("");
    setMethodName("");
  };

  /* ////////////////////////////////Функция удаления метода//////////////////////////// */

  const sendDeleteMethod = async () => {
    try {
      await deleteMethod({
        token,
        method_id: methodId,
      });
      toast.success("Успешно изменено");
      setNewMethodId("");
      refetch();
    } catch (error) {
      setError(true);
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  useEffect(() => {
    if (resultData) {
      const initialModalStates = resultData.reduce((acc, item) => {
        acc[item.method_id] = false;
        return acc;
      }, {});
      setModalStates(initialModalStates);
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (isError || error) {
    <>
      <BackLink menuTitle="Меню" currentPage="Методики" />
      <NoInform text="error" />
    </>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.templates}>
      <div className={s.templates_shared}>
        <BackLink menuTitle="Меню" currentPage="Методики" />
        <AddButton
          onClick={() => {
            setIsOpen(true);
          }}
        />
        {/* //////////////////////////////////добавление методики/////////////////////////////////// */}
        <UiModal
          nameModal={"Название методики"}
          handleOk={() => {
            sendEditMethod(), setIsOpen(false);
          }}
          handleCancel={() => {
            setIsOpen(false);
          }}
          isModalOpen={isOpen}
        >
          <input
            type="text"
            placeholder="Напишите название новой методики"
            maxLength={25}
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Напишите описание метода"
            maxLength={120}
            value={methodDescription}
            onChange={(e) => setMethodDescription(e.target.value)}
          />
        </UiModal>

        {/* ////////////////////////////////////Модалка удаления/////////////////////////////// */}
        <UiModal
          nameModal={"Удаление методики"}
          handleOk={() => {
            sendDeleteMethod(), setIsOpenDeleteExercise(false);
          }}
          handleCancel={() => {
            setIsOpenDeleteExercise(false);
          }}
          isModalOpen={isOpenDeleteExercise}
        >
          <p>Вы уверены, что хотите удалить метод?</p>
        </UiModal>
      </div>
      <div className={s.templates_transitions}>
        {data.length !== 0 ? (
          data[0].map((templates) => (
            <div className={s.wrapper__link} key={templates.method_id}>
              <div className={s.wraper__DeletBtn}>
                <DeletBtn
                  onClick={() => {
                    setIsOpenDeleteExercise(true);
                    setNewMethodId(templates.method_id);
                  }}
                />
              </div>
              <div className={s.wraper__EditingBtn}>
                <EditingBtn
                  onClick={() => {
                    setModalStates((prevState) => ({
                      ...prevState,
                      [templates.method_id]: true,
                    }));
                    setNewMethodId(templates.method_id);
                  }}
                />
              </div>
              <Link href={`/TemplateDetail/${templates.method_id}`}>
                {templates.title}
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <UiModal
                nameModal={"Изменение название методики"}
                handleOk={() => {
                  sendEditNewMethod();
                  setModalStates((prevState) => ({
                    ...prevState,
                    [templates.method_id]: false,
                  }));
                }}
                handleCancel={() => {
                  setModalStates((prevState) => ({
                    ...prevState,
                    [templates.method_id]: false,
                  }));
                }}
                isModalOpen={modalStates[templates.method_id]}
              >
                <input
                  type="text"
                  placeholder="Напишите название новой методики"
                  maxLength={25}
                  value={newMethodName}
                  onChange={(e) => {
                    setNewMethodName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Напишите описание метода"
                  maxLength={120}
                  value={methodDescription}
                  onChange={(e) => setMethodDescription(e.target.value)}
                />
              </UiModal>
            </div>
          ))
        ) : (
          <NoInform text="empty" />
        )}
      </div>
    </div>
  );
};

export default Templates;
