import { client } from "../utils/fetchClient.ts";
import { ResponcePositions } from "../utils/types.ts";

export const getPositions = () => {
  return client.get<ResponcePositions>("/positions");
};