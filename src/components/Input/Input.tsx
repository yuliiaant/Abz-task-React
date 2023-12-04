import React from "react";
import "./Input.scss";
import classNames from "classnames";

type TextInputProps = {
  type: string;
  name: string;
  label: string;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRed?: boolean;
};

const Input = ({
  type,
  name,
  label,
  value,
  changeHandler,
  isRed,
}: TextInputProps) => {
  return (
    <input
      className={classNames("custom-input", {
        "input-red": isRed,
      })}
      type={type}
      name={name}
      placeholder={label}
      id={name}
      value={value}
      onChange={changeHandler}
    />
  );
};

export default Input;
