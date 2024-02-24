import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import s from "./SheduleDetail.module.scss";
import { Select, Space } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  useCreateScheduleMutation,
  useGetServicesQuery,
} from "../../redux/api";
import { useRouter } from "next/router";

const SheduleDetail = () => {
  const router = useRouter()
  const [token, setToken ] = useState(null)
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const { data: resultData, isError } = useGetServicesQuery(token, {
    skip: !token,
  });

  const [createShedule] = useCreateScheduleMutation();

  useEffect(() => {
    setData(resultData);
    if (startDate.isAfter(endDate)) {
      setEndDate(startDate);
    }
  }, [startDate, endDate, resultData]);

  const handleSelectChange = (value) => {
    setSelectValue(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setOpenEndDatePicker(true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const sendShedule = () => {
    const formattedStartDate = startDate.format("DD/MM/YYYY HH:mm:ss");
    const formattedEndDate = endDate.format("DD/MM/YYYY HH:mm:ss");
    const createData = {
      date_start: formattedStartDate,
      date_finish: formattedEndDate,
      service_id: selectValue,
    };

    createShedule({
      token,
      createData,
    });
    router.back()
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
          className="schedule_detail_beginning_picker"
          showTime
          format="DD.MM.YYYY  в  HH:mm"
          inputReadOnly
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <h3>Завершение</h3>
      <div className={s.schedule_detail_complete}>
        <DatePicker
          className="schedule_detail_beginning_picker"
          value={endDate}
          onChange={handleEndDateChange}
          open={openEndDatePicker}
          onOpenChange={(status) => setOpenEndDatePicker(status)}
          showTime
          format="DD.MM.YYYY  в  HH:mm"
          inputReadOnly
        />
      </div>
      <SaveBtn nameBtn={"Добавить"} onClick={sendShedule} />
    </div>
  );
};

export default SheduleDetail;
