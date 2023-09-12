import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./common/router/mainRouter.jsx";
import "./style/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
