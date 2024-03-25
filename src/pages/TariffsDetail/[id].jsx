import React, { useEffect, useState } from "react";
import s from "./TarrifsDetail.module.scss";
import { toast } from "react-toastify";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import UiSelect from "../../shared/ui/UiSelect";
import { useEditServicesMutation, useGetServicesQuery } from "../../redux/api";
import { useRouter } from "next/router";
import { Input } from "antd";

const { TextArea } = Input;

const TariffsDetail = () => {
  const router = useRouter();
  const isBrowser = typeof window !== "undefined";
  const [focused, setFocused] = useState(false);

  const [token, setToken] = useState(null);

  const { id } = router.query;

  const options = ["Ведение", "Короткая", "Выступление"];

  const [editService] = useEditServicesMutation();

  const { data: resultData, isError } = useGetServicesQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [modalState, setModalState] = useState({
    title: false,
    description: false,
    price: false,
  });

  const [editData, setEditData] = useState({
    duration: 0,
    title: "",
    description: "",
    price: "",
    type: "",
  });

  useEffect(() => {
    if (resultData && id) {
      const foundItem = resultData.find(
        (item) => item.service_id === parseInt(id)
      );
      if (foundItem) {
        setEditData(foundItem);
      }
    }
  }, [resultData]);

  const handleSelectChange = (selectedValue) => {
    let selected = "";
    const selectedMap = {
      Ведение: "long",
      Короткая: "short",
      Выступление: "speech",
    };

    selected = selectedMap[selectedValue] || "";
    setEditData({ ...editData, type: selected });
  };

  const sendEditMethod = async () => {
    setEditData({ title: "", description: "", price: "", duration: 0 });
    try {
      await editService({
        token,
        id,
        editData,
      });
      toast.success("Успешно изменено");
      router.back();
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Услуги" currentPage="Изменить" />
        <NoInform text="error" />
      </>
    );
  }

  console.log(resultData);

  return (
    <div className={s.tarrifs_detail}>
      <BackLink menuTitle="Услуги" currentPage="Изменить" />
      <div className={s.tarrifs_detail_informations}>
        <div className={s.tarrifs_detail_informations_type}>
          <UiSelect
            type={"Тип услуги:"}
            options={options}
            onSelectChange={handleSelectChange}
          />
        </div>
        {editData.type === "short" ? (
          <div className={s.tarrifs_detail_informations_name}>
            <p>
              <span>Время:</span>{" "}
            </p>
            <div className={s.tarrifs_detail_time}>
              <TimeInput
                value={editData.duration}
                onChange={(newValue) =>
                  setEditData({ ...editData, duration: newValue })
                }
              />
            </div>
          </div>
        ) : null}
        <div className={s.tarrifs_detail_informations_name}>
          <p>
            <span>Название: </span>
          </p>
          <input
            type="text"
            placeholder="Название услуги"
            maxLength={25}
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        </div>
        <div className={s.tarrifs_detail_informations_desc}>
          <p>
            <span>Описание:</span>
          </p>
          <textarea
            type="text"
            placeholder="Описание услуги"
            maxLength={250}
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
        </div>
        <div className={s.tarrifs_detail_informations_price}>
          <p>
            <span>Стоимость: </span>
          </p>
          <input
            type="number"
            min={0}
            max={999999}
            placeholder="Стоимость услуги"
            value={editData.price}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value));
              setEditData({ ...editData, price: value });
            }}
          />
        </div>
      </div>
      <SaveBtn nameBtn={"Сохранить"} onClick={sendEditMethod} />
    </div>
  );
};

export default TariffsDetail;
