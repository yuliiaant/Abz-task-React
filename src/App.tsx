import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header.tsx";
import { Description } from "./components/Description/Description.tsx";
import { GetSection } from "./components/GetSection/GetSection.tsx";
import { PostSection } from "./components/PostSection/PostSection.tsx";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Description />
        <div className="sections">
        <GetSection />
        <PostSection />
        </div>
      </div>
    </div>
  );
};
