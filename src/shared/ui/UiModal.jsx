import React from "react";
import { Modal } from "antd";

const UiModal = ({
  children,
  handleOk,
  handleCancel,
  isModalOpen,
  nameModal,
}) => {
  if (isModalOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <Modal
      title={nameModal}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default UiModal;
