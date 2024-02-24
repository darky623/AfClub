import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import s from "./BackLink.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import UiModal from "../../shared/ui/UiModal";

const BackLink = ({ menuTitle, currentPage, disabled }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    if (disabled) {
      setIsModalOpen(true)
    } else {
      router.back();
    }
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    router.back()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => setIsModalOpen(true);

  return (
    <div className={s.back_link}>
      <button onClick={handleBack}>
        <Image src={"/backtick.png"} width={15} height={15} alt="tick" />
        {menuTitle} / {currentPage}
      </button>

      {showModal && disabled && (
       <UiModal
       handleOk={handleOk}
       handleCancel={handleCancel}
       nameModal={"Есть не сохраненные изменения"}
       isModalOpen={isModalOpen}
     >
       <p>Вы уверенны что хотите выйти, увас есть не сохраненые изменения?</p>
     </UiModal>
      )}
    </div>
  );
};

export default BackLink;