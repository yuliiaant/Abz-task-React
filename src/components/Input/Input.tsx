import React from "react";
import "./Input.scss";

type TextInputProps = {
  type: string;
  name: string;
  label: string;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, name, label, value, changeHandler }: TextInputProps) => {
  return (
    <>
      <input
        className="custom-input"
        type={type}
        name={name}
        placeholder={label}
        id={name}
        value={value}
        onChange={changeHandler}
        required
      />
      {/* <label htmlFor={name}>{label}</label> */}
    </>
  );
};

export default Input;
