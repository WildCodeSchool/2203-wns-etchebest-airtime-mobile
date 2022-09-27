import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { StatusBar, StatusBarProps } from "react-native";

export const FocusAwareStatusBar = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<StatusBar> &
    Readonly<StatusBarProps> &
    Readonly<{ children?: React.ReactNode }>
): JSX.Element | null => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};
