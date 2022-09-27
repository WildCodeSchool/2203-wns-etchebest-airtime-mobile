import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ConnectionScreen } from "../screens/ConnectionScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Pager } from "../screens/Pager";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProjectScreen } from "../screens/ProjectScreen";
import { SubscriptionScreen } from "../screens/SubscriptionScreen";
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
        screenOptions={headerStyleHidden}
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
        <SignedOut.Screen name="Pager" component={Pager} />
        <SignedOut.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            ...headerStyleWithTitle,
            headerTitle: "S'inscrire",
          }}
        />
        <SignedOut.Screen
          name="Connection"
          component={ConnectionScreen}
          options={{
            ...headerStyleWithTitle,
            headerTitle: "Connexion",
          }}
        />
      </SignedOut.Navigator>
    </>
  );
};

export const HomeStackScreen = (): JSX.Element => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={headerSimpleArrow}
      />
    </HomeStack.Navigator>
  );
};

export const ProjectStackScreen = (): JSX.Element => {
  const ProjectStack = createStackNavigator();
  return (
    <ProjectStack.Navigator screenOptions={headerStyleHidden}>
      <ProjectStack.Screen name="Project" component={ProjectScreen} />
    </ProjectStack.Navigator>
  );
};

export const ProfileStackScreen = (): JSX.Element => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator screenOptions={headerStyleWithTitle}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};
