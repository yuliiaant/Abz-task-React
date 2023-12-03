import React, { useEffect, useState } from "react";
import "./GetSection.scss";
import { Button } from "../Button/Button.tsx";
import { Card } from "../Card/Card.tsx";
import * as postService from "../../api/users.ts";
import { User } from "../../utils/types.ts";
import { Loader } from "../Loader/Loader.tsx";

export const GetSection = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLast, setIsPageLast] = useState(false);

  useEffect(() => {
    postService
      .getUsers(page)
      .then((data) => {
        const isLast = data.total_pages === page;
        setIsPageLast(isLast);
        const sorted = [...data.users].sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        );
        setUsersList(sorted);
      })
      .catch(() => {
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleButtonClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setPage((prev) => prev + 1);
  };

  return (
    <section className="get-section" id="get-section">
      <h1 className="section-title">Working with GET request</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="get-section__cards">
            {usersList.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </div>
          <div
            onClick={(event) => handleButtonClick(event)}
          >
            <Button title={"Show more"} width="120px" disabled={isPageLast} />
          </div>
        </>
      )}
    </section>
  );
};
