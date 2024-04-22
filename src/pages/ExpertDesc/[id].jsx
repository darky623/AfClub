import React, { useState, useEffect } from "react";
import s from "./ExpertDesc.module.scss";
import BackLink from "../../components/BackLink/BackLink";
import { useRouter } from "next/router";
import { useGetExpertClientsQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import Loader from "../../shared/ui/Loader";
import Link from "next/link";
import { Image } from "antd";

const ExpertDesc = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { token } = router.query;

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      setTokens(token);
    } else if (localToken) {
      setTokens(localToken);
    }
  }, [token]);

  const { data: resultData, isError } = useGetExpertClientsQuery(
    { token: tokens, id },
    {
      skip: !tokens,
    }
  );

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData, id]);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Эксперты" currentPage="Эксперт" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading || id === undefined || data === null) {
    return <Loader />;
  }

  return (
    <div>
      <div className={s.expert_wrapper__BackLink}>
        <BackLink menuTitle="Эксперты" currentPage="Эксперт" />
      </div>
      <div className={s.expert_desc}>
        <div className={s.expert_desc_img}>
          {data && (
            <>
              {data[0].portrait ? (
                <Image
                  className={s.expert_desc_imgage}
                  src={data[0].portrait}
                  alt="Portrait"
                  width={100}
                  height={100}
                />
              ) : (
                <p>IMG</p>
              )}
            </>
          )}
        </div>

        <div className={s.expert_desc_info}>
          <div className={s.expert_desc_info_name}>
            <h3>{data[0].name}</h3>
          </div>
          <div className={s.expert_desc_info_role}>
            <p>{data[0].speciality}</p>
          </div>
        </div>
      </div>

      <ul className={s.template_detail_exercises}>
        {data[0].services
          ? data[0].services.map((service) => (
              <li
                className={s.template_detail_exercises_desc}
                key={service.service_id}
              >
                <Link
                  key={service.service_id}
                  href="/BuyService/[id]"
                  as={`/BuyService/${service.service_id}`}
                >
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className={s.wrapper__price}>
                    <h3>
                      Стоимость : <span>{service.price}</span> ₽
                    </h3>

                    <Image src={"/tick.png"} width={9} height={10} alt="tick" />
                  </div>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ExpertDesc;
