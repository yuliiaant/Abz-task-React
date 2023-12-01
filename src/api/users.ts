import { client } from "../utils/fetchClient.ts";
import { ResponceData, User } from "../utils/types.ts";

export const getUsers = (page: number) => {
  return client.get<ResponceData>(`/users?page=${page}&count=6`);
};

export const getToken = () => {
  return client.get('/token');
}

export const registerUser = ({
  name,
  email,
  phone,
  photo,
  position_id,
  position,
}: Omit<User, "id" | "registration_timestamp">) => {
  return client.post<User>("/users", {
    name,
    email,
    phone,
    photo,
    position_id,
    position,
  });
};

// var formData = new FormData(); // file from input type='file'
// var fileField = document.querySelector('input[type="file"]');
// formData.append("position_id", 2);
// formData.append("name", "Jhon");
// formData.append("email", "Jhon@gmail.com");
// formData.append("phone", "+380955388485");
// formData.append("photo", fileField.files[0]);
// fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
//   method: "POST",
//   body: formData,
//   headers: { Token: token },
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     if (data.success) {
//     } else {
//     }
//   })
//   .catch(function (error) {});
