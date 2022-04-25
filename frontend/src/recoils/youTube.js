import { atom, selector } from "recoil";
import { localStorageEffect } from "../utils/localStorageEffect";


export const videoData = atom({
  key: 'videoData',
  default: {
    "videoId" : null,
    "title" : null,
    "src" : null
  },
  effects_UNSTABLE: [localStorageEffect("video_data_token")],
});

export const videoDataToken = selector({
  key: "videoDataToken",
  get: ({ get }) => {
    return get(videoData);
  },
});