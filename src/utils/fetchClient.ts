import { User } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

// function requestPost<T>(
//   url: string,
//   method: RequestMethod = 'GET',
//   photo: any = null,
//   token = "",
// ): Promise<T> {
//   let myHeaders = new Headers();
// myHeaders.append("Token", token);
// myHeaders.append('Content-Type', 'multipart/form-data');
// myHeaders.append("Cookie", "Cookie_1=value; XSRF-TOKEN=eyJpdiI6IlZGaWEwckcyTVwvd1BPOGhGR1NURTZnPT0iLCJ2YWx1ZSI6IkpsWHF5YlwvVzQ1bHNDeDlRaWRWMEU0TXU1UDExYnVjeEtaM1o3Vm9NbFI2aGlLMVwvZzVhb1BPOUYxRTNneFVuS3pESDdVcklRQjQ2SXQ5MURpNnJ2Q3c9PSIsIm1hYyI6IjRkODg1ZGNjNjI5NDNhODEyMDU5MTBmYjBhZDNkYTVjZGFkNmViZmJmMmU5MTYwNzQ0ZDM2NTg2OTdiN2FjNzIifQ%3D%3D; laravel_session=eyJpdiI6Indjd3d5MTJDNzd6ako0S3NobXZsWlE9PSIsInZhbHVlIjoibFRrZ0NDb3Jvb3JhUHBUd1lDc0c3eHpBN1NtTkdaaFpHTUZwQmx3aTBybkxsNXJWOHh2WEJwbkhoOHF0UmRHb09vYWdna01xcEVHUlc3clJITkVlTVE9PSIsIm1hYyI6IjIwNjQzYTJiYTQ4OGMzOTFlNjgwMzFiMmQwYTJmY2ZiMTBhYjY2ZDk3ZjJiY2U4ODhiZTg5ZDhjMzRhYjc4MzkifQ%3D%3D");

// const image: File = new File([photo], 'aaaaaaaaa.jpg', { type: 'image/jpg' });

// let formdata = new FormData();
// formdata.append("name", "Johxn");
// formdata.append("email", "jhoxndd@example.com");
// formdata.append("phone", "+380915388487");
// formdata.append("position_id", "3");
// formdata.append("photo", image, 'aaaaaaaaa.jpg');

// let requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//   const options: RequestInit = { method };


//   // return fetch(BASE_URL + url, { 
//   //     method: 'POST', 
//   //     body: user, 
//   //     headers: {
//   //       'Content-Type': 'multipart/form-data',
//   //       'Token': token,
//   //     },
//   //   })
//   //   .then(response => {
//   //     if (!response.ok) {
//   //       throw new Error();
//   //     }

//   //     return response.json();
//   //   })
// }

// const token = 'eyJpdiI6Ik1tOGJsbU9ETklNRFU4NWd2b2YxcVE9PSIsInZhbHVlIjoiYU1TVTV6akJPb2tvWEgxakI4b3lIQmJnSDZFVjZZNFhxTnBORHREMDdaM1p5bG1VcW9Kek1GZFl0SUd6czdrZHNsNkpyek9tWWdsQVA4MTZDa2FUb3c9PSIsIm1hYyI6ImRkMDY1NTkwZDFjNzRmNmVkNTdhM2JhMjY3ZDczZWVmOTgzMDkxNjY0YmZmNThmOTJmNDc5YjAwYWNmMGQzY2UifQ==';

function sendUser(data: User, token: string) {
  try{
      const formData = new FormData()
      for (const key in data) {
          formData.append(key, data[key])
      }
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',{
          method: 'POST',
          headers: { 'Token': token},
          body: formData
      })
          .then(response => response.json())
          .then(data => {
              console.log(data)
          })
  } catch (error) {
      console.log("Users error: ", error)
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: (user, token) => sendUser(user, token),
};