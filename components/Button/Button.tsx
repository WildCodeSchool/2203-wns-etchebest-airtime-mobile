import React from "react";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({
  title,
  onPress,
  disabled,
  variant,
  style,
}: ButtonProps) => {
  return (
    <SafeAreaView style={style}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[disabled ? styles.disabled : styles[variant]]}
      >
        <Text
          style={[
            disabled
              ? {
                  color: "#757575",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                }
              : variant === "primary"
              ? {
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                }
              : {
                  color: "black",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 100,
    lineHeight: 30,
    letterSpacing: 0.025,
    justifyContent: "center",
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "rgb(16, 24, 40)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  secondary: {
    backgroundColor: "white",
    color: "#757575",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 100,
    lineHeight: 30,
    letterSpacing: 0.025,
    justifyContent: "center",
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "rgb(16, 24, 40)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#545454",
    shadowColor: "white",
    elevation: 0,
  },
  disabled: {
    backgroundColor: "#E5E5E5",
    borderRadius: 100,
    lineHeight: 30,
    letterSpacing: 0.025,
    justifyContent: "center",
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "rgb(16, 24, 40)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 1,
  },
});
