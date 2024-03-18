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
import { Input } from "antd";

const { TextArea } = Input;

const TariffsDetailCreate = () => {
  const router = useRouter();
  const options = ["Ведение", "Короткая", "Выступление"];
  const [token, setToken] = useState(null);
  const isBrowser = typeof window !== "undefined";
  const [focused, setFocused] = useState(false);

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
    let selected = "";
    const selectedMap = {
      Ведение: "long",
      Короткая: "short",
      Выступление: "speech",
    };

    selected = selectedMap[selectedValue] || "";
    setCreateData({ ...createData, type: selected });
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
            tariffs={true}
            title="Тип услуги "
            type={"Короткая"}
            options={options}
            onSelectChange={handleSelectChange}
          />
        </div>
        <div className={s.tarrifs_detail_informations_name}>
          <p>
            <span>Название:</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Название услуги"
            maxLength={100}
            value={createData.title}
            onChange={(e) =>
              setCreateData({ ...createData, title: e.target.value })
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
            value={createData.description}
            onChange={(e) =>
              setCreateData({ ...createData, description: e.target.value })
            }
          />
        </div>
        <div className={s.tarrifs_detail_informations_price}>
          <p>
            <span>Стоимость:</span>
          </p>
          <input
            type="number"
            placeholder="Стоимость услуги"
            min={0}
            max={9999999999}
            value={createData.price}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value));
              setCreateData({ ...createData, price: value });
            }}
          />
        </div>
      </div>
      <SaveBtn nameBtn={"Добавить"} onClick={sendEditMethod} />
    </div>
  );
};

export default TariffsDetailCreate;
