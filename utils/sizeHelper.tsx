import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const isAndroid = (): boolean => {
  return Platform.OS === "android";
};

export const widthPercentage = (percent: number): number => {
  const widthPercent = (percent * width) / 100;
  return Math.round(widthPercent);
};
