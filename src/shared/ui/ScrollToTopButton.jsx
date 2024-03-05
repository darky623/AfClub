import { Button, BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import s from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  return (
    <BackTop visibilityHeight={400}>
      <Button
        type="Default"
        shape="circle"
        icon={<UpOutlined />}
        size="large"
        className={s.scrol_button}
      />
    </BackTop>
  );
};

export default ScrollToTopButton;
