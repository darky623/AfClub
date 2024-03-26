import React from "react";
import { Select, Space } from "antd";

const UiSelect = ({
  type,
  options,
  onSelectChange,
  title = "",
  analytics = false,
  tariffs = false,
}) => {
  const handleChange = (value) => {
    onSelectChange(value);
  };

  const customOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Space wrap>
      {analytics ? (
        <Select
          defaultValue={type}
          onChange={handleChange}
          options={customOptions.map((option) => ({
            ...option,
            label: (
              <p>
                <span>Отчет: </span>
                {`${option.label}`}
              </p>
            ),
          }))}
        />
      ) : tariffs ? (
        <Select
          defaultValue={type}
          onChange={handleChange}
          options={customOptions.map((option) => ({
            ...option,
            label: (
              <p>
                <span>{`${title}`}</span>
                {`${option.label}`}
              </p>
            ),
          }))}
        />
      ) : (
        <Select
          defaultValue={type}
          onChange={handleChange}
          options={customOptions.map((option) => ({
            ...option,
            label: (
              <p>
                <span>{`${type}`} </span>
                {`${option.label}`}
              </p>
            ),
          }))}
        />
      )}
    </Space>
  );
};

export default UiSelect;
