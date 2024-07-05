import { selector } from "recoil";
import { myPageInfoAtom } from "../atoms/challenge";

//예시 - 사용 X
export const soredmyPageState = selector({
  key: "soredmyPageInfoAtom",
  get: ({ get }) => {
    const data = get(myPageInfoAtom);
    const result = data.filter((v) => v.userGender === "남자");
    return result;
  },
});
