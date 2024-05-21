import { ILeaderboardRank } from "@/types";
import CookieManager from "@react-native-cookies/cookies";

const COOKIE_NAME = "userScore";

const setCookie = async (name: string, score: number): Promise<void> => {
  const cookieValue: ILeaderboardRank = { name, score };
  await CookieManager.set("http://localhost:8081", {
    name: COOKIE_NAME,
    value: JSON.stringify(cookieValue),
    path: "/",
  });
};

const getCookie = async (): Promise<ILeaderboardRank | null> => {
  const cookies = await CookieManager.get("http://localhost:8081");
  const userScoreCookie = cookies[COOKIE_NAME];
  if (userScoreCookie) {
    return JSON.parse(userScoreCookie.value) as ILeaderboardRank;
  }
  return null;
};

const deleteCookie = async (): Promise<void> => {
  await CookieManager.clearByName("http://localhost:8081", COOKIE_NAME);
};

export { setCookie, getCookie, deleteCookie };
