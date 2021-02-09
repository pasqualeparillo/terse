import { atom } from "recoil";

export const linkState = atom({
  key: "linkState",
  default: {
    url: "",
    short_url: "",
    loading: false,
  },
});

export const messageState = atom({
  key: "messageState",
  default: {
    status: false,
    message: "",
  },
});
