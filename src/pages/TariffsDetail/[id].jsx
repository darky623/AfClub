import React, { useEffect, useState } from "react";
import s from "./TarrifsDetail.module.scss";
import { toast } from "react-toastify";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import UiSelect from "../../shared/ui/UiSelect";
import UiModal from "../../shared/ui/UiModal";
import { useEditServicesMutation, useGetServicesQuery } from "../../redux/api";
import { useRouter } from "next/router";
import EditingBtn from "../../shared/ui/EditingBtn";

const TariffsDetail = () => {
  const router = useRouter();
  const isBrowser = typeof window !== "undefined";

  const [token, setToken] = useState(null);

  const { id } = router.query;

  const options = ["long", "short", "speech"];

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
    setEditData({ ...editData, type: selectedValue });
  };
  const handleOk = (type) => {
    setModalState({ ...modalState, [type]: false });
  };

  const handleCancel = (type) => {
    setModalState({ ...modalState, [type]: false });
    setEditData({ title: "", description: "", price: "" });
  };

  const showModal = (type) => {
    setModalState({ ...modalState, [type]: true });
  };

  const sendEditMethod = async () => {
    setEditData({ title: "", description: "", price: "" });
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
        <div className={s.tarrifs_detail_informations_name}>
          <p>
            <span>Название: </span>
            {editData.title ? (
              editData.title
            ) : (
              <span className={s.tarrifs_detail_informations_name_before}>
                Напишите название услуги
              </span>
            )}
          </p>
          <EditingBtn onClick={() => showModal("title")} />
          {isBrowser ? (
            <UiModal
              nameModal={"Название услуги"}
              handleOk={() => handleOk("title")}
              handleCancel={() => handleCancel("title")}
              isModalOpen={modalState.title}
            >
              <input
                type="text"
                placeholder="Напишите название услуги"
                maxLength={25}
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
            </UiModal>
          ) : null}
        </div>
        <div className={s.tarrifs_detail_informations_desc}>
          <p>
            <span>Описание: </span>
            {editData.description ? (
              editData.description
            ) : (
              <span className={s.tarrifs_detail_informations_name_before}>
                Напишите описание услуги
              </span>
            )}
          </p>
          <EditingBtn onClick={() => showModal("description")} />
          {isBrowser ? (
            <UiModal
              nameModal={"Описание услуги"}
              handleOk={() => handleOk("description")}
              handleCancel={() => handleCancel("description")}
              isModalOpen={modalState.description}
            >
              <input
                type="text"
                placeholder="Напишите описание услуги"
                maxLength={250}
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
            </UiModal>
          ) : null}
        </div>
        <div className={s.tarrifs_detail_informations_price}>
          <p>
            <span>Стоимость: </span>
            {editData.price ? (
              editData.price + " ₽"
            ) : (
              <span className={s.tarrifs_detail_informations_name_before}>
                Напишите стоимость услуги
              </span>
            )}
          </p>
          <EditingBtn onClick={() => showModal("price")} />
          {isBrowser ? (
            <UiModal
              nameModal={"Стоимость услуги"}
              handleOk={() => handleOk("price")}
              handleCancel={() => handleCancel("price")}
              isModalOpen={modalState.price}
            >
              <input
                type="number"
                max={999999}
                placeholder="Напишите стоимость услуги"
                value={editData.price}
                onChange={(e) => {
                  const inputValue = Number(e.target.value);
                  const clampedValue = Math.min(inputValue, 999999);
                  setEditData({ ...editData, price: clampedValue });
                }}
              />
            </UiModal>
          ) : null}
        </div>
      </div>
      <SaveBtn nameBtn={"Сохранить"} onClick={sendEditMethod} />
    </div>
  );
};

export default TariffsDetail;
