import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/src/types";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { isAndroid, widthPercentage } from "../utils/sizeHelper";
import { stackScreens } from "./navigationType";

const iconManager = (routeName: string, isFocused: boolean): JSX.Element => {
  const color = isFocused ? "black" : "#E2E2E2";

  switch (routeName) {
    case stackScreens.ProjectStackScreen:
      return <Ionicons name={isFocused ? "folder" : "folder-outline"} size={25} color={color} />;
    case stackScreens.HomeStackScreen:
      return <Ionicons name={isFocused ? "home" :"home-outline"} size={25} color={color} />;
    case stackScreens.ProfileStackScreen:
      return <Ionicons name={isFocused ? "person" :"person-outline"} size={25} color={color} />;
    default:
      return <></>;
  }
};

const calculateDotPosition = (
  tab: number,
  horizontalPadding: number,
  dotSize: number
) =>
  widthPercentage((tab + 1) * 33 - 16.5) -
  (horizontalPadding * 2 * ((tab + 1) * 33 - 16.5)) / 100 -
  dotSize / 2;

const DotTabIndicator: React.FC<{
  currentTab: number;
  horizontalPadding: number;
}> = ({ currentTab, horizontalPadding }): JSX.Element => {
  const prevTabRef = useRef(0);
  useEffect(() => {
    prevTabRef.current = currentTab;
  }, [currentTab]);
  const prevTab = prevTabRef.current;

  const dotSize = 4;

  const dotTranslateAnim = new Animated.Value(
    calculateDotPosition(prevTab, horizontalPadding, dotSize)
  );

  Animated.timing(dotTranslateAnim, {
    toValue: calculateDotPosition(currentTab, horizontalPadding, dotSize),
    duration: 200,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={{
        height: dotSize,
        width: dotSize,
        backgroundColor: "black",
        top: 2,
        borderRadius: 10,
        transform: [
          {
            translateX: dotTranslateAnim,
          },
        ],
      }}
    />
  );
};

export const TabBarNavigation: React.FC<{
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}> = ({ state, navigation }) => {

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderTopColor: "#E2E2E2",
        borderTopWidth: 0.5,
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: isAndroid() ? 24 : 38,
          marginTop: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                if (route.name === "Search") {
                  navigation.navigate("Search", { screen: "Search" });
                }
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableWithoutFeedback key={index} onPress={onPress}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <View style={{ aspectRatio: 1, height: 24 }}>
                    {iconManager(route.name, isFocused)}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <DotTabIndicator currentTab={state.index} horizontalPadding={16} />
      </View>
    </View>
  );
};
