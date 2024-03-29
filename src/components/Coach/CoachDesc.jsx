import React, { useState } from "react";
import s from "./CoachDesc.module.scss";
// import Image from "next/image";
import { Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import {
  useEditProfileMutation,
  useUploadPhotoMutation,
} from "../../redux/api";
import { useRouter } from "next/router";
import UiModal from "../../shared/ui/UiModal";
import { toast } from "react-toastify";
import EditingBtn from "../../shared/ui/EditingBtn";

const CoachDesc = ({ coachData, refetch }) => {
  const router = useRouter();
  const { token } = router.query;
  const [photo, setPhoto] = useState(null);
  const [editProfileMutation] = useEditProfileMutation();
  const [uploadPhoto] = useUploadPhotoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createData, setCreateData] = useState({
    name: coachData.name,
    speciality: coachData.speciality,
  });

  const handleOk = async () => {
    if (createData.name.length > 3 && createData.speciality.length > 3) {
      try {
        await editProfileMutation({
          token,
          createData,
        });
        if (photo) {
          await uploadPhoto({ token, image: photo });
        }
        setIsModalOpen(false);
        toast.success("Успешно изменено");
        refetch();
      } catch (error) {
        toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      }
    } else {
      toast.error("введите не менее 3 символов в каждое поле");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateData({ name: "", speciality: "" });
  };

  const showModal = () => setIsModalOpen(true);

  return (
    <div className={s.coach_desc}>
      {coachData.portrait ? (
        <div className={s.coach_desc_img}>
          <Image
            width={100}
            height={100}
            src={coachData.portrait}
            alt="Expert"
          />
        </div>
      ) : (
        <div className={s.coach_desc_img}>
          <p>IMG</p>
        </div>
      )}
      {coachData && (
        <>
          <div className={s.coach_desc_info}>
            <div className={s.coach_desc_info_name}>
              <h3>{coachData.name}</h3>
              <div className={s.coach_desc_info_name_btn}>
                <EditingBtn onClick={showModal} />
              </div>
              <UiModal
                handleOk={handleOk}
                handleCancel={handleCancel}
                nameModal={"Редактирование профиля"}
                isModalOpen={isModalOpen}
              >
                <input
                  type="text"
                  placeholder="Новое имя"
                  maxLength="19"
                  minLength="3"
                  value={createData.name}
                  onChange={(e) => {
                    setCreateData({ ...createData, name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder={"Новая специализация"}
                  maxLength="19"
                  minLength="3"
                  value={createData.speciality}
                  onChange={(e) => {
                    setCreateData({
                      ...createData,
                      speciality: e.target.value,
                    });
                  }}
                />
                <Upload
                  beforeUpload={(file) => {
                    const isJpgOrPng =
                      file.type === "image/jpeg" || file.type === "image/png";
                    const isSizeValid = file.size / 1024 / 1024 < 10;

                    if (!isJpgOrPng) {
                      toast.error(
                        "Выберите файлы только в формате JPG или PNG!"
                      );
                      return false;
                    }

                    if (!isSizeValid) {
                      toast.error("Выберите файл размером не более 10MB!");
                      return false;
                    }

                    setPhoto(file);
                    return true;
                  }}
                  maxCount={1}
                  accept=".jpg, .jpeg, .png, .heic, .heif"
                >
                  <Button icon={<UploadOutlined />}></Button>
                  <p>Загрузите изображение</p>
                </Upload>
              </UiModal>
            </div>
            <div className={s.coach_desc_info_role}>
              <p>{coachData.speciality}</p>
              <p>
                Подопечные:{" "}
                <span>
                  {coachData.q_members}/{coachData.members_limit}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoachDesc;
