import React, { useEffect, useState } from "react";
import s from "./Coach.module.scss";
import CoachDesc from "../../components/Coach/CoachDesc";
import CoachLinks from "../../components/CoachLinks/CoachLinks";
import ClientLinks from "../../components/ClientLinks/ClientLinks";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import Loader from "../../shared/ui/Loader";
import { useGetLoginQuery } from "../../redux/api";

const Coach = () => {
  const [token, setToken ] = useState(null)

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const { data: resultData, isError, refetch } = useGetLoginQuery(token, {
    skip: !token,
  });

  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (resultData && resultData.length > 0) {
      setCoachData(resultData[0]);
      setLoading(false);
    }
    if (isError) {
      setErrorModalVisible(true);
      setLoading(false);
    }
  }, [resultData, isError]);

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={s.coach}>
      {coachData?.status === "expert" ? (
        <>
          <CoachDesc coachData={coachData} refetch={refetch}/>
          <CoachLinks coachData={coachData} />
        </>
      ) : coachData?.status === "user" ? (
        <ClientLinks />
      ) : coachData?.status === "helper" ? (
        <>
          <CoachDesc coachData={coachData} refetch={refetch}/>
          <CoachLinks coachData={coachData} status="helper" />
        </>
      ) : (
        <ErrorModal />
      )}
      {errorModalVisible && <ErrorModal onClose={handleCloseErrorModal} />}
    </div>
  );
};

export default Coach;
