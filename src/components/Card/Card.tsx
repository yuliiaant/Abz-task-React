import React from "react";
import "./Card.scss";
import { User } from "../../utils/types";

type Props = {
  user: User;
};

export const Card: React.FC<Props> = ({ user }) => {
  const { name, email, phone, position, photo } = user;
  return (
    <div className="card">
      <img className="card__image" src={photo} alt="image" />
      <div className="card__description tooltip">
        <span className="card__name part">{name}</span>
        <span className="tooltiptext">{name}</span>
      </div>
      <div className="card__description">
        <div className="tooltip">
          <span className="card__description--position part">{position}</span>
          <span className="tooltiptext">{position}</span>
        </div>
        <div className="tooltip">
          <a href="" className="card__description--email part">
            {email}
          </a>
          <span className="tooltiptext">{email}</span>
        </div>
        <div className="tooltip">
          <a
            href={`tel:${phone}`}
            className="card__description--phone part tooltip"
          >
            {phone}
          </a>
          <span className="tooltiptext">{phone}</span>
        </div>
      </div>
    </div>
  );
};
