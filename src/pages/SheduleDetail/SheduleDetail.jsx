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
  const [selectValue, setSelectValue] = useState("Выберите услугу");
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const {
    data: resultData,
    isError,
    refetch,
  } = useShortServicesQuery(token, {
    skip: !token,
  });

  const [createShedule] = useCreateScheduleMutation();

  useEffect(() => {
    setData(resultData);
  }, [resultData]);

  const handleSelectChange = (value, option) => {
    setSelectValue(value);
    if (option && option.option && option.option.duration) {
      const durationInMinutes = option.option.duration;
      const hoursTime = Math.floor(durationInMinutes / 60);
      const minutesTime = durationInMinutes % 60;
      setHours(hoursTime);
      setMinutes(minutesTime);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const sendShedule = async () => {
    if (!selectValue || selectValue === "Выберите услугу") {
      toast.error("Выберите тип услуги пожалуйста");
      return;
    }
    const formattedStartDate = startDate.format("DD/MM/YYYY HH:mm:ss");
    const createData = {
      date_start: formattedStartDate,
      service_id: selectValue,
    };
    try {
      const result = await createShedule({
        token,
        createData,
      });

      if (result.error?.originalStatus === 208) {
        toast.error("На это время, уже есть запись");
        return;
      }

      refetch();
      router.back();
    } catch (err) {
      toast.error(err.message);
    }
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
          <Select
            onChange={(value, option) => {
              handleSelectChange(value, option);
            }}
            value={selectValue}
          >
            {data &&
              data.map((option) => (
                <>
                  <Select.Option
                    key={option.service_id}
                    value={option.service_id}
                    option={option}
                  >
                    <p>
                      <span>Услуги: </span>
                      {option.title}
                    </p>
                  </Select.Option>
                </>
              ))}
          </Select>
        </Space>
        {hours === null ? null : hours === 0 ? (
          <p className={s.schedule_detail_timeTitle}>
            Продолжительность {minutes} минут
          </p>
        ) : hours > 0 && minutes === 0 ? (
          <p className={s.schedule_detail_timeTitle}>
            Продолжительность {hours} час(а)
          </p>
        ) : (
          <p className={s.schedule_detail_timeTitle}>
            Продолжительность {hours} час(а) {minutes} минут
          </p>
        )}
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
      <SaveBtn nameBtn={"Добавить"} onClick={sendShedule} />
    </div>
  );
};

export default SheduleDetail;
