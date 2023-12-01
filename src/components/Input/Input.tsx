import React from "react";
import "./Input.scss";

type Props = {
  name: string;
  type?: string;
  pattern?: string;
};

export const Input: React.FC<Props> = ({ name, type = "text", pattern }) => {
  return (
    <input
      type={type}
      pattern={pattern}
      className="custom-input"
      placeholder={name}
      required
    />
  );
};
