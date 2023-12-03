import React, { useEffect, useState } from "react";
import "./PostSection.scss";
import { FileDrop } from "../FileDrop/FileDrop.tsx";
import * as postService from "../../api/users.ts";
import { getPositions } from "../../api/positions.ts";
import { Position } from "../../utils/types.ts";
import Input from "../Input/Input.tsx";
import { EMAIL_PATTERN, PHONE_PATTERN } from "../../utils/constants.ts";
import { Success } from "../Success/Success.tsx";

const ErrorMessages = {
  NameError: "Enter valid name",
  EmailError: "Enter valid email",
  PhoneError: "Enter valid phone number",
  FileSizeError: "File size can`t be more than 5 Mb",
  FileError: "Select file",
};

const initialUser = {
  name: "",
  email: "",
  phone: "",
  position_id: 1,
  photo: new File([], ""),
};

export const PostSection = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [user, setUser] = useState(initialUser);
  const [files, setFiles] = useState<File[]>([]);
  const [isNotSuccess, setIsNotSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonelError, setPhonelError] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    getPositions()
      .then((responce) => {
        setPositions(responce.positions);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "position_id") {
      return setUser({
        ...user,
        [event.target.name]: Number(event.target.value),
      });
    }
    return setUser({ ...user, [event.target.name]: event.target.value });
  };

  const uploadingPhoto = (selectedFile) => {
    setFileError("");
    setUser({ ...user, photo: selectedFile });
  };

  const clearErrors = () => {
    setNameError("");
    setEmailError("");
    setPhonelError("");
    setFileError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (user.name.length < 2 || user.name.length > 60) {
      setNameError(ErrorMessages.NameError);
      return;
    }

    if (!EMAIL_PATTERN.test(user.email)) {
      setEmailError(ErrorMessages.EmailError);
      return;
    }

    if (!PHONE_PATTERN.test(user.phone)) {
      setPhonelError(ErrorMessages.PhoneError);
      return;
    }

    if (!user.photo.name) {
      setFileError(ErrorMessages.FileError);
      return;
    }

    if (user.photo.size > 1024 * 1024 * 5) {
      setFileError(ErrorMessages.FileSizeError);
      return;
    }

    postService
      .getToken()
      .then((res) => {
        postService
          .registerUser(user, res.token)
          .then((res) => {
            if (res.success) {
              setIsNotSuccess(false);
            } else {
              setErrorMessage(res.message);
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .finally(() => {
        clearErrors();
      });
  };

  return (
    <section className="post" id="post-section">
      {!isNotSuccess ? (
        <>
        <h1 className="section-title">User successfully registered</h1>
        <Success />
        </>
      ) : (
        <>
        <h1 className="section-title">Working with POST request</h1>
        <form className="post__form" onSubmit={(event) => handleSubmit(event)}>
          <div className="post__inputs">
            {!isNotSuccess && <div>Success!</div>}
            <div className="input-message">
              <Input
                type="text"
                name="name"
                label="Your name"
                value={user.name}
                changeHandler={changeHandler}
                isRed={!!nameError}
              />
              {nameError && <span className="error-text">{nameError}</span>}
            </div>
            <div className="input-message">
              <Input
                type="text"
                name="email"
                label="Email"
                value={user.email}
                changeHandler={changeHandler}
                isRed={!!emailError}
              />
              {emailError && <span className="error-text">{emailError}</span>}
            </div>
            <div>
              <div className="phone-container">
                <Input
                  type="tel"
                  name="phone"
                  label="Phone"
                  value={user.phone}
                  changeHandler={changeHandler}
                  isRed={!!phonelError}
                />
                {phonelError && (
                  <span className="error-text">{phonelError}</span>
                )}
              </div>
              <span className="post--secondary">+380XXXXXXXXX</span>
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
                    checked={position.id === user.position_id}
                    onChange={changeHandler}
                  />
                  <span>{position.name}</span>
                </div>
              ))}
            </div>
            <div className="input-message">
              <FileDrop
                uploadingPhoto={uploadingPhoto}
                setFiles={setFiles}
                files={files}
                isRed={!!fileError}
              />
              {fileError && <span className="error-text">{fileError}</span>}
            </div>
            {errorMessage && (
              <div className="error-text" style={{fontSize: '16px'}}>{errorMessage}</div>
            )}
            <div>
              <button type="submit" className="button">
                Sign up
              </button>
            </div>
          </div>
        </form>
        </>
      )}
    </section>
  );
};
