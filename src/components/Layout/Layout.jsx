import React from "react";
import Header from "../Header/Header";
import s from "./Layout.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <div className={s.content}>{children}</div>
    </>
  );
};

export default Layout;
