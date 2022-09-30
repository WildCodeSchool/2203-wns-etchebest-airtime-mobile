import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ConnectionScreen } from "../screens/ConnectionScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Pager } from "../screens/Pager";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProjectDetails } from "../screens/ProjectDetails";
import { ProjectScreen } from "../screens/ProjectScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { SubscriptionScreen } from "../screens/SubscriptionScreen";
import { AuthContextType } from "../types/auth";
import { stackScreens } from "./navigationType";
import { TabBarNavigation } from "./TabBarNavigation";

export const headerStyleHidden = {
  headerShown: false,
};

export const headerSimpleArrow = {
  headerShown: true,
  headerTintColor: "black",
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTitle: "",
  headerLeftContainerStyle: { paddingLeft: 20 },
};

export const headerStyleWithTitle = {
  headerShown: true,
  headerTintColor: "black",
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingLeft: 20 },
  headerTitleStyle: { fontSize: 25, paddingRight: 20 },
  headerShadowVisible: false,
};

export const SignedInStackScreen = (): JSX.Element => {
  const SignedInTab = createBottomTabNavigator();
  return (
    <>
      <SignedInTab.Navigator
        screenOptions={{ ...headerStyleHidden, unmountOnBlur: true }}
        tabBar={(props) => <TabBarNavigation {...props} />}
        initialRouteName={"HomeStackScreen"}
      >
        <SignedInTab.Screen
          name={stackScreens.ProjectStackScreen}
          component={ProjectStackScreen}
        />
        <SignedInTab.Screen
          name={stackScreens.HomeStackScreen}
          component={HomeStackScreen}
        />
        <SignedInTab.Screen
          name={stackScreens.ProfileStackScreen}
          component={ProfileStackScreen}
        />
      </SignedInTab.Navigator>
    </>
  );
};

export const SignedOutStackScreen = (): JSX.Element => {
  const SignedOut = createStackNavigator();
  return (
    <>
      <SignedOut.Navigator>
        <SignedOut.Screen
          name="Pager"
          component={Pager}
          options={{
            ...headerStyleHidden,
          }}
        />
        <SignedOut.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            ...headerStyleWithTitle,
            headerTitle: "S'inscrire",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#000" },
          }}
        />
        <SignedOut.Screen
          name="Connection"
          component={ConnectionScreen}
          options={{
            ...headerSimpleArrow,
          }}
        />
      </SignedOut.Navigator>
    </>
  );
};

export const HomeStackScreen = (): JSX.Element => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={headerStyleHidden}
      />
    </HomeStack.Navigator>
  );
};

export const ProjectStackScreen = (): JSX.Element => {
  const ProjectStack = createStackNavigator();
  return (
    <ProjectStack.Navigator
      screenOptions={headerStyleHidden}
      initialRouteName="Project"
    >
      <ProjectStack.Screen name="Project" component={ProjectScreen} />
      <ProjectStack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={{
          ...headerSimpleArrow,
        }}
      />
    </ProjectStack.Navigator>
  );
};

export const ProfileStackScreen = (): JSX.Element => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator
      screenOptions={headerStyleWithTitle}
      initialRouteName="Profile"
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={headerStyleHidden}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ ...headerStyleWithTitle, headerTitle: "Réglages" }}
      />
    </ProfileStack.Navigator>
  );
};

export const GlobalStackScreen = (): JSX.Element => {
  const GlobalStack = createStackNavigator();
  const { signedIn, setSignedIn } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("🚀 ~ token", token);
        token ? setSignedIn(true) : setSignedIn(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [signedIn]);
  return (
    <GlobalStack.Navigator
      screenOptions={headerStyleHidden}
      initialRouteName="NotProtectedRoutes"
    >
      {signedIn ? (
        <GlobalStack.Screen
          name="ProtectedRoutes"
          component={SignedInStackScreen}
        />
      ) : (
        <GlobalStack.Screen
          name="NotProtectedRoutes"
          component={SignedOutStackScreen}
        />
      )}
    </GlobalStack.Navigator>
  );
};
