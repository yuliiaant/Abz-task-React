import React from "react";
import "./Header.scss";
import { LogoCat } from "../../utils/LogoCat.tsx";
import { LogoText } from "../../utils/LogoText.tsx";
import { Button } from "../Button/Button.tsx";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <LogoCat />
        <LogoText />
      </div>
      <div className="header__buttons">
        <Button title={"Users"} href="#get-section" />
        <Button title={"Sign up"} href="#post-section" />
      </div>
    </header>
  );
};
