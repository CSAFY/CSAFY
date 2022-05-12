import { atom, selector } from "recoil";


export const category = atom({
  key: 'category',
  default: ["전체", "자료구조", "컴퓨터구조", "운영체제", "네트워크", "데이터베이스", "기타"],
});
// export const category = atom({
//   key: 'category',
//   default: ["전체", "대분류1", "대분류2", "대분류3", "대분류4", "대분류5"],
// });

export const categoryToken = selector({
  key: "categoryToken",
  get: ({ get }) => {
    return get(category);
  },
});