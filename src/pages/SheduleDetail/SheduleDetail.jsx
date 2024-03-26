import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import s from "./SheduleDetail.module.scss";
import { Select, Space } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  useCreateScheduleMutation,
  useShortServicesQuery,
} from "../../redux/api";
import { useRouter } from "next/router";

const SheduleDetail = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());
  // const [endDate, setEndDate] = useState(dayjs());
  // const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectValue, setSelectValue] = useState("Выберите услугу");
  const [data, setData] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: resultData, isError } = useShortServicesQuery(token, {
    skip: !token,
  });

  const [createShedule] = useCreateScheduleMutation();

  useEffect(() => {
    setData(resultData);
  }, [resultData]);

  const handleSelectChange = (value) => {
    setSelectValue(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // setOpenEndDatePicker(true);
  };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  // };

  const sendShedule = () => {
    if (!selectValue) {
      toast.error("Выберите тип услуги пожалуйста");
      return;
    }
    const formattedStartDate = startDate.format("DD/MM/YYYY HH:mm:ss");
    // const formattedEndDate = endDate.format("DD/MM/YYYY HH:mm:ss");
    const createData = {
      date_start: formattedStartDate,
      // date_finish: formattedEndDate,
      service_id: selectValue,
    };

    createShedule({
      token,
      createData,
    });
    router.back();
  };

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };

  return (
    <div className={s.schedule_detail}>
      <BackLink menuTitle="График" currentPage="Добавить" />
      <div className={s.schedule_detail_variants}>
        <Space>
          <Select onChange={handleSelectChange} value={selectValue}>
            {data &&
              data.map((option) => (
                <Select.Option
                  key={option.service_id}
                  value={option.service_id}
                >
                  <p>
                    <span>Услуги: </span>
                    {option.title}
                  </p>
                </Select.Option>
              ))}
          </Select>
        </Space>
      </div>
      <h3>Начало</h3>
      <div className={s.schedule_detail_beginning}>
        <DatePicker
          popupClassName="startDatePicker"
          className="schedule_detail_beginning_picker"
          showTime={{ minuteStep: 10 }}
          format="DD.MM.YYYY  в  HH:mm"
          inputReadOnly
          value={startDate}
          onChange={handleStartDateChange}
          disabledDate={disabledDate}
        />
      </div>
      {/* <h3>Завершение</h3>
      <div className={s.schedule_detail_complete}>
        <DatePicker
          popupClassName="endDatePicker"
          className="schedule_detail_beginning_picker"
          value={endDate}
          onChange={handleEndDateChange}
          open={openEndDatePicker}
          onOpenChange={(status) => setOpenEndDatePicker(status)}
          showTime={{ minuteStep: 10 }}
          format="DD.MM.YYYY  в  HH:mm"
          inputReadOnly
        />
      </div> */}
      <SaveBtn nameBtn={"Добавить"} onClick={sendShedule} />
    </div>
  );
};

export default SheduleDetail;
