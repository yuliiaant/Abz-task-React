import { User } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

function sendUsers(data: User, token: string) {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      headers: { Token: token },
      body: formData,
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  } catch (error) {
    console.log(error);
  }
}

function sendUser(data: User, token: string) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return wait(300)
    .then(() => fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      headers: { Token: token },
      body: formData,
    }))
    .then((response) => {
      if (!response.ok) {
        console.log('error')
      }
      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: (user: User, token: string) => sendUser(user, token),
};
