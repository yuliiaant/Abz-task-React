import React, { useEffect, useState } from "react";
import "./PostSection.scss";
import { Button } from "../Button/Button.tsx";
import { FileDrop } from "../FileDrop/FileDrop.tsx";
import * as postService from "../../api/users.ts";
import { getPositions } from "../../api/positions.ts";
import { Position } from "../../utils/types.ts";
import Input from "../Input/Input.tsx";

export enum Checkbox {
  frontend = "Frontend developer",
  backend = "Backend developer",
  designer = "Designer",
  qa = "QA",
}

export const PostSection = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    getPositions()
      .then((responce) => {
        setPositions(responce.positions);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: 1,
    photo: new File([], ""),
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "position_id") {
      return setUser({
        ...user,
        [event.target.name]: Number(event.target.value),
      });
    }
    return setUser({ ...user, [event.target.name]: event.target.value });
  };

  const uploadingPhoto = (selectedFile: File) => {
    setUser({...user, photo: selectedFile});
}

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault()

  postService.getToken()
  .then((res) => {
    postService.registerUser(user, res.token);
  })
}


  console.log(user)

  return (
    <section className="post" id="post-section">
      <h1 className="section-title">Working with POST request</h1>
      <form className="post__form" onSubmit={handleSubmit}>
        <div className="post__inputs">
          <Input
            type="text"
            name="name"
            label="Your name"
            value={user.name}
            changeHandler={changeHandler}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={user.email}
            changeHandler={changeHandler}
          />
          <div className="phone-container">
            <Input
              type="tel"
              name="phone"
              label="Phone"
              value={user.phone}
              changeHandler={changeHandler}
            />
            <span className="post--secondary">+38 (XXX) XXX - XX - XX</span>
          </div>
          <div className="post__checkbox">
            <p>Select your position</p>
            {positions.map((position) => (
              <div className="input-container" key={position.id}>
                <input
                  type="radio"
                  className="input-checkbox"
                  name="position_id"
                  value={position.id}
                  checked={(position.id === user.position_id)}
                  onChange={changeHandler}
                />
                <span>{position.name}</span>
              </div>
            ))}
          </div>
          <FileDrop uploadingPhoto={uploadingPhoto} />
          <div>
            <button type="submit" className="button" onSubmit={handleSubmit}>
              <a className="button__link" href="/">Sign up</a>
            </button>
            {/* <Button title={"Sign up"} disabled={true} type="submit" handleSubmit={handleSubmit} /> */}
          </div>
        </div>
      </form>
    </section>
  );
};
