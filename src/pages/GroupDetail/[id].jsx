import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./GroupDetail.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetGroupsDetailQuery } from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";

const GroupDetail = () => {
  const [token, setToken ] = useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { data: resultData, isError } = useGetGroupsDetailQuery({token, id}, {
    skip: !token,
  });

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
    <div className={s.group_detail}>
      <BackLink menuTitle="Группы" currentPage="Марафон по похудению" />
      {data.length !== 0 ? (
        <>
          {data.map((group, index) => (
            <div className={s.group_detail_desc} key={group.chat_id}>
              <div className={s.group_detail_desc_card}>
                <p>
                  <span>Название :</span> {group.title}
                </p>
                <p>
                  <span>Выступления: </span> <br />
                  {index + 1}.{group.active_dates}
                </p>
              </div>
              <Link href={`/AboutGroup/${id}`}>
                О группе
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <Link href={`/Notes/${id}`}>
                Заметки
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <a href={group.chat_id} target="_blank" rel="noopener noreferrer">
                Перейти в чат
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </a>
            </div>
          ))}
        </>
      ) : (
        <>
          <BackLink menuTitle="Группы" currentPage="О группе" />
          <NoInform text="error" />
        </>
      )}
    </div>
  );
};

export default GroupDetail;
