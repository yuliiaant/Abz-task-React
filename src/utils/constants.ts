export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
export const PHONE_PATTERN = /^[+]{0,1}380([0-9]{9})$/g;

export const ErrorMessages = {
  NameError: "Enter valid name",
  EmailError: "Enter valid email",
  PhoneError: "Enter valid phone number",
  FileSizeError: "File size can`t be more than 5 Mb",
  FileError: "Select file",
};

export const initialUser = {
  name: "",
  email: "",
  phone: "",
  position_id: 1,
  photo: new File([], ""),
};