import React, { useState, useEffect } from "react";
import BackLink from "../BackLink/BackLink";
import { toast } from "react-toastify";
import s from "./Analytics.module.scss";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useRouter } from "next/router";
import {
  useEditMemberMiscMutation,
  useGetMiscTypesQuery,
} from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import UiSelect from "../../shared/ui/UiSelect";
import SaveBtn from "../../shared/ui/SaveBtn";

const AnalyticsComponets = ({ id }) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const router = useRouter();
  // const { id } = router.query;
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [optionsData, setOptionsData] = useState([
    {
      type: "combain",
      title: "Общий отчет",
    },
  ]);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [editMemberMisc] = useEditMemberMiscMutation();
  const [loadingContent, setLoadingContent] = useState(false);

  const { data: resultData, isError } = useGetMiscTypesQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (resultData && resultData.length > 0) {
      setOptionsData(resultData);
      setLoading(false);
    }
    if (isError) {
      setLoading(false);
    }
  }, [resultData, isError]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    setLoading(false);

    if (startDate.isAfter(endDate)) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (token && id) {
      handleSelectChange("Общий отчет");
    }
  }, [token, id]);

  const handleSelectChange = async (selectedValue) => {
    const foundItem = optionsData.find((item) => item.title === selectedValue);
    const type = foundItem ? foundItem.type : null;

    const formattedStartDate = startDate.format("DD/MM/YYYY");
    const formattedEndDate = endDate.format("DD/MM/YYYY");

    const miscData = {
      date_start: formattedStartDate,
      date_finish: formattedEndDate,
      misc_type: type,
    };
    try {
      setLoadingContent(true);
      const res = await editMemberMisc({
        token,
        id,
        miscData,
      });
      setPdfUrl(res?.data?.pdf_url);
      toast.success("Успешно изменено");
      setLoadingContent(false);
    } catch (err) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      setLoadingContent(false);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setOpenEndDatePicker(true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.analytics}>
      {/* <BackLink menuTitle="Консультация 23.10" currentPage="Аналитика" /> */}
      <div className={s.analytics_date}>
        <span>С</span>
        <DatePicker
          className="analytics_date_picker"
          value={startDate}
          onChange={handleStartDateChange}
          format={dateFormatList}
          inputReadOnly
        />
        <span className={s.analytics_date_title}>По</span>
        <DatePicker
          className="analytics_date_picker"
          value={endDate}
          onChange={handleEndDateChange}
          open={openEndDatePicker}
          onOpenChange={(status) => setOpenEndDatePicker(status)}
          format={dateFormatList}
          inputReadOnly
        />
      </div>
      <div className={s.analitycs_links}>
        {optionsData !== "" ? (
          <UiSelect
            analytics={true}
            type={"Отчет: Общий отчет"}
            options={optionsData.map((item) => item.title)}
            onSelectChange={handleSelectChange}
          />
        ) : null}
      </div>

      {loadingContent ? (
        <Loader />
      ) : (
        <div className={s.analitycs_btn}>
          <div className={s.analitycs_report}></div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <SaveBtn nameBtn={"Открыть"} analytic={true} />
          </a>
        </div>
      )}
    </div>
  );
};

export default AnalyticsComponets;
