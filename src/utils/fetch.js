import axios from "axios";

export const addUrl = (fields) => {
  return axios.post(process.env.REACT_APP_ENDPOINT, {
    full_url: fields,
  });
};
