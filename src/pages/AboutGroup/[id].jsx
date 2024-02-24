import React from "react";
import s from "./AboutGroup.module.scss";
import BackLink from "../../components/BackLink/BackLink";
import { useRouter } from "next/router";
import { useGetAboutGroupDetailQuery } from "../../redux/api";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";
import Image from "next/image";

const AboutGroup = () => {
  const router = useRouter();
  const [token, setToken ] = useState(null)
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
 
  const { data: resultData, isError } = useGetAboutGroupDetailQuery({token, id}, {
    skip: !token,
  });
  const [data, setData] = useState([]);

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Группы" currentPage="О группе" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.about_group}>
      {data.length !== 0 ? (
        <>
          {data.map((group) => (
            <div key={group.title}>
              {group.image ? (
                <div className={s.about_group_background}>
                  <Image
                    src={group.image}
                    width={1920}
                    height={1080}
                    alt="groupImg"
                  />
                </div>
              ) : (
                <div className={s.about_group_background}>
                  <Image
                    src={"/send.jpg"}
                    width={1920}
                    height={1080}
                    alt="groupImg"
                  />
                </div>
              )}
              <div className={s.about_group_information}>
                <BackLink menuTitle="Группа" currentPage="О группе" />
                <div className={s.about_group_information_titles}>
                  <h3>{group.title}</h3>
                  <p>
                    <span>Стоимость:</span> {group.price} ₽
                  </p>
                  <p>
                    <span>Даты:</span> {group.data_start} - {group.data_finish}
                  </p>
                  <p>
                    <span>Участники:</span> {group.members}/
                    {group.members_limit}
                  </p>
                </div>
              </div>
              <div className={s.about_group_information_desc}>
                <h3>Описание</h3>
                <p>{group.description}</p>
              </div>
            </div>
          ))}
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

export default AboutGroup;
