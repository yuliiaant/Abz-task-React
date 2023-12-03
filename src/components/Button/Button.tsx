import React from "react";
import "./Button.scss";

type buttonType = "button" | "submit" | "reset" | undefined;

type Props = {
  title: string;
  disabled?: boolean;
  width?: string;
  href?: string;
  type?: buttonType,
  handleSubmit?: (event: React.FormEvent) => void,
};

export const Button: React.FC<Props> = ({
  title,
  disabled = false,
  width = "100px",
  href = '',
  type = 'button',
  handleSubmit,
}) => {
  return (
    <button type={type} disabled={disabled} className="button" style={{ width: width }} onClick={handleSubmit}>
      <a className="button__link" href={`/${href}`}>{title}</a>
    </button>
  );
};
