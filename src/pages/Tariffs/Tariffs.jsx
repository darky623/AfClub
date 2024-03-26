import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Tariffs.module.scss";
import AddButton from "../../shared/ui/AddButton";
import { useRouter } from "next/router";
import { useGetServicesQuery } from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";
import EditingBtn from "../../shared/ui/EditingBtn";

const Tariffs = () => {
  const router = useRouter();
  const [token, setToken ] = useState(null)

  const handleEditClick = (id) => {
    router.push(`/TariffsDetail/${id}`);
  };
  const handleCreateClick = () => {
    router.push(`/TariffsDetailCreate/TariffsDetailCreate`);
  };

  const { data: resultData, isError, refetch } = useGetServicesQuery(token, {
    skip: !token,
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (resultData) {
      refetch()
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <NoInform text="error" />;
  }

  return (
    <div className={s.tariffs}>
      <div className={s.tariffs_shared}>
        <BackLink menuTitle="Меню" currentPage="Услуги" />
        <AddButton onClick={() => handleCreateClick()} />
      </div>
      <div className={s.tariffs_cards}>
        {data.length !== 0 ? (
          data.map((services) => (
            <div key={services.service_id} className={s.tariffs_card}>
              <div className={s.tariffs_card_desc}>
                <h3>{services.title}</h3>
                <p>{services.description}</p>
                <h4>
                  Стоимость: <span>{services.price} ₽</span>
                </h4>
              </div>
              <div className={s.tariffs_card_btn}>
              <EditingBtn onClick={() => handleEditClick(services.service_id)}/>
              </div>
            </div>
          ))
        ) : (
          <NoInform text="empty" />
        )}
      </div>
    </div>
  );
};

export default Tariffs;
