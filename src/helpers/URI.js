import axios from "axios";

export const addUrl = (fields) => {
  return axios.post("http://127.0.0.1:8000/url/", {
    full_url: fields,
  });
};
