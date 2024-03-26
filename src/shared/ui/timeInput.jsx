import React from "react";

const TimeInput = ({ value, onChange }) => {
  const convertToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes} минут`;
    } else if (remainingMinutes === 0) {
      return `${hours} час`;
    } else {
      return `${hours} час ${remainingMinutes} минут`;
    }
  };

  const handleIncrement = () => {
    onChange(value + 15);
  };

  const handleDecrement = () => {
    if (value >= 15) {
      onChange(value - 15);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <button onClick={handleIncrement}>&#43;</button>
      <span
        style={{
          width: 160,
          textAlign: "center",
        }}
      >
        {convertToTime(value)}
      </span>
      <button onClick={handleDecrement}>&#8722;</button>
    </div>
  );
};

export default TimeInput;
