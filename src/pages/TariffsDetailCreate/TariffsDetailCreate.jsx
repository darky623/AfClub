import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import s from "./TarrifsDetailCreate.module.scss";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import UiSelect from "../../shared/ui/UiSelect";
import UiModal from "../../shared/ui/UiModal";
import { useCreateServicesMutation } from "../../redux/api";
import { useRouter } from "next/router";
import EditingBtn from "../../shared/ui/EditingBtn";

const TariffsDetailCreate = () => {
  const router = useRouter();
  const options = ["long", "short", "speech"];
  const [token, setToken] = useState(null);
  const isBrowser = typeof window !== "undefined";

  const [createService] = useCreateServicesMutation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [modalState, setModalState] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const [createData, setCreateData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
  });

  const handleSelectChange = (selectedValue) => {
    setCreateData({ ...createData, type: selectedValue });
  };
  const handleOk = (type) => {
    setModalState({ ...modalState, [type]: false });
  };

  const handleCancel = (type) => {
    setModalState({ ...modalState, [type]: false });
    setCreateData({ title: "", desc: "", price: "" });
  };

  const showModal = (type) => {
    setModalState({ ...modalState, [type]: true });
  };

  const sendEditMethod = async () => {
    setCreateData({ title: "", desc: "", price: "" });
    try {
      await createService({
        token,
        createData,
      });
      toast.success("Успешно создано");
      router.back();
    } catch (err) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div className={s.tarrifs_detail}>
      <BackLink menuTitle="Услуги" currentPage="Создать" />
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
            <span>Название:</span>{" "}
            {createData.title ? (
              createData.title
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
                value={createData.title}
                onChange={(e) =>
                  setCreateData({ ...createData, title: e.target.value })
                }
              />
            </UiModal>
          ) : null}
        </div>
        <div className={s.tarrifs_detail_informations_desc}>
          <p>
            <span>Описание:</span>{" "}
            {createData.description ? (
              createData.description
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
                value={createData.description}
                onChange={(e) =>
                  setCreateData({ ...createData, description: e.target.value })
                }
              />
            </UiModal>
          ) : null}
        </div>
        <div className={s.tarrifs_detail_informations_price}>
          <p>
            <span>Стоимость:</span>{" "}
            {createData.price ? (
              createData.price + " ₽"
            ) : (
              <span className={s.tarrifs_detail_informations_name_before}>
                Напишите cтоимость услуги
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
                placeholder="Напишите стоимость услуги"
                max={9999999999}
                value={createData.price}
                onChange={(e) =>
                  setCreateData({ ...createData, price: e.target.value })
                }
              />
            </UiModal>
          ) : null}
        </div>
      </div>
      <SaveBtn nameBtn={"Добавить"} onClick={sendEditMethod} />
    </div>
  );
};

export default TariffsDetailCreate;
