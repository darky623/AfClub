import React, { useEffect, useState } from "react";
import BackLink from "../BackLink/BackLink";
import { toast } from "react-toastify";
import s from "./Plan.module.scss";
import { useRouter } from "next/router";
import Loader from "../../shared/ui/Loader";
import {
  useApplyMethodMutation,
  useEditMemberPlanMutation,
  useGetMemberPlanQuery,
  useGetTrainQuery,
} from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import UiModal from "../../shared/ui/UiModal";
import EditingBtn from "../../shared/ui/EditingBtn";
import { Select, Space } from "antd";

const PlanComponets = ({ id }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  // const { id } = router.query;
  const [dataMehod, setDataMethod] = useState([]);
  const {
    data: resultData,
    isError,
    refetch,
  } = useGetMemberPlanQuery(
    { token, id },
    {
      skip: !token,
    }
  );
  const [value, setValue] = useState("Выберите метод");
  const [editMemberPlan] = useEditMemberPlanMutation();
  const [applyMethod] = useApplyMethodMutation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: resultDataMethod, refetch: refetchMethod } = useGetTrainQuery(
    token,
    {
      skip: !token,
    }
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({
    target: false,
    power: false,
    cardio: false,
    feed: false,
    recovery: false,
  });

  const [createData, setCreateData] = useState({
    target: "",
    power_plan: "",
    cardio_plan: "",
    feed_plan: "",
    recovery_plan: "",
  });

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setDataMethod(resultDataMethod);
      setCreateData(...resultData);
      setLoading(false);
    }
    if (resultDataMethod) {
      setDataMethod(resultDataMethod);
      refetchMethod();
    }
  }, [resultData]);

  const handleSelectChange = async (value, plans) => {
    const planType = {
      plan_type: plans,
      method_id: value,
    };
    try {
      await applyMethod({
        token,
        id,
        planType,
      });
      toast.success("Успешно изменено");
      await refetch();
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleOk = async (type) => {
    try {
      await editMemberPlan({
        token,
        id,
        createData,
      });
      setModalState({ ...modalState, [type]: false });
      toast.success("Успешно изменено");
      await refetch();
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleCancel = (type) => {
    setModalState({ ...modalState, [type]: false });
  };

  const showModal = (type) => {
    setModalState({ ...modalState, [type]: true });
  };

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Группы" currentPage="О группе" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.plan}>
      {/* <BackLink menuTitle="Консультация 23.10" currentPage="План" /> */}
      {data.length !== 0 ? (
        <>
          {data &&
            data.map((items, index) => (
              <div key={index} className={s.plan_cards}>
                <div className={s.plan_card}>
                  <p>
                    <span>Цель: </span>
                    {createData.target ? createData.target : items.target}
                  </p>

                  {/* ////////////////////////////////////////Цель + Модальное окно///////////////////////////////////////////////////////// */}

                  <EditingBtn onClick={() => showModal("target")} />
                  <UiModal
                    nameModal={"Цель"}
                    handleOk={() => handleOk("target")}
                    handleCancel={() => handleCancel("target")}
                    isModalOpen={modalState.target}
                  >
                    <input
                      type="text"
                      placeholder="Напишите цель"
                      maxLength="100"
                      value={createData.target}
                      onChange={(e) =>
                        setCreateData({ ...createData, target: e.target.value })
                      }
                    />

                    <div className={s.plan_select}>
                      <Space>
                        <Select
                          value={value}
                          onChange={(value) => {
                            if (value) {
                              const plans = "target";
                              handleSelectChange(value, plans), setValue(value);
                              setModalState({ ...modalState, target: false });
                            }
                          }}
                        >
                          {dataMehod === undefined
                            ? null
                            : dataMehod[0]?.map((result) => (
                                <Select.Option
                                  key={result.method_id}
                                  value={result.method_id}
                                >
                                  <p>
                                    <span>Метод: </span>
                                    {result.title}
                                  </p>
                                </Select.Option>
                              ))}
                        </Select>
                      </Space>
                    </div>
                  </UiModal>
                </div>

                {/* ////////////////////////////////////////Силовые + Модальное окно/////////////////////////////////////////////////////////// */}

                <div className={s.plan_card}>
                  <p>
                    <span>Силовые: </span>
                    {createData.power_plan
                      ? createData.power_plan
                      : items.power_plan}
                  </p>
                  <EditingBtn onClick={() => showModal("power")} />
                  <UiModal
                    nameModal={"Силовые"}
                    handleOk={() => handleOk("power")}
                    handleCancel={() => handleCancel("power")}
                    isModalOpen={modalState.power}
                  >
                    <input
                      type="text"
                      maxLength="250"
                      placeholder="Напишите план силовых тренировок"
                      value={createData.power_plan}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          power_plan: e.target.value,
                        })
                      }
                    />

                    <div className={s.plan_select}>
                      <Space>
                        <Select
                          value={value}
                          onChange={(value) => {
                            if (value) {
                              const plans = "power_plan";
                              handleSelectChange(value, plans), setValue(value);
                              setModalState({ ...modalState, power: false });
                            }
                          }}
                        >
                          {dataMehod === undefined
                            ? null
                            : dataMehod[0]?.map((result) => (
                                <Select.Option
                                  key={result.method_id}
                                  value={result.method_id}
                                >
                                  <p>
                                    <span>Метод: </span>
                                    {result.title}
                                  </p>
                                </Select.Option>
                              ))}
                        </Select>
                      </Space>
                    </div>
                  </UiModal>
                </div>

                {/* ////////////////////////////////////////Кардио + Модальное окно///////////////////////////////////////////////////////// */}

                <div className={s.plan_card}>
                  <p>
                    <span>Кардио: </span>
                    {createData.cardio_plan
                      ? createData.cardio_plan
                      : items.cardio_plan}
                  </p>
                  <EditingBtn onClick={() => showModal("cardio")} />
                  <UiModal
                    nameModal={"Кардио"}
                    handleOk={() => handleOk("cardio")}
                    handleCancel={() => handleCancel("cardio")}
                    isModalOpen={modalState.cardio}
                  >
                    <input
                      type="text"
                      placeholder="Напишите план кардио-тренировок"
                      value={createData.cardio_plan}
                      maxLength="250"
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          cardio_plan: e.target.value,
                        })
                      }
                    />

                    <div className={s.plan_select}>
                      <Space>
                        <Select
                          value={value}
                          onChange={(value) => {
                            if (value) {
                              const plans = "cardio_plan";
                              handleSelectChange(value, plans), setValue(value);
                              setModalState({ ...modalState, cardio: false });
                            }
                          }}
                        >
                          {dataMehod === undefined
                            ? null
                            : dataMehod[0]?.map((result) => (
                                <Select.Option
                                  key={result.method_id}
                                  value={result.method_id}
                                >
                                  <p>
                                    <span>Метод: </span>
                                    {result.title}
                                  </p>
                                </Select.Option>
                              ))}
                        </Select>
                      </Space>
                    </div>
                  </UiModal>
                </div>

                {/* ////////////////////////////////////////Питание + Модальное окно///////////////////////////////////////////////////////////// */}

                <div className={s.plan_card}>
                  <p>
                    <span>Питание: </span>
                    {createData.feed_plan
                      ? createData.feed_plan
                      : items.feed_plan}
                  </p>
                  <EditingBtn onClick={() => showModal("feed")} />
                  <UiModal
                    nameModal={"Питание"}
                    handleOk={() => handleOk("feed")}
                    handleCancel={() => handleCancel("feed")}
                    isModalOpen={modalState.feed}
                  >
                    <input
                      type="text"
                      placeholder="Напишите план по питанию"
                      maxLength="250"
                      value={createData.feed_plan}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          feed_plan: e.target.value,
                        })
                      }
                    />
                    <div className={s.plan_select}>
                      <Space>
                        <Select
                          value={value}
                          onChange={(value) => {
                            if (value) {
                              const plans = "feed_plan";
                              handleSelectChange(value, plans), setValue(value);
                              setModalState({ ...modalState, feed: false });
                            }
                          }}
                        >
                          {dataMehod === undefined
                            ? null
                            : dataMehod[0]?.map((result) => (
                                <Select.Option
                                  key={result.method_id}
                                  value={result.method_id}
                                >
                                  <p>
                                    <span>Метод: </span>
                                    {result.title}
                                  </p>
                                </Select.Option>
                              ))}
                        </Select>
                      </Space>
                    </div>
                  </UiModal>
                </div>

                {/* ////////////////////////////////////////Восстановление + Модальное окно//////////////////////////////////////////////////////// */}

                <div className={s.plan_card}>
                  <p>
                    <span>Восстановление: </span>
                    {createData.recovery_plan
                      ? createData.recovery_plan
                      : items.recovery_plan}
                  </p>
                  <EditingBtn onClick={() => showModal("recovery")} />
                  <UiModal
                    nameModal={"Восстановление"}
                    handleOk={() => handleOk("recovery")}
                    handleCancel={() => handleCancel("recovery")}
                    isModalOpen={modalState.recovery}
                  >
                    <input
                      type="text"
                      placeholder="Напишите план по восстонавлению"
                      maxLength="250"
                      value={createData.recovery_plan}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          recovery_plan: e.target.value,
                        })
                      }
                    />

                    <div className={s.plan_select}>
                      <Space>
                        <Select
                          value={value}
                          onChange={(value) => {
                            if (value) {
                              const plans = "recovery_plan";
                              handleSelectChange(value, plans), setValue(value);
                              setModalState({ ...modalState, recovery: false });
                            }
                          }}
                        >
                          {dataMehod === undefined
                            ? null
                            : dataMehod[0]?.map((result) => (
                                <Select.Option
                                  key={result.method_id}
                                  value={result.method_id}
                                >
                                  <p>
                                    <span>Метод: </span>
                                    {result.title}
                                  </p>
                                </Select.Option>
                              ))}
                        </Select>
                      </Space>
                    </div>
                  </UiModal>
                </div>
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
  );
};

export default PlanComponets;
