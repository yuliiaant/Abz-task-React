import React from "react";
import "./PostSection.scss";
import { Button } from "../Button/Button.tsx";
import { Input } from "../Input/Input.tsx";
import { FileDrop } from "../FileDrop/FileDrop.tsx";
import * as postService from "../../api/users.ts";

export enum Checkbox {
  frontend = "Frontend developer",
  backend = "Backend developer",
  designer = "Designer",
  qa = "QA",
}

export const PostSection = () => {
  // const {} = useForm
  const handleClick = () => {
    postService.getToken()
    .then((data) => {
      postService.registerUser()
    })
  };

  return (
    <section className="post" id="post-section">
      <h1 className="section-title">Working with POST request</h1>
      <form action="" className="post__form">
        <div className="post__inputs">
          <Input name={"Your name"} />
          <Input
            name={"Email"}
            type="email"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
          />
          <div className="phone-container">
            <Input name={"Phone"} type="tel" pattern="(\+?\d[- .]*){7,13}" />
            <span className="post--secondary">+38 (XXX) XXX - XX - XX</span>
          </div>
          <div className="post__checkbox">
            <p>Select your position</p>
            {Object.entries(Checkbox).map(([key, value]) => (
              <div className="input-container" key={key}>
                <input type="checkbox" className="input-checkbox" />
                <span>{value}</span>
              </div>
            ))}
          </div>
          <FileDrop />
          <div onClick={handleClick}>
            <Button title={"Sign up"} disabled={true} />
          </div>
        </div>
      </form>
    </section>
  );
};
