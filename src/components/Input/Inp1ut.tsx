import React from "react";
import "./Input.scss";

type Props = {
  placeholder: string;
  type?: string;
  pattern?: string;
};

export const Inpu1t: React.FC<Props> = ({ placeholder, type = "text", pattern }) => {
  return (
    <input
      type={type}
      // pattern={pattern}
      className="custom-input"
      placeholder={placeholder}
      required
    />
  );
};
