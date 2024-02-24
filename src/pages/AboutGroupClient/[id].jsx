import React, { useState, useEffect } from "react";
import s from "./Marathon.module.scss";
import Image from "next/image";
import Loader from "../../shared/ui/Loader";
import BackLink from "../../components/BackLink/BackLink";
import { useRouter } from "next/router";
import {
  useGetCustomerPlanClientsQuery,
  useGetBtnPayQuery,
} from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import SaveBtn from "../../shared/ui/SaveBtn";

const Marathon = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data: resultData, isError } = useGetCustomerPlanClientsQuery(
    { token, id },
    {
      skip: !token,
    }
  );

  const { data: getLinkBuy, refetch } = useGetBtnPayQuery(
    {
      token,
      group_id: id,
    },
    {
      skip: !token || !id,
    }
  );

  const pickBuy = async () => {
    await refetch();
    if (getLinkBuy[0]?.payment_link) {
      window.location.href = getLinkBuy[0]?.payment_link;
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

  if (isError || error) {
    return (
      <>
        <BackLink menuTitle="Группы" currentPage="О группе" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading || id === undefined || data === null) {
    return <Loader />;
  }

  return (
    <div className={s.weightLossMarathon}>
      {data?.length !== 0 ? (
        <>
          <div className={s.weightLossMarathon_background}>
            <Image
              src={data[0].image || "/send.jpg"}
              width={800}
              height={97}
              alt={"background"}
            />
          </div>
          <div className={s.weightLossMarathon_information}>
            <BackLink menuTitle="Группы" currentPage="О группе" />
            <div className={s.weightLossMarathon_information_titles}>
              <h3>{data[0].title}</h3>
              <p>
                <span>Стоимость:</span> {data[0].price} ₽
              </p>
              <p>
                <span>Даты:</span> {data[0].data_start} - {data[0].data_finish}
              </p>
              {/* <p>
                <span>Участники:</span> {data[0].members}/
                {data[0].members_limit}
              </p> */}
            </div>
          </div>
          <div className={s.weightLossMarathon_information_desc}>
            <h3>Описание</h3>
            <p>{data[0].description}</p>
          </div>
          <SaveBtn nameBtn={"Оплатить"} onClick={pickBuy} />
        </>
      ) : (
        <>
          <BackLink menuTitle="Группы" currentPage="О группе" />
          <NoInform text="empty" />
        </>
      )}
    </div>
  );
};

export default Marathon;
