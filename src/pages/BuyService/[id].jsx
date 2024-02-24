import React, { useState, useEffect } from "react";
import s from "./BuyService.module.scss";
import BackLink from "../../components/BackLink/BackLink";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useGetShortExpertClientsQuery,
  useGetBtnPayClientsQuery,
} from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import Loader from "../../shared/ui/Loader";
import SaveBtn from "../../shared/ui/SaveBtn";

const BuyService = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [schedules_id, setSchedules_id] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: resultData, isError } = useGetShortExpertClientsQuery(
    { token, id },
    {
      skip: !token,
    }
  );

  const { data: getLinkBuy, refetch } = useGetBtnPayClientsQuery(
    {
      token,
      schedules_id: schedules_id,
      service_id: id,
    },
    {
      skip: !token || !schedules_id || !id,
    }
  );

  const pickBuy = async () => {
    await refetch();
    if (getLinkBuy[0]?.payment_link) {
      window.location.href = getLinkBuy[0].payment_link;
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData, id]);

  const formatDate = (dateString) => {
    const months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const [day, month, year] = dateString.split("/");
    const monthIndex = parseInt(month, 10) - 1;

    return `${day} ${months[monthIndex]}`;
  };

  if (isError || error) {
    return (
      <>
        <BackLink menuTitle="Эксперт" currentPage="Услуга" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading || id === undefined || data === null) {
    return <Loader />;
  }

  const sortScheduleByDateAndTime = (schedule) => {
    return schedule.sort((a, b) => {
      const dateA = new Date(a.data_start).getTime();
      const dateB = new Date(b.data_start).getTime();
      return dateA - dateB;
    });
  };

  const renderSchedule = () => {
    const groupedByDate = data[0].schedules.reduce((acc, event) => {
      const date = event.data_start.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);

      return acc;
    }, {});

    return Object.entries(groupedByDate).map(([date, events]) => {
      const sortedEvents = sortScheduleByDateAndTime(events);
      return (
        <div key={date}>
          <h3 className={s.buyService_titleTime}>{formatDate(date)}</h3>
          <div className={s.buyService_info_time}>
            {sortedEvents.map((event) => (
              <div
                onClick={() => {
                  event.status === "free"
                    ? (setSchedules_id(event.schedules_id),
                      toast.success(
                        `время ${event.data_start
                          .split(" ")[1]
                          .slice(0, 5)} - ${event.data_finish
                          .split(" ")[1]
                          .slice(0, 5)}`
                      ))
                    : toast.error("Данное время занято");
                }}
                key={event.schedules_id}
                className={`${
                  event.status === "busy"
                    ? s.schedule_info_busy
                    : s.schedule_info_anactive
                } ${s.schedule_info} ${
                  event.schedules_id === schedules_id
                    ? s.schedule_info_activ
                    : ""
                }`}
              >
                <p>
                  {event.data_start.split(" ")[1].slice(0, 5)} -{" "}
                  {event.data_finish.split(" ")[1].slice(0, 5)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className={s.buyService_wrapper__BackLink}>
        <BackLink menuTitle={data[0].expert_name} currentPage="Услуга" />
        <h2 className={s.buyService_title}>{data[0].title}</h2>
        <h4 className={s.buyService_secondTitle}>
          Эксперт :{" "}
          <span className={s.buyService_span}>{data[0].expert_name}</span>
        </h4>
        <h4 className={s.buyService_secondTitle}>
          Описание :{" "}
          <span className={s.buyService_span}>{data[0].description}</span>
        </h4>
        <h4 className={s.buyService_secondTitle}>
          Стоимость :{" "}
          <span className={s.buyService_span}>{data[0].price} ₽</span>
        </h4>
      </div>
      <div className={s.expert_desc}>
        <div className={s.expert_desc_info}>
          <div className={s.expert_desc_info_name}>
            <h3>{data[0].name}</h3>
          </div>
          <div className={s.expert_desc_info_role}>
            <p>{data[0].speciality}</p>
          </div>
        </div>
      </div>

      <div className={s.buyService_wrapper_time}>
        <div className={s.buyService__wrapper_circle}>
          <div className={s.buyService__circle1}></div>
          <p>Свободно</p>
          <div className={s.buyService__circle2}></div>
          <p>Занято</p>
        </div>

        <div className={s.schedule_info}>
          {data[0].schedules && data[0].schedules.length > 0 ? (
            renderSchedule()
          ) : (
            <p>Нет доступного расписания</p>
          )}
        </div>
      </div>
      <SaveBtn
        nameBtn={"Оплатить"}
        onClick={() => {
          schedules_id ? pickBuy() : toast.error("Выберите доступоное время");
        }}
      />
    </div>
  );
};

export default BuyService;
