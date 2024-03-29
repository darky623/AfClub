import { Button, FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import s from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  const buttonRef = useRef(null);
  return (
    <FloatButton.BackTop visibilityHeight={400}>
      <Button
        ref={buttonRef}
        type="default"
        shape="circle"
        icon={<UpOutlined />}
        size="large"
        className={s.scrol_button}
      />
    </FloatButton.BackTop>
  );
};

export default ScrollToTopButton;
