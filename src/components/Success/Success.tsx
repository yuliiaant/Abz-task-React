import React from "react";
import "./Success.scss";

export const Success = () => {
  return (
    <div className="success"><img src={process.env.PUBLIC_URL + '/success.png'} alt="" /></div>
  );
};
