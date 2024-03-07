import { Button, FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";
import s from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  return (
    <FloatButton.BackTop visibilityHeight={400}>
      <Button
        type="Default"
        shape="circle"
        icon={<UpOutlined />}
        size="large"
        className={s.scrol_button}
      />
    </FloatButton.BackTop>
  );
};

export default ScrollToTopButton;
