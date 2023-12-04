import React from "react";
import "./Button.scss";

type buttonType = "button" | "submit" | "reset" | undefined;

type Props = {
  title: string;
  disabled?: boolean;
  width?: string;
  href?: string;
};

export const Button: React.FC<Props> = ({
  title,
  disabled = false,
  width = "100px",
  href = "",
}) => {
  return (
    <button disabled={disabled} className="button" style={{ width: width }}>
      <a className="button__link" href={`${href}`}>
        {title}
      </a>
    </button>
  );
};
