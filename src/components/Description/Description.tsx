import React from "react";
import "./Description.scss";
import { Button } from "../Button/Button.tsx";

export const Description = () => {
  return (
    <section className="description">
      <h1 className="description__title">
        Test assignment for front-end developer
      </h1>
      <p className="description__text">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they&#39;ll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <Button title={"Sign up"} href="#post-section" />
    </section>
  );
};
