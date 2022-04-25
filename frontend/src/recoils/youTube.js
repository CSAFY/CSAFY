import { atom, selector } from "recoil";

export const videoData = atom({
  key: 'videoData',
  default: {
    "videoId" : null,
    "title" : null,
    "src" : null
  },
});