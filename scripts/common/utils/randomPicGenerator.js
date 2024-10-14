import { pictureList } from "../constants/pictureList.js";

export const getRandomPic = async () => {
  const randomPosition = Math.floor(Math.random() * pictureList.length);
  const response = await fetch(
    `https://api.dicebear.com/9.x/pixel-art/svg?seed=${pictureList[randomPosition]}`
  );
  const svgText = await response.text();
  return svgText.toString();
};
